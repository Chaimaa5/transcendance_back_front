import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { HomeService } from './home.service';
@Controller('home')
@ApiTags('home')
@UseGuards(AuthGuard('jwt'))
export class HomeController {
    constructor(private readonly profile: HomeService){}

    // 5 best ranked
    @Get('/bestRanked')
    async bestRanked() {
        return this.profile.bestRanked();
    }
    
    @Get('/navbar/')
    async NavBar(@Req() req: Request) {
        const user : User = req.user as User;
        return this.profile.NavBar(user.id);
    }       
            
    @Get('/onlineFriends/')
    async OnlineFriends(@Req() req: Request) {
        const user : User = req.user as User;
        return this.profile.OnlineFriends(user.id);
    }
   
}


