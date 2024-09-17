import { createTRPCRouter } from "../../trpc";

import { accountsRouter } from "./accounts";
import { eventsRouter } from "./events";
import { usersRouter } from "./users";
import { bulletinsRouter } from "./bulletins";
import { locationsRouter } from "./locations";
import { generalRouter } from "./general";

export const v1Router = createTRPCRouter({
  general: generalRouter,
  locations: locationsRouter,
  accounts: accountsRouter,
  events: eventsRouter,
  users: usersRouter,
  bulletins: bulletinsRouter,
});
