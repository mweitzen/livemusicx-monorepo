import { Prisma } from '@prisma/client';

export const BASE_USER_SELECT = {
  isActive: true,
  id: true,
  role: true,
  email: true,
  username: true,
  password: false,
  avatarUrl: true,
  createdAt: true,
  lastUpdatedAt: true,
  userVerified: true,
  firstName: true,
  lastName: true,
} satisfies Prisma.UserSelect;
