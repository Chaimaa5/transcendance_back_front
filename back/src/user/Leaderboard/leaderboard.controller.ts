import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { LeaderboardService } from './leaderboard.service';
@Controller('leaderboard')
@ApiTags('leaderboard')
@UseGuards(AuthGuard('jwt'))
export class LeaderboardController {
    constructor(private readonly profile: LeaderboardService){}

    @Get('')
    async Leaderboard() {
        return this.profile.Leaderboard();
    }
    
    @Get('players')
    async Palyers() {
        return this.profile.Palyers();
    }

}


