enum NotificationService {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP',
}

export class NotificationChannel {
  // primary id `${resource-slug}-${channel-type}`
  // `<producer|resource>-<trigger>`
  channelId: string;

  // Human readable display name
  name: string;

  // Resource that produces notifications
  producerId: string;

  // Users subscribed to channel (id references to users)
  subscibers: string[];

  // Notification service
  service: NotificationService;
}
