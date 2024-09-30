import { APPLICATION_NAME, STATIC_CSS_URL } from '~/constants';

export const SWAGGER_PATHNAME = `docs` as const;
export const SWAGGER_DOCUMENT_TITLE = `${APPLICATION_NAME} Docs` as const;
export const SWAGGER_DESCRIPTION = `${APPLICATION_NAME} Rest API` as const;
export const SWAGGER_CSS_URL = `${STATIC_CSS_URL}/swagger.css` as const;
