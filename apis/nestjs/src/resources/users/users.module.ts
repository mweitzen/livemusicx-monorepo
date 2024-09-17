import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { MESSAGE_BROKER } from 'src/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MESSAGE_BROKER,
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
