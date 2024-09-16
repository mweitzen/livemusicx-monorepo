import { Module } from '@nestjs/common';
import { AdminModule, EventsModule, MessagingModule } from './gateways';

@Module({
  imports: [MessagingModule, EventsModule, AdminModule],
})
export class WebsocketModule {}
