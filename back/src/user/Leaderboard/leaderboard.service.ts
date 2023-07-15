import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class LeaderboardService {
    prisma = new PrismaClient();
    constructor(){}
    
    async Leaderboard() {
        return await this.prisma.user.findMany({
            take: 3,
            orderBy: {
                XP: 'desc',
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
    }
    async Palyers() {
       const players = await this.prisma.user.findMany({
          take: 3,
          orderBy: {
            XP: 'desc',
          },
          select: {
            id: true,
            rank: true,
            username: true,
            level: true,
            XP: true,
            topaz: true,
          }
       });
       return players;
    }
}
