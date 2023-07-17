import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserService } from '../user.service';


@Injectable()
export class LeaderboardService {
    prisma = new PrismaClient();
  userService = new UserService;
    constructor(){}
    
    async Leaderboard(ownerId: string) {

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


        let res =  await this.prisma.user.findMany({
            take: 3,
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
                id: true,
                rank: true,
                username: true,
                avatar: true,
                XP: true,
                badge: true,
            }
        });

        res = this.userService.updateAvatar(res);
        return res;
    }
    async Palyers(ownerId: string) {

       
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

        const bestRanked =  await this.prisma.user.findMany({
            take: 3,
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
        });
        
        let players = await this.prisma.user.findMany({
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
                      notIn: bestRanked.map(friendship => friendship.id)
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
            id: true,
            avatar: true,
            rank: true,
            username: true,
            level: true,
            XP: true,
            topaz: true,
          }
       });
       players = this.userService.updateAvatar(players);
       return players;
    }
}
