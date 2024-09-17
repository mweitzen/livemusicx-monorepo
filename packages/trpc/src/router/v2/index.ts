import { createTRPCRouter } from "../../trpc";

import { userRouter } from "./user";
import { eventsRouter } from "./events";
import { accountsRouter } from "./accounts";
import { locationsRouter } from "./locations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const v2Router = createTRPCRouter({
  user: userRouter,
  events: eventsRouter,
  accounts: accountsRouter,
  locations: locationsRouter,
});
