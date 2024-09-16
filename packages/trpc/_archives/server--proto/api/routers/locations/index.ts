import { createTRPCRouter } from "@/server/api/trpc";

import { statesRouter } from "./states";

export const locationsRouter = createTRPCRouter({
  states: statesRouter,
});
