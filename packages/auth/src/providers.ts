import { users } from "./mock-users";

import type { Provider } from "next-auth/providers";
import { CredentialsSignin } from "next-auth";
import Google, { type GoogleProfile } from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email address" },
      password: { label: "Password" },
    },
    /*  TODO: IMPLEMENT */
    async authorize(credentials) {
      const foundUser = users.find(
        (item: (typeof users)[0]) => item.email === credentials.email
      );

      if (!foundUser) throw new CredentialsSignin("invalid-user");

      const { password, ...user } = foundUser;
      if (password !== credentials.password)
        throw new CredentialsSignin("invalid-credentials");

      // return user;
      return user;
    },
  }),
  Google({
    profile(profile: GoogleProfile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        emailVerified: profile.email_verified,
        image: profile.picture,
        role: "USER",
        accountType: "PUBLIC",
        userVerified: false,
        // isOAuth: true,
      };
    },
  }),
];
