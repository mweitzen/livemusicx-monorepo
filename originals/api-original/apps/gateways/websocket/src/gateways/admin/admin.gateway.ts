import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { AdminService } from './admin.service';
import { WS_NAMESPACES } from '../../constants';
import { gatewayOptions } from '../gateway.options';

@WebSocketGateway({
  namespace: WS_NAMESPACES.ADMIN,
  ...gatewayOptions,
})
export class AdminGateway {
  constructor(private readonly adminService: AdminService) {}

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<string> {
    return 'youre an admin';
  }
}
