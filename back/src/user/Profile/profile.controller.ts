import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
@Controller('profile')
@ApiTags('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
    constructor(private readonly profile: ProfileService){}
            
    //---------Profile

    //Profile info
    @Get('')
    async Profile(@Req() req: Request){
        const user : User = req.user as User;
        return this.profile.Profile(user.id);
    }

    //Acheivments
    @Get('/acheivments')
    async GetAcheivments(@Req() req: Request){
        const user : User = req.user as User;
        return this.profile.Badges(user.id);
    }

    //MatchHistory --- Not Complete
    @Get('/history')
    async MatchHistory(@Req() req: Request){
        const user : User = req.user as User;
        return this.profile.MatchHistory(user.id);
    }

    //Percentage in profile
    @Get('/statistics')
    async UserStatistics(@Req() req: Request){
        const user : User = req.user as User;
        return this.profile.CalculatePercentage(user.id);
    }

    //List of friends in profile
    @Get('/friends')
    async Friends(@Req() req: Request){
        const user : User = req.user as User;
        return this.profile.Friends(user.id);
    }

}


