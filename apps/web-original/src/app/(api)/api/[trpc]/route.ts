import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { auth } from "@repo/auth";

import { appRouter, createTRPCContext } from "@repo/trpc";

const handler = auth(async (req) => {
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () =>
      createTRPCContext({
        session: req.auth,
        headers: req.headers,
      }),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error);
    },
  });
  return response;
});

export { handler as GET, handler as POST };
