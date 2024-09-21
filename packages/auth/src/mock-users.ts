import { UserRole, AccountType } from "@repo/db/schema";

export const users = [
  {
    id: "1",
    name: "Michael Weitzenhoffer",
    email: "mweitzenhoffer@gmail.com",
    password: "password",
    role: UserRole.ADMIN,
    type: AccountType.PERFORMER,
    isVerified: true,
    isSetup: true,
  },
  {
    id: "2",
    name: "Test User",
    email: "test@gmail.com",
    password: "password",
    role: UserRole.USER,
    type: AccountType.PUBLIC,
    isVerified: false,
    isSetup: false,
  },
];
