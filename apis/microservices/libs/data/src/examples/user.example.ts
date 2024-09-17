import { User } from '../entities/user/base.entity';
import { UserRole } from '../enums';

export const exampleUser: User = {
  id: 'uuid',
  createdAt: new Date('2024-02-23'),
  lastUpdatedAt: new Date(),
  firstName: 'Michael',
  lastName: 'Weitzenhoffer',
  username: 'mweitzen',
  email: 'mweitzen@email.com',
  isActive: true,
  password: '$2b$12$ynxy7kdzRBxknmxLYYdKR.nqNzJhRcq/Vvu9f8doAuBrciP.fkN/m',
  role: UserRole.PUBLIC,
  // authAccount: new AuthAccount,
  bookmarkedEvents: [],
  registeredEvents: [],
  eventEdits: [],
  createdEvents: [],
  administratorOf: [],
  authAccount: undefined,
  editorOf: [],
};
