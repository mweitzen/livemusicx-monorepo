import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  APPLICATION_NAME,
  APPLICATION_URL,
  CONTACT_EMAIL,
  CONTACT_NAME,
  CONTACT_URL,
  REST_API_VERSION,
} from '@app/constants';

import { SWAGGER_DESCRIPTION, SWAGGER_PATHNAME } from './swagger.constants';
import { customOptions, documentOptions } from './swagger.options';

export class SwaggerDocs {
  constructor(private app: INestApplication<any>) {}

  public setup() {
    const docs = this.buildDoc();
    SwaggerModule.setup(SWAGGER_PATHNAME, this.app, docs, customOptions);
  }

  private buildDoc() {
    const config = this.buildConfig();
    return SwaggerModule.createDocument(this.app, config, documentOptions);
  }

  private buildConfig() {
    return new DocumentBuilder()
      .setTitle(APPLICATION_NAME)
      .setDescription(SWAGGER_DESCRIPTION)
      .setVersion(REST_API_VERSION)
      .setContact(CONTACT_NAME, CONTACT_URL, CONTACT_EMAIL)
      .addServer(APPLICATION_URL)
      .addBearerAuth(
        {
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'jwt',
      )
      .build();
  }
}
