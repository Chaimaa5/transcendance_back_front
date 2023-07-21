import { Injectable } from '@nestjs/common';
import { Friendship, PrismaClient } from '@prisma/client';


@Injectable()
export class ProfileService {
  
    prisma = new PrismaClient();
    constructor(){}


    async Profile(id: string, username: string) {

        let isOwner = true;
        let isFriend = false;
        let isSender = false;
        let isReceiver = false;
        let isBlocked = false;
        const owner = await this.prisma.user.findUnique({where:{id : id},})
        const friends = await this.CountFriends(username);
        const user = await this.prisma.user.findUnique({where:{username : username},
            select: {
                id: true,
                username: true,
                level: true,
                XP: true,
                rank: true,
                avatar: true,
                loss: true,
                win: true
            }
        });
        if (user?.id != owner?.id)
            isOwner = false;
        if (!isOwner && user){
            const ownerFriend =  await this.prisma.friendship.findFirst({
                where:{
                        OR: [
                          { senderId: id, receiverId: user.id } ,
                            { senderId: user.id, receiverId: id } 
                        ]
                },
                select: {
                    id: true,
                    receiverId: true,
                    senderId: true,
                    status: true
                }
            });
            console.log(ownerFriend)
            if(ownerFriend?.status.includes('accepted'))
                isFriend = true;
            else if (ownerFriend?.status.includes('blocked'))
                isBlocked = true;
            else if (ownerFriend?.status.includes('pending'))
            {
                if (user?.id == ownerFriend.senderId)
                    isSender = true;
                else
                    isReceiver = true;
            }
        }
        return{
            'username': user?.username,
            'losses': user?.loss,
            'wins' :user?.win,
            'level':user?.level,
            'xp': user?.XP,
            'rank': user?.rank,
            'avatar': user?.avatar,
            'friend':friends,
            'isOwner': isOwner,
            'isFriend': isFriend,
            'isSender': isSender,
            'isReceiver': isReceiver,
            'isBlocked': isBlocked

        }
    }


    async User(id: string, username: string) {
      let isOwner = true;
        let isFriend = false;
        let isSender = false;
        let isReceiver = false;
        let isBlocked = false;
        const owner = await this.prisma.user.findUnique({where:{id : id}})
        const friends = await this.CountFriends(username);
        const user = await this.prisma.user.findUnique({where:{username : username},
            select: {
                id: true,
                username: true,
                level: true,
                XP: true,
                rank: true,
                avatar: true,
                loss: true,
                win: true
            }
        });
        if (user?.id != owner?.id)
            isOwner = false;
        if (!isOwner && user){
            const ownerFriend =  await this.prisma.friendship.findFirst({
                where:{
                        OR: [
                          { senderId: id, receiverId: user.id } ,
                            { senderId: user.id, receiverId: id } 
                        ]
                },
                select: {
                    id: true,
                    receiverId: true,
                    senderId: true,
                    status: true
                }
            });
            console.log(ownerFriend)
            if(ownerFriend?.status.includes('accepted'))
                isFriend = true;
            else if (ownerFriend?.status.includes('blocked'))
                isBlocked = true;
            else if (ownerFriend?.status.includes('pending'))
            {
                if (user?.id == ownerFriend.senderId)
                    isSender = true;
                else
                    isReceiver = true;
            }
        }
        return{
            'id': user?.id,
            'isOwner': isOwner,
            'isFriend': isFriend,
            'isSender': isSender,
            'isReceiver': isReceiver,
            'isBlocked': isBlocked

        }
    }


    async Badges(username: string) {
        return await this.prisma.user.findUnique({where:{username : username},
            select: {
                badge: true,
            }
        });
    }


    async CountFriends(username: string){
        const user  = await this.prisma.user.findUnique({where: {username: username}});
        const id = user?.id
        const number = await this.prisma.friendship.count({
            where: {
                status: 'accepted',
                OR: [
                  { senderId: id },
                  { receiverId: id },
                ],
            }
        });
        return number;
    }

