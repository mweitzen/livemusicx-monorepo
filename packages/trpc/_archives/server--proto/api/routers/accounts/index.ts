import { createTRPCRouter } from "@/server/api/trpc";

import { venuesRouter } from "./venues";
import { organizersRouter } from "./organizers";
import { performersRouter } from "./performers";
import { musiciansRouter } from "./musicians";
import { groupsRouter } from "./groups";

export const accountsRouter = createTRPCRouter({
  venues: venuesRouter,
  organizers: organizersRouter,
  performers: performersRouter,
  musicians: musiciansRouter,
  groups: groupsRouter,
});
