import { GatewayMetadata } from '@nestjs/websockets';
import { handleAllowRequest } from './auth.handler';

export const gatewayOptions = {
  cors: {
    origin: '*',
  },
  allowRequest: handleAllowRequest,
} satisfies GatewayMetadata;
