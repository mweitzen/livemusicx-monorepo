import * as Joi from 'joi';

export const configSchema = Joi.object({
  /**
   * NODE
   */
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),

  /**
   * SERVICE PORTS
   */
  APP_PORT: Joi.number().port(),
  API_PORT: Joi.number().port(),
  TCP_PORT: Joi.number().port(),

  /**
   * DATABASE
   */
  DATABASE_HOST: Joi.string().hostname(),
  DATABASE_PORT: Joi.number().port(),
  DATABASE_USER: Joi.string(),
  DATABASE_PASSWORD: Joi.string(),
  DATABASE_DB: Joi.string(),
  DATABASE_URI: Joi.string(),
});
