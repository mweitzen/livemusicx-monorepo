import { User as RawUser } from '@prisma/client';

export type User = Omit<RawUser, 'password' | 'isActive'>;

export type PublicUser = Omit<User, ''>;
// export type PerformerUser = User;
