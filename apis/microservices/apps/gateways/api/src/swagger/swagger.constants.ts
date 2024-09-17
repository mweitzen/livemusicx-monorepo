import { SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';
import { APPLICATION_NAME, FAVICON_URL, STATIC_CSS_URL } from '@app/constants';

export const SWAGGER_PATHNAME = `docs` as const;
export const SWAGGER_DOCUMENT_TITLE = `${APPLICATION_NAME} Docs` as const;
export const SWAGGER_DESCRIPTION = `${APPLICATION_NAME} Rest API` as const;
export const SWAGGER_CSS_URL = `${STATIC_CSS_URL}/swagger.css` as const;

export const SWAGGER_DOCUMENT_OPTIONS: SwaggerDocumentOptions = {
  ignoreGlobalPrefix: true,
  operationIdFactory: (_, methodKey) => methodKey,
};

export const SWAGGER_CUSTOM_OPTIONS: SwaggerCustomOptions = {
  customSiteTitle: SWAGGER_DOCUMENT_TITLE,
  customCssUrl: SWAGGER_CSS_URL,
  customfavIcon: FAVICON_URL,
  swaggerOptions: {},
};
