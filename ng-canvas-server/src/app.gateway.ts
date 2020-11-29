import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Server } from 'http';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGatway')

  @WebSocketServer() server: Server


  afterInit(server: Server) {
    this.logger.log('init')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`)
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected  : ${client.id}`);
  }




  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string) {
    console.log(payload);
    console.log(client.id);

    // return{event:'msgToClient',data:payload}
    this.server.emit('msgToClient', payload)
  }
  @SubscribeMessage('drawToServer')
  handleCordinates(client: any, payload: string) {
    console.log(payload);
    console.log(client.id);
    // return{event:'msgToClient',data:payload}
    this.server.emit('drawToClient', payload)
  }
}
