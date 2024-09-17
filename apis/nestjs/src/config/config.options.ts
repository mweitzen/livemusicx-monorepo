import type { ConfigModuleOptions } from '@nestjs/config';
import { configSchema } from './config.schema';

export const configOptions = {
  isGlobal: true,
  expandVariables: true,
  validationSchema: configSchema,
  validationOptions: {
    abortEarly: true,
  },
} satisfies ConfigModuleOptions;
