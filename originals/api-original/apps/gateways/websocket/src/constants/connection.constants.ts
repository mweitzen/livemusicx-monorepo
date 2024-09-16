export const WS_PORT = 80 as const;

export const WS_NAMESPACES = {
  EVENTS: 'events',
  MESSAGING: 'messaging',
  ADMIN: 'admin',
} as const;

export const WS_EVENTS_ROOMS = {
  PRECENSE: 'precense',
  LOBBY: 'lobby',
  STAGE: 'stage',
  BACKSTAGE: 'backstage',
  NOTIFICATIONS: 'notifications',
} as const;
