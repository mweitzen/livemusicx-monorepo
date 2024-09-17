import { UserRole } from '@prisma/client';

export class JWT {
  sub: string;
  username: string;
  role: UserRole;
}
