import { PORTS } from '@app/constants';
import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  await app.listen(PORTS.NOTIFICATION);
}
bootstrap();
