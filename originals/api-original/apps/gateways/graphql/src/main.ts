import { PORTS } from '@app/constants';
import { NestFactory } from '@nestjs/core';
import { GraphqlModule } from './graphql.module';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlModule);
  await app.listen(PORTS.GRAPHQL);
}
bootstrap();
