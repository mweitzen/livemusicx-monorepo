import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  User,
  OrganizerUser,
  PerformerUser,
  PublicUser,
  VenueUser,
  AssociateUser,
} from '@app/data/entities/user';
import { MESSAGE_BROKER } from '@app/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MESSAGE_BROKER,
        transport: Transport.TCP,
      },
    ]),
    TypeOrmModule.forFeature([
      User,
      AssociateUser,
      PerformerUser,
      VenueUser,
      OrganizerUser,
      PublicUser,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
