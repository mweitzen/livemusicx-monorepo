declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_SECRET: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    NEXT_PUBLIC_SITE_URL: string;
    AUTH_URL: string;

    POSTGRES_URL: string;
    POSTGRES_PRISMA_URL: string;
    POSTGRES_URL_NON_POOLING: string;

    RESEND_API_KEY: string;
    GOOGLE_MAPS_API_KEY: string;
  }
}
