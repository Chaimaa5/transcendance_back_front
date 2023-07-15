import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDTO } from './dto/updatedto.dto'
import { CreateFriendshipDTO } from './dto/createFriendship.dto';

@Injectable()
export class UserService {
    async userSetup(id: string, avatar: Express.Multer.File, data: UpdateUserDTO) {
        // await this.prisma.user.update({where: {id: id}, data: data as any});
        // const port = process.env.PORT;
        // const host = process.env.HOST;
        // const location = port + "/upload/";
        // const filename = host + location + avatar.filename;
        const filename ="/upload/"+ avatar.filename;

        await this.prisma.user.update({where: {id: id}, data: {avatar: filename}});
    }
 

    
    prisma = new PrismaClient();
    constructor(){}
    async CreateUser(user: any)
    {
        const prisma = new PrismaClient();
        const UserExists = await prisma.user.findUnique({
            where:{id: user.id},
        });
        if(UserExists){
            console.log('User already exists');
            return user;
        }
        else{
            const defaultAchievements  = [
                {id: 1, Achievement: "x", Achieved: false},
            ];
            let rankCount = await prisma.user.count();
            if(!rankCount)
                rankCount = 1;
              const newUser = await prisma.user.create({
                data:{
                    id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    avatar: user.avatar,
                    isTwoFacEnabled: false,
                    TwoFacSecret: '',
                    XP: 0,
                    win: 0,
                    loss: 0,
                    status: false,
                    rank: rankCount,
                    level: 0,
                    badge: {create: defaultAchievements},
                    refreshToken: '',
                    createdAt: new Date(),
                }
            });
            return newUser;
        }
        return false;
    }
    
    async findUser(user: any) {
        const UserExists = await this.CreateUser(user);
        return UserExists;
    }
    updateOnlineStatus(id: string, status: boolean) {
        throw new Error('Method not implemented.');
    }
    getUser() {
        throw new Error('Method not implemented.');
    }
    bestRanked() {
        throw new Error('Method not implemented.');
    }
    
    UpdateUser(id: string, UserData: UpdateUserDTO) {
        return this.prisma.user.update({where: {id: id}, data: UserData as any});
    }
    
    async UpdateRefreshToken(id: string, Rt: string) {
        const prisma = new PrismaClient();
        return prisma.user.update({where: {id: id}, data: {refreshToken : Rt}});
    }
    
    GetMany() {
        const prisma = new PrismaClient();
        return prisma.user.findMany();
    }

    async  deleteGroups(id: string) {
        await this.prisma.groupMembership.deleteMany({
            where: {
            userId: id
        }})
        await this.prisma.room.deleteMany({where:{ownerId: id}})
    }
    async DeleteUser(id: string) {
        const prisma = new PrismaClient();
        await prisma.friendship.deleteMany({where:  {
            OR: [
            {senderId: id},
            {receiverId: id},]
        }});
        this.deleteGroups(id);
        this.deleteAchievements(id);
        this.deleteGames(id);
        await prisma.user.delete({where: {id: id}});
    }
    async deleteGames(id: string) {
        await this.prisma.game.deleteMany({
            where: {
                OR: [
                    {playerId1: id},
                    {playerId2: id}
                ]
            }
           })
    }
    async deleteAchievements(id: string) {
       await this.prisma.achievement.deleteMany({
        where: {userId: id}
       })
    }
    async FindbyID(id: string) {
        const prisma = new PrismaClient();
        //Throw error if he's blocked or he blocked the other user
        return prisma.user.findUnique({where:  {id: id},
            select: {
                username: true,
                avatar: true,
                XP: true,
                level: true,
                topaz: true,
            }
        });
    }


    //Friendship

              
    async addFriend(id : string, dto :CreateFriendshipDTO){
        const {receiverId} = dto;
        await this.prisma.friendship.create({
            data: {
                sender: {connect: {id: id}},
                receiver: {connect: {id: receiverId}},
                status: 'pending',
                blockerId: '',
            },
        });
    }

    async removeFriend(id : string, dto :CreateFriendshipDTO){
        const {receiverId} = dto;
        await this.prisma.friendship.deleteMany({
            where: {
                OR: [
                    {senderId: id, receiverId: receiverId},
                    {senderId: receiverId, receiverId: id},
                ],
            },
        });

        // const {Id} = dto;
        // await this.prisma.friendship.delete({
        //     where: {
        //         id: Id,
        //     },
        // });
    }

    async acceptFriend(id : string, dto :CreateFriendshipDTO){
        const {receiverId} = dto;
        await this.prisma.friendship.updateMany({
            where: {
                OR: [
                    {senderId: id, receiverId: receiverId},
                    {senderId: receiverId, receiverId: id},
                ],
            },
            data: {
                status: 'accepted',
            },
        });

        // const {Id} = dto;
        // await this.prisma.friendship.update({
        //     where: {
        //        id: Id,
        //     },
        //     data: {
        //         status: 'accepted',
        //     },
        // });
    }

    async blockFriend(id : string, dto :CreateFriendshipDTO){
        const {receiverId} = dto;
        await this.prisma.friendship.updateMany({
            where: {
                OR: [
                    {senderId: id, receiverId: receiverId},
                    {senderId: receiverId, receiverId: id},
                ],

            },
            data: {
                status: 'blocked',
                blockerId: id,
            },
        });

        // const {Id} = dto;
        // await this.prisma.friendship.update({
        //     where: {
        //        id: Id,

        //     },
        //     data: {
        //         status: 'blocked',
        //         blockerId: id,
        //     },
        // });
    }

    //should be updated
    async getFriends(id : string){
        const res = await this.prisma.friendship.findMany({where: {
            AND:[{
                OR: [
                    {senderId: id},
                    {receiverId: id},
                ],
            },
            {status: 'accepted'},
            ], 
        },});
        return res;
    }

    //should be updated
    async getFriend(id : string, dto :CreateFriendshipDTO){
        const {receiverId} = dto;
        const res = await this.prisma.friendship.findFirst({ where: {
            AND:[{
                OR: [
                    {senderId: id, receiverId: receiverId},
                    {senderId: receiverId, receiverId: id},
                ],
            },
            {status: 'accepted'},
            ],
        },
        });
        return res;
    }

    async getPendings(id : string){
        const res = await this.prisma.friendship.findMany({where: {
            AND:[{
                OR: [
                    {senderId: id},
                ],
            },
            {status: 'pending'},
            ],
            
        },
        
    });
        return res;
    }


    async getInvitations(id : string){
        const res = await this.prisma.friendship.findMany({where: {
            AND:[{
                OR: [
                    {receiverId: id},
                ],
            },
            {status: 'pending'},
            ],
            
         },
        
        });
        return res;
    }
    async getBlocked(id : string){
        const res = await this.prisma.friendship.findMany({where: {
            AND:[{
                OR: [
                    {senderId: id},
                    {receiverId: id},
                ],
            },
            {status: 'blocked'},
            {blockerId: id},
            ],
            
        },});
        return res;
    }


    async Players() {
        const players = await this.prisma.user.findMany({
           orderBy: {
             XP: 'desc',
           },
           select: {
            avatar: true,
             rank: true,
             username: true,
             level: true,
             XP: true,
             topaz: true,
           }
        });
        // const res = players.slice(3);
        return players;
     }
    // async firstUpdate(data: Body) {
    //     return this.prisma.user.update({where: {id: id}, data: data as any});
    // }


    uploadImage(id: string, avatar: Express.Multer.File) {
        
    }

}


