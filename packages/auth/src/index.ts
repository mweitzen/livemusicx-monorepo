import NextAuth from "next-auth";

import { authConfig } from "./config";

export type { Session, User } from "next-auth";
export { AuthError } from "next-auth";

const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export { handlers, auth, signIn, signOut };

export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";
