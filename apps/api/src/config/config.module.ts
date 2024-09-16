import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configOptions } from './config.options';
import { AppConfigService } from './config.service';

@Global()
@Module({
  imports: [NestConfigModule.forRoot(configOptions)],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class ConfigModule {}
