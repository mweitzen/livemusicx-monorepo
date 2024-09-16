enum NotificationFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  OCCASIONALLY = 'OCCASIONALLY',
}

interface NotificationServiceOptions {
  enabled: boolean;
  frequency: NotificationFrequency;
  filters: NotificationFilter;
}

interface NotificationFilter {
  channel: string;
  enabled: boolean;
  frequency: NotificationFrequency;
}

interface NotificationMetadata {
  lastNotified: Date;
  userInteracted: boolean;
}

export class UserPreferences {
  // Primary Key (matches user service id)
  userId: string;

  // Contact info
  phone: string;
  email: string;
  smsProvider: string;

  // Preferences
  preferences: {
    email: NotificationServiceOptions;
    sms: NotificationServiceOptions;
    push: NotificationServiceOptions;
    inApp: NotificationServiceOptions;
  };

  // Metadata
  metadata: {
    email: NotificationMetadata;
    sms: NotificationMetadata;
    push: NotificationMetadata;
    inApp: NotificationMetadata;
  };
}
