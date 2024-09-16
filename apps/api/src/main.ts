import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerDocs } from './swagger';

import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  /**
   * Start Nest Application
   */
  const app = await NestFactory.create(AppModule);

  /**
   * Get Config Service from Nest App
   */
  const configService = app.get(AppConfigService);

  /**
   * Connect (fake) Microservice Message Broker - TCP
   */
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: configService.getPort('TCP'),
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });

  /**
   * Set Global Validation to Ensure Requests match Input Dto
   */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  /**
   * Enable Versioning on the API endpoints
   */
  app.enableVersioning({ type: VersioningType.URI });

  /**
   * Enable Cors
   */
  app.enableCors();

  /**
   * Swagger Setup
   */
  const swagger = new SwaggerDocs(app);
  swagger.setup();

  /**
   * Enable Shutdown Hooks
   */
  app.enableShutdownHooks();

  /**
   * Handle SIGNINT
   */
  process.on('SIGINT', async () => {
    console.log('Gracefully shutting down...');
    await app.close();
    process.exit(0);
  });

  /**
   * Start All Apps and Listen
   */
  await app.startAllMicroservices();
  await app.listen(configService.getPort('DEFAULT'));
}

bootstrap();
