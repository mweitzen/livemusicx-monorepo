import { auth } from "@repo/auth";
import { prisma } from "@/lib/prisma";
import { inferAsyncReturnType } from "@trpc/server";

interface CreateContextOptions {
  headers: Headers;
}

export const createTRPCContext = async (opts: CreateContextOptions) => {
  const session = await auth();
  return {
    session,
    prisma,
    headers: opts.headers,
  };
};

export type TRPCContext = inferAsyncReturnType<typeof createTRPCContext>;
