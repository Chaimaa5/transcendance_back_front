// import { SubscribeMessage, WebSocketGateway, OnGatewayDisconnect, OnGatewayConnection} from '@nestjs/websockets';
// import { JwtPayload } from 'jsonwebtoken';
// import { Socket } from 'socket.io';
// import { AuthService } from 'src/auth/auth.service';
// import { UserService } from 'src/user/user.service';

// @WebSocketGateway()
// export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect{
//   payload: JwtPayload
//   connectedUsers: Set<string> = new Set()
//   authService = new AuthService;
//   userService = new UserService;

//   afterInit(client: WebSocket) {

//     // const id  = this.webSocket.validate(client);
//   }
//   handleDisconnect(client: Socket){
//     const id = client.handshake.query.userId;
//     // this.userService.updateOnlineStatus(id, 0)
//     this.connectedUsers.delete(id as string);
//   }

//   handleConnection(client: Socket) {

    
//     // this.userService.updateOnlineStatus(id, 1)
//   }
// }
