import { Body, Controller, Delete, Get, OnApplicationShutdown, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
// import { SocketGateway } from 'src/socket/socket.gateway';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
@Controller('upload')
@ApiTags('upload')
export class UploadController{
    constructor(private readonly uploadservice: UploadService){}
        
   @Post()
   async uploadProfilePicture(@Req() req: Request, @Body() body: Body){

   }
}


