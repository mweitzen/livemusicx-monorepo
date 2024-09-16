import type { NextAuthConfig } from "next-auth";
import Google, { type GoogleProfile } from "next-auth/providers/google";

export default {
  providers: [
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
  ],
} satisfies NextAuthConfig;
