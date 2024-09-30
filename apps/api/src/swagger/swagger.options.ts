import { SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';
import { SWAGGER_DOCUMENT_TITLE, SWAGGER_CSS_URL } from './swagger.constants';
import { FAVICON_URL } from '~/constants';

/**
 * Swagger Document Options
 *
 */
export const documentOptions: SwaggerDocumentOptions = {
  ignoreGlobalPrefix: true,
  operationIdFactory: (_, methodKey) => methodKey,
};

/**
 * Swagger Custom Options
 *
 */
export const customOptions: SwaggerCustomOptions = {
  customSiteTitle: SWAGGER_DOCUMENT_TITLE,
  customCssUrl: SWAGGER_CSS_URL,
  customfavIcon: FAVICON_URL,
  swaggerOptions: {
    persistAuthorization: true,
  },
};
