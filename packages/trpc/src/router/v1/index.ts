import { createTRPCRouter } from "../../trpc";

import { accountsRouter } from "./accounts";
import { eventsRouter } from "./events";
import { usersRouter } from "./users";
import { locationsRouter } from "./locations";

export const v1Router = createTRPCRouter({
  locations: locationsRouter,
  accounts: accountsRouter,
  events: eventsRouter,
  users: usersRouter,
});
