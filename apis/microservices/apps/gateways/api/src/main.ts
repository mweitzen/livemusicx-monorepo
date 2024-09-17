import { PORTS } from '@app/constants';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerDocBuilder } from './swagger';
import { ApiModule } from './api.module';

/**
 * Bootstrap
 *
 */
async function bootstrap() {
  // Nest Application
  const app = await NestFactory.create<NestExpressApplication>(ApiModule);

  // Connect (fake) Microservice communication
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 },
  });

  // Enable Rest API Versioning
  app.enableVersioning({ type: VersioningType.URI });

  // Enable CORS Requests
  app.enableCors();

  // Swagger Setup
  const swagger = new SwaggerDocBuilder(app);
  swagger.setup();

  // Start App and "Microservices"
  await app.startAllMicroservices();
  await app.listen(PORTS.API);
}

// Bootstrap NestJS App
bootstrap();
