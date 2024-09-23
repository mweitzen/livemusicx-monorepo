import { createTRPCRouter } from "./trpc";

import { v1Router } from "./router/v1";

import { authRouter } from "./router/auth";
import { eventsRouter } from "./router/events";
import { generalRouter } from "./router/general";
import { accountsRouter } from "./router/accounts";

export const appRouter = createTRPCRouter({
  v1: v1Router,
  auth: authRouter,
  general: generalRouter,
  events: eventsRouter,
  accounts: accountsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
