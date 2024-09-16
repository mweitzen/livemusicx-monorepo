import { NextResponse } from "next/server";
import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum UserType {
  FAN = "FAN",
  PERFORMER = "PERFORMER",
  VENUE = "VENUE",
  ORGANIZER = "ORGANIZER",
  ASSOCIATE = "ASSOCIATE",
}

interface AppUser {
  role?: UserRole;
  type?: UserType;
  isVerified?: boolean;
  isSetup?: boolean;
}

declare module "next-auth" {
  interface User extends AppUser {}

  interface Session {
    user: AppUser & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends AppUser {}
}

const users = [
  {
    id: "1",
    name: "Michael Weitzenhoffer",
    email: "mweitzenhoffer@gmail.com",
    password: "password",
    role: UserRole.ADMIN,
    type: UserType.PERFORMER,
    isVerified: true,
    isSetup: true,
  },
  {
    id: "2",
    name: "Test User",
    email: "test@gmail.com",
    password: "password",
    role: UserRole.USER,
    type: UserType.FAN,
    isVerified: false,
    isSetup: false,
  },
];

export { useSession } from "next-auth/react";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (!!user) {
        token.role = user.role;
        token.type = user.type;
        token.isVerified = user.isVerified;
        token.isSetup = user.isSetup;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.type = token.type;
      session.user.isVerified = token.isVerified;
      session.user.isSetup = token.isSetup;
      return session;
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      // NOT AUTHENTICATED
      if (!auth) {
        // Protect app pages
        const signInPage = "/api/auth/signin";
        const signInUrl = request.nextUrl.clone();
        signInUrl.pathname = signInPage;
        signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

        if (pathname.startsWith("/manage") || pathname.startsWith("/me")) {
          return NextResponse.redirect(signInUrl);
        }
      } else {
        // AUTHENTICATED
        const adminUser = auth.user.role === "ADMIN";
        const redirectToPage = adminUser ? "/manage" : "/me";

        // Hide auth pages
        if (["/signin", "/signup", "/verify"].includes(pathname)) {
          return NextResponse.redirect(
            new URL(redirectToPage, request.nextUrl)
          );
        }

        // Protect admin pages
        if (pathname.startsWith("/manage") && !adminUser) {
          return NextResponse.redirect(
            new URL(redirectToPage, request.nextUrl)
          );
        }
      }

      return true;
    },
  },
});
