import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Achievement, PrismaClient, User } from '@prisma/client';
import { JwtPayload, VerifyOptions } from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as crypto from 'crypto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from 'src/config/config.service';
// import { toDataURL } from 'qrcode';
import { authenticator } from 'otplib';
import { TFA } from './dto/TFA.dto';

@Injectable()
export class AuthService {

   
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService,
        private configService: ConfigService ){}
    secretKey = 'secret';
  
    encryptToken(token: string) {
        const cipher = crypto.createCipher('aes-256-cbc', this.secretKey);
        let encrypted = cipher.update(JSON.stringify(token), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
      }
      
      // Decrypt and retrieve the original payload
    decryptToken(encryptedToken: string) {
        const decipher = crypto.createDecipher('aes-256-cbc', this.secretKey);
        let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    }

    generateToken(user: any) : string {
        const payload: JwtPayload = {id: user.id,  username: user.username, isTwoFacEnabled: user.isTwoFacEnabled }; 
        return this.jwtService.sign(payload);
    }

    generateRefreshToken(user: any) : string  {
        const payload: JwtPayload = {id: user.id,  username: user.username, isTwoFacEnabled: user.isTwoFacEnabled}; 
        return this.jwtService.sign(payload, {expiresIn: '30d'});
    }

    async signIn(res: Response, req: Request) {
        //check is a user
        const check = await this.userService.findUser(req.user);
        const Access_Token = this.generateToken(req.user);
        const Refresh_Token = this.generateRefreshToken(req.user);
        res.cookie('access_token', Access_Token, {httpOnly: true});
        res.cookie('refresh_token', Refresh_Token, {httpOnly: true});
        const encryptedToken = this.encryptToken(Refresh_Token);
        this.userService.UpdateRefreshToken(check.id, encryptedToken)
        return(res);
    }

    signOut(res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.redirect('http://localhost:8000/login');
    } 

    async RefreshTokens(req: Request, res: Response) {

        console.log(req);
        const users: any = req.user;
        const user = await this.userService.findUser(users.user);
        if (!user)
            throw new ForbiddenException('User Does not exist');
        const decryptedToken = this.decryptToken(user.refreshToken);
        const decodedToken = this.jwtService.verify(decryptedToken) ;
        const cookieToken = this.jwtService.verify(req.cookies['refresh_token']);

        if (decryptedToken == req.cookies['refresh_token'])
        {
            const Access_Token = this.generateToken(user);
            const Refresh_Token = this.generateRefreshToken(user);

            res.cookie('access_token', Access_Token, {httpOnly: true, secure: true,});
            res.cookie('refresh_token', Refresh_Token, {httpOnly: true, secure: true,});

            const encryptedToken = this.encryptToken(Refresh_Token);
            this.userService.UpdateRefreshToken(user.id , encryptedToken)
            console.log('finiished');
        }
        else{
            throw new ForbiddenException('Access Denied');
        }
    }

    //TwoFactorAuth
    
    async generateQRCode(id: string){
        const secret = authenticator.generateSecret();
        const app = "Trans";
        const account = "celmhan";

        //update secret in database
        const prisma = new PrismaClient();
        await prisma.user.update({
            where: {id: id}, 
            data: {TwoFacSecret: secret}
    });
        const authUrl = authenticator.keyuri(account, app, secret);
        return (authUrl);
        // return await toDataURL(authUrl);
    }


    async verifyTFA(user: any, code: string) {
        // check if user exist

        return await authenticator.verify({
            token: code,
            secret: user.TwoFacSecret
        });
    }

    async activateTFA(id: string){
        const prisma = new PrismaClient();
        await prisma.user.update({
            where: {id: id}, 
            data: {isTwoFacEnabled: true}
    });
    }
    
}

