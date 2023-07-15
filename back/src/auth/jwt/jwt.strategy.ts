import { Injectable } from "@nestjs/common";
import { PassportStrategy} from "@nestjs/passport";
import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";

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
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
            where:{id: payload.id,},
        });
        return{...user} as User;
    }
}