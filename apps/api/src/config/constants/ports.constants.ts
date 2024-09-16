export const PORTS = {
  // REVERSE PROXY
  NGINX: 80,
  NGINX_HTTPS: 443,

  // DATABSE
  DATABASE: 5432,
  DATABASE_ADMIN: 15432,

  // STATIC
  STATIC: 3000,

  // AUTH
  AUTH: 4000,

  // GATEWAYS
  API: 5000,
  GRAPHQL: 5001,
  WEBSOCKET: 5002,

  // SERVICES
  NOTIFICATION: 5003,
  CONTENT: 5004,
  MEDIA: 5005,
} as const;

export const SUBDOMAINS = {
  // STATIC
  STATIC: 'static',

  // AUTH
  AUTH: 'auth',

  // GATEWAYS
  API: 'api',
  GRAPHQL: 'graph',
  WEBSOCKET: 'io',

  //SERVICES
  NOTIFICATION: 'notify',
  CONTENT: 'content',
  MEDIA: 'upload',
} as const;
