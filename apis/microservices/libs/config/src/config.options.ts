import type { ConfigModuleOptions } from '@nestjs/config';
import { configSchema } from './config.schema';
import { ENV_LOCAL_PATH } from './config.constants';
import databaseConfig from './lib/database.config';

export const configOptions = {
  isGlobal: true,
  envFilePath: ENV_LOCAL_PATH,
  expandVariables: true,
  validationSchema: configSchema,
  validationOptions: {
    abortEarly: true,
  },
  load: [databaseConfig],
} satisfies ConfigModuleOptions;
