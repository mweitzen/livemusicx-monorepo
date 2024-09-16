import { Module } from '@nestjs/common';
import { MusiciansService } from './musicians.service';
import { MusiciansController } from './musicians.controller';

@Module({
  controllers: [MusiciansController],
  providers: [MusiciansService],
})
export class MusiciansModule {}
