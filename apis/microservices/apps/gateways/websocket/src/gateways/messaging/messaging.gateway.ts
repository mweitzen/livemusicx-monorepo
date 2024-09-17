import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { MessagingService } from './messaging.service';
import { gatewayOptions } from '../gateway.options';
import { WS_NAMESPACES } from '../../constants';

@WebSocketGateway({
  namespace: WS_NAMESPACES.MESSAGING,
  ...gatewayOptions,
})
export class MessagingGateway {
  constructor(private readonly messagingService: MessagingService) {}

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<string> {
    return `the message was ${data}`;
  }
}
