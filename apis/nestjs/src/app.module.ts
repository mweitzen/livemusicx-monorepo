import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

import {
  UsersModule,
  AccountsModule,
  EventsModule,
  VenuesModule,
  MusiciansModule,
  BandsModule,
  OrganizersModule,
  StagesModule,
} from './resources';
import { NetworksModule } from './resources/networks/networks.module';
import { ThreadsModule } from './resources/threads/threads.module';
import { PostsModule } from './resources/posts/posts.module';
import { CommentsModule } from './resources/comments/comments.module';

@Module({
  imports: [
    // Config
    ConfigModule,
    // Database
    DatabaseModule,
    // Auth
    AuthModule,
    // Resources
    UsersModule,
    AccountsModule,
    VenuesModule,
    StagesModule,
    MusiciansModule,
    BandsModule,
    OrganizersModule,
    EventsModule,
    NetworksModule,
    ThreadsModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
