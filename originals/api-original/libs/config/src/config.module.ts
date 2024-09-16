import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { configOptions } from './config.options';

@Module({
  imports: [NestConfigModule.forRoot(configOptions)],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
