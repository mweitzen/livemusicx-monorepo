import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  APPLICATION_NAME,
  CONTACT_EMAIL,
  CONTACT_NAME,
  CONTACT_URL,
  REST_API_VERSION,
} from '@app/constants';

import {
  SWAGGER_CUSTOM_OPTIONS,
  SWAGGER_DESCRIPTION,
  SWAGGER_DOCUMENT_OPTIONS,
  SWAGGER_PATHNAME,
} from './swagger.constants';

export class SwaggerDocBuilder {
  constructor(private app: INestApplication<any>) {}

  public setup() {
    const docs = this.buildDoc();
    SwaggerModule.setup(
      SWAGGER_PATHNAME,
      this.app,
      docs,
      SWAGGER_CUSTOM_OPTIONS,
    );
  }

  private buildDoc() {
    const config = this.buildConfig();
    return SwaggerModule.createDocument(
      this.app,
      config,
      SWAGGER_DOCUMENT_OPTIONS,
    );
  }

  private buildConfig() {
    return new DocumentBuilder()
      .setTitle(APPLICATION_NAME)
      .setDescription(SWAGGER_DESCRIPTION)
      .setVersion(REST_API_VERSION)
      .setContact(CONTACT_NAME, CONTACT_URL, CONTACT_EMAIL)
      .addServer(`http://api.localhost`)
      .addBearerAuth(
        {
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'Access Token',
      )
      .build();
  }
}
