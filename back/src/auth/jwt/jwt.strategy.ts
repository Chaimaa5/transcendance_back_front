import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy} from "@nestjs/passport";
import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt'){
     constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request:Request) => {
                let data = request.cookies["access_token"];
                return data
            } ]),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
          });
    }

    async validate(payload: JwtPayload){

        try{
            jwt.verify(payload.token, process.env.JWT_REFRESH_SECRET as jwt.Secret)
        }catch(err){
            if(err instanceof jwt.TokenExpiredError )
                throw  new UnauthorizedException('Expired Token Exception');
        }
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
            where:{id: payload.id,},
        });
        return{...user} as User;
    }
}