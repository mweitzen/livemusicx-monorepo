import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { userRouter } from "./routers/user";
import { eventsRouter } from "./routers/events";
import { accountsRouter } from "./routers/accounts";
import { locationsRouter } from "./routers/locations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  events: eventsRouter,
  accounts: accountsRouter,
  locations: locationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 */
export const createCaller = createCallerFactory(appRouter);
