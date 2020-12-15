import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket,Server } from 'socket.io';


@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGatway')

  @WebSocketServer() server: Server


  afterInit(server: Server) {
    this.logger.log(`${server} init now`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`)
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected  : ${client.id}`);
  }
  @SubscribeMessage('joinRoom')
  handelJoinRoom(client:Socket,payload:{name:string,room:string}){
    client.join(payload.room)
    client.to(payload.room).emit('joinedRoom',payload)
    console.log('joinedRoom',payload);
    
  }

  @SubscribeMessage('leaveRoom')
  handelLeaveRoom(client:Socket,payload:{room:string,name:string,message: string}){
    client.leave(payload.room)
    client.to(payload.room).emit('leftRoom',payload)
    console.log('leftRoom',payload);
    
  }


  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload:{room:string,name:string,message: string ,updated_at: string}) {
    console.log(client.id);
    console.log(payload);
    
    this.server.to(payload.room).emit('msgToClient', payload)
    console.log(payload);
    
  }
  @SubscribeMessage('drawToServer')
  handleCordinates(client: any, payload: string) {
    console.log(client.id);
    this.server.emit('drawToClient', payload)
  }
}
