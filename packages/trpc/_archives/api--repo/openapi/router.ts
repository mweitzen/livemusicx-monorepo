import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/trpc";

import { accountsRouter } from "@/server/api/accounts";
import { eventsRouter } from "@/server/api/events";
import { bulletinsRouter } from "@/server/api/bulletins";
import { generalRouter } from "@/server/api/general";
import { locationsRouter } from "@/server/api/locations";

export const openApiRouter = createTRPCRouter({
  accounts: accountsRouter,
  events: eventsRouter,
  bulletins: bulletinsRouter,
  general: generalRouter,
  locations: locationsRouter,
  openapi: publicProcedure
    .meta({ openapi: { method: "GET", path: "/general/say-hello", tags: ["general"] } })
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    }),
  protected: protectedProcedure
    .meta({
      openapi: { method: "GET", path: "/general/say-hello-protected", tags: ["general"] },
    })
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    }),
});
