import { PORTS } from '@app/constants';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { StaticModule } from './static.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(StaticModule);

  // Enable CORS Requests
  app.enableCors();

  // Set up Static Files
  app.useStaticAssets(join(__dirname, '..', '..', '..', '..', 'static'), {
    fallthrough: true,
  });

  await app.listen(PORTS.STATIC);
}
bootstrap();
