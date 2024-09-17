import { createTRPCRouter } from "../../../trpc";

import { mainRouter } from "./main";
import { draftsRouter } from "./drafts";
import { templatesRouter } from "./templates";
import { seriesRouter } from "./series";

export const eventsRouter = createTRPCRouter({
  main: mainRouter,
  drafts: draftsRouter,
  templates: templatesRouter,
  series: seriesRouter,
});
