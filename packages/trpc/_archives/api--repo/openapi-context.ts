import { prisma } from "@livemusicx/db";
import { inferAsyncReturnType } from "@trpc/server";

interface CreateContextOptions {
  headers: Headers;
}

export const createOpenAPIContext = (opts: CreateContextOptions) => {
  return {
    session: null,
    prisma,
    headers: opts.headers,
  };
};

export type OpenAPIContext = inferAsyncReturnType<typeof createOpenAPIContext>;
