import { createTRPCRouter } from "~/server/trpc";

import { accountsRouter } from "./accounts";
import { eventsRouter } from "./events";
import { usersRouter } from "./users";
import { bulletinsRouter } from "./bulletins";
import { locationsRouter } from "./locations";
import { generalRouter } from "./general";

export const appRouter = createTRPCRouter({
  general: generalRouter,
  locations: locationsRouter,
  accounts: accountsRouter,
  events: eventsRouter,
  users: usersRouter,
  bulletins: bulletinsRouter,
});

export type AppRouter = typeof appRouter;
