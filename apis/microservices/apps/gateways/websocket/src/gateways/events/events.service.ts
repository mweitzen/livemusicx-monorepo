import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class EventsService {
  handleConnection(socket: Socket) {
    console.log(`Socket ${socket.id} connected.`);
  }
}
