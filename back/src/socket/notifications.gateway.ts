import { SubscribeMessage, WebSocketGateway, OnGatewayDisconnect, OnGatewayConnection} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway()
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect{
  connectedUsers: Set<string> = new Set()
  authService = new AuthService;
  userService = new UserService;

  afterInit(server: any) {

  }
  handleDisconnect(client: Socket){
    const id = client.handshake.query.userId;
    // this.userService.updateOnlineStatus(id, 0)
    this.connectedUsers.delete(id as string);
  }

  handleConnection(client: Socket) {

    const id  = this.authService.GetUserFromSocket(client);
    
    // this.userService.updateOnlineStatus(id, 1)
  }
}
