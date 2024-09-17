import { createTRPCRouter } from "../../../trpc";

import { statesRouter } from "./states";
import { regionsRouter } from "./regions";
import { citiesRouter } from "./cities";
import { neighborhoodsRouter } from "./neighborhoods";

export const locationsRouter = createTRPCRouter({
  states: statesRouter,
  regions: regionsRouter,
  cities: citiesRouter,
  neighborhoods: neighborhoodsRouter,
});
