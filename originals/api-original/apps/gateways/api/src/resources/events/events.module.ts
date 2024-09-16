import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PublishedEvent } from '@app/data/entities/event';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MESSAGE_BROKER } from '@app/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MESSAGE_BROKER,
        transport: Transport.TCP,
      },
    ]),
    TypeOrmModule.forFeature([PublishedEvent]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
