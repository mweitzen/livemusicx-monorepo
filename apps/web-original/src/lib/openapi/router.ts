import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/trpc";

import { accountsRouter } from "../../../__archives/api/accounts";
import { eventsRouter } from "../../../__archives/api/events";
import { bulletinsRouter } from "../../../__archives/api/bulletins";
import { generalRouter } from "../../../__archives/api/general";
import { locationsRouter } from "../../../__archives/api/locations";

export const openApiRouter = createTRPCRouter({
  accounts: accountsRouter,
  events: eventsRouter,
  bulletins: bulletinsRouter,
  general: generalRouter,
  locations: locationsRouter,
  openapi: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/general/say-hello", tags: ["general"] },
    })
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))(({ input }) => {
    return { greeting: `Hello ${input.name}!` };
  }),
  protected: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/general/say-hello-protected",
        tags: ["general"],
      },
    })
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))(({ input }) => {
    return { greeting: `Hello ${input.name}!` };
  }),
});
