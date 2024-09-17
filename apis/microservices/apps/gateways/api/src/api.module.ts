import { Module } from '@nestjs/common';
import {
  MusiciansModule,
  BandsModule,
  OrganizersModule,
  NetworksModule,
  UsersModule,
  EventsModule,
  LocationsModule,
  VenuesModule,
} from './resources';
//
import { CoreModule } from '../../../services/core/src/core.module';
import { AuthModule } from '../../../services/auth/src/auth.dev.module';
import { NotificationModule } from '../../../services/notification/src/notification.module';

@Module({
  imports: [
    // Resources
    UsersModule,
    EventsModule,
    LocationsModule,
    VenuesModule,
    MusiciansModule,
    BandsModule,
    OrganizersModule,
    NetworksModule,
    // External "Services",
    CoreModule,
    AuthModule,
    NotificationModule,
  ],
})
export class ApiModule {}
