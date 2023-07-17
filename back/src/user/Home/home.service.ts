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
        return await this.prisma.user.findFirst({
            where: {id: id},
            select: {
                username: true,
                XP: true,
                level: true,
                games: true,
                win: true,
                loss: true,
                badge: true,
            }
           });
    }


    async OnlineStatus(id : string) {
        return await this.prisma.user.findUnique({
            where: {id: id},
            select: {
                username: true,
                status: true,
            }
    
           });
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

}
