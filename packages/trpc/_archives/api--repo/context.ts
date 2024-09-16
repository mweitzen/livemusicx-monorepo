import { prisma } from "@livemusicx/db";
import { inferAsyncReturnType } from "@trpc/server";
import type { Session } from "next-auth";

interface CreateContextOptions {
  session: Session | null;
  headers: Headers;
}

export const createTRPCContext = async (opts: CreateContextOptions) => {
  // const session = await auth();
  return {
    prisma,
    session: opts.session,
    headers: opts.headers,
  };
};

export type TRPCContext = inferAsyncReturnType<typeof createTRPCContext>;
