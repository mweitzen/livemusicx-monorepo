import { PORTS } from '@app/constants';
import { NestFactory } from '@nestjs/core';
import { WebsocketModule } from './websocket.module';

async function bootstrap() {
  const app = await NestFactory.create(WebsocketModule);
  await app.listen(PORTS.WEBSOCKET);
}
bootstrap();
