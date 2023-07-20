import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserService } from '../user.service';


@Injectable()
export class HomeService {
  
    prisma = new PrismaClient();
    userService= new UserService;
    constructor(){}
    
    async bestRanked(ownerId: string) {
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

        const bestRanked = await this.prisma.user.findMany({
         take: 5,
         orderBy: {
             XP: 'desc',
         },
         where:{
            AND: [
                {
                    id: {
                      notIn: userBlocked.map(friendship => friendship.receiverId)
                    }
                  },
                {
                    id: {
                      notIn: userBlockers.map(friendship => friendship.senderId)
                    }
                }
              ]
        },
         select: {
             username: true,
             avatar: true,
             XP: true,
             level: true,
             topaz: true,
         }
        });

        const ModifiedObject = this.userService.updateAvatar(bestRanked)
        return ModifiedObject;

     }
 
     async NavBar(id : string) {
        const nav = await this.prisma.user.findFirst({
            where: {id: id},
            select: {
                username: true,
                avatar: true,
                XP: true,
                level: true,
                games: true,
                win: true,
                loss: true,
                badge: true,
            }
           });
           if (nav)
           if (!nav.avatar.includes('cdn.intra')){
            nav.avatar = 'http://' + process.env.HOST + ':'+ process.env.PORT + nav.avatar
        }

         return nav;
    }


    async OnlineStatus(id : string) {
       const user = await this.prisma.user.findUnique({
            where: {id: id},
            select: {
                username: true,
                avatar: true,
                status: true,
            }
    
           });

           if (user)
           if (!user.avatar.includes('cdn.intra')){
            user.avatar = 'http://' + process.env.HOST + ':'+ process.env.PORT + user.avatar
        }
        return user
    }
    
    async OnlineFriends(id: string) {
        const sentPromise = await this.prisma.user.findUnique({
            where: { id: id },
          }).sentFriendships({
            where: {
              status: 'accepted',
            },
            select: {
              receiver: {
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                    status: true,
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
            },
            select: {
              sender: {
                select: {
                  id: true,
                  username: true,
                  avatar: true,
                  status:true,
                  XP: true,
                  level: true,
                },
              },
            },
          });

          let receiverData =sentPromise ? sentPromise.map((friendship) => friendship.receiver): [];
          let senderData = receivedPromise ?  receivedPromise.map((friendship) => friendship.sender): [];

          receiverData = this.userService.updateAvatar(receiverData);
          senderData = this.userService.updateAvatar(senderData);

          let combinedData = [...receiverData, ...senderData];
          return combinedData;
    }


    async Search(input: string){
        let res = await this.prisma.user.findMany({
          where: {
            OR: [
              {
                username: {
                    startsWith: input,
                    mode: "insensitive"}
              },
              {
                fullname: {
                    startsWith: input,
                    mode: "insensitive"}
              }
            ]
          },
          select: {
            id: true,
            username: true,
            fullname: true,
            avatar: true,
        }
        }) 

        res = this.userService.updateAvatar(res);
        return res;
    }
}
