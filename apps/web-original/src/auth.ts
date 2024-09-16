import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AccountType, UserRole } from "@repo/db";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async jwt({ token, trigger, session, account, user, profile }) {
      // console.log("JWT -- TOKEN: ", token);
      // console.log("JWT -- ACCOUNT: ", account);
      if (!!user) {
        if (!!user.accountType) token.accountType = user.accountType;
        if (!!user.role) token.role = user.role;
      }

      if (trigger === "update") {
        let accountType: AccountType = token.accountType;
        if (session.user.accountType in AccountType) {
          accountType = session.user.accountType;
        }
        let userRole: UserRole = token.role;
        if (session.user.role in UserRole) {
          userRole = session.user.role;
        }
        token = {
          ...token,
          role: userRole,
          accountType,
          userVerified: session.user.userVerified,
        };
      }
      if (trigger === "signIn") {
      }
      if (trigger === "signUp") {
      }

      return token;
    },
    // @ts-ignore
    async session({ session, token }) {
      if (!session.user) return session;
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.accountType = token.accountType;
      session.user.isOAuth = token.isOAuth;
      session.user.userVerified = token.userVerified;
      session.user.emailVerified = token.emailVerified;

      return session;
    },
    async authorized({ request, auth }) {
      // console.log("AUTHORIZING", auth);
      const { pathname } = request.nextUrl;
      // protected routes
      if (pathname.startsWith("/account")) return !!auth;
      if (pathname.startsWith("/tickets")) return !!auth;
      if (pathname.startsWith("/favorites")) return !!auth;
      //authorized routes
      if (pathname.startsWith("/admin")) {
        if (!auth || !auth.user) return false;
        if (auth.user.accountType === "PUBLIC")
          return NextResponse.redirect(new URL(`/account`, request.url));
        return true;
      }
      // public routes
      return true;
    },
  },
  ...authConfig,
});
