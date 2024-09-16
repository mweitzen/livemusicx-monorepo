import { Module } from '@nestjs/common';
import { ConnectionModule } from '@app/data';

@Module({
  imports: [
    // Database
    ConnectionModule,
  ],
})
export class CoreModule {}
