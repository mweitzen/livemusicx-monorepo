import { createTRPCRouter } from "../../../trpc";

import { statesRouter } from "./states";

export const locationsRouter = createTRPCRouter({
  states: statesRouter,
});
