import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventsService } from './events.service';
import { gatewayOptions } from '../gateway.options';
import { WS_NAMESPACES } from '../../constants';

@WebSocketGateway({
  namespace: WS_NAMESPACES.EVENTS,
  ...gatewayOptions,
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly eventService: EventsService) {}

  async handleConnection(@MessageBody() socket: Socket) {
    return this.eventService.handleConnection(socket);
  }

  async handleDisconnect(socket: Socket) {
    return console.log(`Socket: ${socket.id} disconnecting.`);
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: any) {
    console.log('message received');
    console.log(data);
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
