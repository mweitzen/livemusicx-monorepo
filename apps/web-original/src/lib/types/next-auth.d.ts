import type { UserRole, AccountType } from "@repo/db";

declare module "next-auth" {
  interface User {
    firstName?: string;
    lastName?: string | undefined;
    role?: UserRole;
    accountType?: AccountType;
    isOAuth?: boolean;
    userVerified?: boolean;
    emailVerified?: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: UserRole;
    accountType: AccountType;
    isOAuth: boolean;
    userVerified: boolean;
    emailVerified: boolean;
  }
}
