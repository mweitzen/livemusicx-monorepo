export const USER_CREATED = 'USER_CREATED';
export const USER_UPDATED = 'USER_UPDATED';
export const USER_DELETED = 'USER_DELETED';

// consumed generally by ineternal resources conducting server logic to handle all minor changes
export const EVENT_CREATED = 'EVENT_CREATED';
export const EVENT_UPDATED = 'EVENT_UPDATED';
export const EVENT_DELETED = 'EVENT_DELETED';

// consumed generally by notification services
export const EVENT_PUBLISHED = 'EVENT_PUBLISHED';
export const EVENT_SCHEDULED = 'EVENT_SCHEDULED'; // occurs if event published with date tbd and then adds date/time
export const EVENT_POSTPONED = 'EVENT_POSTPONED';
export const EVENT_CANCELLED = 'EVENT_CANCELLED';
export const EVENT_LOCATION_CHANGED = 'EVENT_LOCATION_CHANGED';
export const EVENT_TIME_CHANGED = 'EVENT_TIME_CHANGED';
export const EVENT_PERFORMER_CHANGED = 'EVENT_PERFORMER_CHANGED';

export const USER_REGISTERED_FOR_EVENT = 'USER_REGISTERED_FOR_EVENT';
export const USER_UNREGISTERED_FOR_EVENT = 'USER_UNREGISTERED_FOR_EVENT';
