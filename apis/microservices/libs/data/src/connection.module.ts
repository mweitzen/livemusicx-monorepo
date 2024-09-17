import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre, VenueKeyword, EventKeyword } from './entities/tags';
import {
  AssociateUser,
  OrganizerUser,
  PerformerUser,
  PublicUser,
  User,
  VenueUser,
} from './entities/user';
import {
  Account,
  Band,
  BandAccount,
  Musician,
  MusicianAccount,
  Organizer,
  OrganizerAccount,
  Stage,
  Venue,
  VenueAccount,
} from './entities/account';
import { AuthAccount, Credentials, UserSession } from './entities/auth';
import { PublishedEvent } from './entities/event';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'user',
      // password: 'password',
      // database: 'lmx-dev',
      url: 'postgresql://user:password@postgres:5432/lmx-dev',
      entities: [
        // Tags / Generic
        Genre,
        VenueKeyword,
        EventKeyword,

        // Auth
        AuthAccount,
        Credentials,
        UserSession,

        // Base Account
        User,
        PublicUser,
        PerformerUser,
        VenueUser,
        OrganizerUser,
        AssociateUser,

        // Base Account
        Account,
        MusicianAccount,
        BandAccount,
        VenueAccount,
        OrganizerAccount,

        // Specific Account
        Musician,
        Band,
        Venue,
        Stage,
        Organizer,

        // Events
        PublishedEvent,
      ],
      // autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
  ],
})
export class ConnectionModule {}
