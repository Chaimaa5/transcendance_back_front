import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class ProfileService {
  
    prisma = new PrismaClient();
    constructor(){}


    async Profile(id: string) {
        const friends = await this.CountFriends(id);
        const user = await this.prisma.user.findUnique({where:{id : id},
            select: {
                username: true,
                level: true,
                XP: true,
                rank: true,
                loss: true,
                win: true
            }
        });
        return{
            'username': user?.username,
            'losses': user?.loss,
            'wins' :user?.win,
            'level':user?.level,
            'xp': user?.XP,
            'rank': user?.rank,
            'friend':friends
        }
    }


    async Badges(id: string) {

        //should update the badges in database
        return await this.prisma.user.findUnique({where:{id : id},
            select: {
                badge: true,
            }
        });
    }


    async CountFriends(id: string){
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

    async CalculatePercentage(id: string): Promise<{loss: number, win: number}>{
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


    async Friends(id: string) {
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
                   XP: true,
                   level: true,
                 },
               },
             },
           });
           const Friendships = receivedPromise?.map((friendship) => friendship.sender);
           const Friendships2 = sentPromise?.map((friendship) => friendship.receiver);

           return{
            ...Friendships, ...Friendships2
            
        }
    }
    async MatchHistory(id: string) {
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
