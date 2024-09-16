import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { Stage, Venue } from '@app/data/entities/account';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Venue, Stage])],
  controllers: [VenuesController],
  providers: [VenuesService],
})
export class VenuesModule {}
