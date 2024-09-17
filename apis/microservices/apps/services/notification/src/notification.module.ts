import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MESSAGE_BROKER } from '@app/constants';

@Module({
  imports: [
    ClientsModule.register([
      { name: MESSAGE_BROKER, transport: Transport.TCP },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
