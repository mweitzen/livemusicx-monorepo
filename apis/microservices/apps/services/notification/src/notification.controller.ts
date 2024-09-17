import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern } from '@nestjs/microservices';
import { User } from '@app/data/entities/user';

@Controller()
export class NotificationController {
  constructor(private readonly notificationsService: NotificationService) {}

  @EventPattern('user-created')
  handleUserCreated(user: User) {
    console.log('New User Created!');
    console.log(user);
  }
}
