import { MESSAGE_BROKER } from '@app/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(MESSAGE_BROKER) private readonly messageBroker: ClientProxy,
  ) {}
}
