// import { SubscribeMessage, WebSocketGateway, OnGatewayDisconnect, OnGatewayConnection} from '@nestjs/websockets';
// import { Socket } from 'socket.io';

// @WebSocketGateway()
// export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect{
//   connectedUsers: Set<string> = new Set()

//   // afterInit(server: any) {

//   // }
//   handleDisconnect(client: Socket){
//     const id = client.handshake.query.userId;
//     this.connectedUsers.delete(id as string);
//   }
//   @SubscribeMessage('connection')
//   handleConnection(client: Socket) {
//     const id = client.handshake.query.userId;
//     this.connectedUsers.delete(id as string);
//   }
// }
