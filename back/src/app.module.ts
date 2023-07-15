import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
// import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
