import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class HomeService {
  
    prisma = new PrismaClient();
    constructor(){}
    
    async bestRanked() {
        return await this.prisma.user.findMany({
         take: 5,
         orderBy: {
             XP: 'desc',
         },
         select: {
             username: true,
             avatar: true,
             XP: true,
             level: true,
             topaz: true,
         }
        });
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
        return await this.prisma.user.findFirst({
            where: {id: id},
            select: {
                username: true,
                status: true,
            }
    
           });
    }
    
    async OnlineFriends(id: string) {
        // need to exclude user
        const res = await this.prisma.friendship.findMany({
            where: {
                AND: [
                  {
                    OR: [
                      { senderId: id },
                      { receiverId: id }
                    ]
                  },
                  { status: 'accepted' }
                ],
            },
            include:{
                sender: {
                    select:{
                        status: true,
                        avatar: true,
                    },
                },
                receiver: {
                    select:{
                        status: true,
                        avatar: true
                    }
                },
            }
        });
        return res;
    }

}