    async CalculatePercentage(username: string): Promise<{loss: number, win: number}>{
        const user  = await this.prisma.user.findUnique({where: {username: username}});
        const id = user?.id
        const losses = await this.prisma.user.findUnique({
            where: {id: id},
            select: {
                loss: true,
            }
        }).then((user) => user?.loss ?? 0);

        const wins = await this.prisma.user.findUnique({
            where: {id: id},
            select: {
                win: true,
            }
        }).then((user) => user?.win ?? 0);
        const games = await this.prisma.user.findUnique({
            where: {id: id},
            select: {
                games: true,
            }
        }).then((user) => user?.games ?? 0);
        const winPer = games > 0 ? (wins / games) * 100 : 0;
        const lossPer = games > 0 ? (losses / games) * 100 : 0;
        const [win, loss] = await Promise.all([winPer, lossPer]);
        return {
            win: winPer,
            loss: lossPer,
        };
    }


    async Friends(username: string, ownerId: string) {

        const user  = await this.prisma.user.findUnique({where: {username: username}});
        const id = user?.id
        const userBlocked = await this.prisma.friendship.findMany({
            where: {
                AND: [
                    {senderId: ownerId},
                    {status: 'blocked'}
                ]
            },
            select: {
                receiverId: true
            }
        });


        const userBlockers = await this.prisma.friendship.findMany({
            where: {
                AND: [
                    {receiverId: ownerId},
                    {status: 'blocked'}
                ]
            },
            select: {
                senderId: true
            }
        });


        const sentPromise = await this.prisma.user.findUnique({
             where: { id: id },
           }).sentFriendships({
             where: {
               status: 'accepted',
               AND: [
                {
                  receiver: {
                    id: {
                      notIn: userBlocked.map(friendship => friendship.receiverId)
                    }
                  }
                },
                {
                  receiver: {
                    id: {
                      notIn: userBlockers.map(friendship => friendship.senderId)
                    }
                  }
                }
              ]
              
             },
             select: {
               receiver: {
                 select: {
                     id: true,
                     username: true,
                     avatar: true,
                     XP: true,
                     level: true,
                 },
               },
             },
           });
           const receivedPromise = await this.prisma.user.findUnique({
             where: { id: id },
           }).receivedFriendships({
             where: {
               status: 'accepted',
               AND: [
                {
                  receiver: {
                    id: {
                      notIn: userBlocked.map(friendship => friendship.receiverId)
                    }
                  }
                },
                {
                  receiver: {
                    id: {
                      notIn: userBlockers.map(friendship => friendship.senderId)
                    }
                  }
                }
              ]
             },
             select: {
               sender: {
                 select: {
                   id: true,
                   username: true,
                   avatar: true,
                   XP: true,
                   level: true,
                 },
               },
             },
           });

           
           const senderData = receivedPromise ?  receivedPromise.map((friendship) => friendship.sender): [];
           const senderDataModified = senderData.map((sender) =>{
            if (sender){
                if (sender.avatar)
                {
                    if (!sender.avatar.includes('cdn.intra')){
                        sender.avatar = 'http://' + process.env.HOST + ':'+ process.env.PORT + sender.avatar
                    }
                }
            }
            return sender
            });

           const receiverData =sentPromise ? sentPromise.map((friendship) => friendship.receiver): [];
           const receiverDataModified = receiverData.map((receiver) =>{
            if (receiver){
                if (receiver.avatar)
                {
                    if (!receiver.avatar.includes('cdn.intra')){
                        receiver.avatar = 'http://' + process.env.HOST + ':'+ process.env.PORT + receiver.avatar
                    }
                }
            }
            return receiver
            });

           const combinedData = [...senderDataModified, ...receiverDataModified];


            const valuesOnlyWithoutKeys = combinedData.map(({ username, ...rest }) => rest);
                    
            return valuesOnlyWithoutKeys;

    }
    async MatchHistory(username: string) {
        const user  = await this.prisma.user.findUnique({where: {username: username}});
        const id = user?.id
        //should add the result
       return await this.prisma.game.findMany({
        where: {
            OR: [
              { playerId1: id },
              { playerId2: id }
            ],
        },
        include: {
            player1: {
                select: {
                    username: true,
                }
            },
            player2: {
                select: {
                    username: true,
                }
            }
        },

       });
    }

}
