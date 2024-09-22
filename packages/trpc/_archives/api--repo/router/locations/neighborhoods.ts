import { createTRPCRouter, publicProcedure } from "~/server/trpc";
import { TRPCError } from "@trpc/server";

import {
  GetNeighborhoodsInputSchema,
  GetNeighborhoodsOutputSchema,
  GetNeighborhoodVenuesInputSchema,
  GetNeighborhoodVenuesOutputSchema,
  GetNeighborhoodEventsInputSchema,
  GetNeighborhoodEventsOutputSchema,
} from "@livemusicx/schema/locations/neighborhood";

import {
  GetAllNeighborhoodsQuery,
  GetNeighborhoodVenuesQuery,
  GetNeighborhoodEventsQuery,
} from "./neighborhoods.queries";

export const neighborhoodsRouter = createTRPCRouter({
  list: publicProcedure
    .meta({ openapi: { method: "GET", path: "/locations/neighborhoods", tags: ["locations"] } })
    .input(GetNeighborhoodsInputSchema)
    .output(GetNeighborhoodsOutputSchema)
    .query(({ ctx, input }) =>
      ctx.prisma.neighborhood.findMany(GetAllNeighborhoodsQuery(input))
    ),
  getVenues: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/locations/neighborhoods/{id}/venues",
        tags: ["locations"],
      },
    })
    .input(GetNeighborhoodVenuesInputSchema)
    .output(GetNeighborhoodVenuesOutputSchema)
    .query(async ({ ctx, input }) => {
      const neighborhood = await ctx.prisma.neighborhood.findUnique(
        GetNeighborhoodVenuesQuery(input)
      );
      if (!neighborhood)
        throw new TRPCError({ code: "NOT_FOUND", message: "Neighborhood not found" });
      return neighborhood.venues;
    }),
  getEvents: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/locations/neighborhoods/{id}/events",
        tags: ["locations"],
      },
    })
    .input(GetNeighborhoodEventsInputSchema)
    .output(GetNeighborhoodEventsOutputSchema)
    .query(async ({ ctx, input }) => {
      const neighborhood = await ctx.prisma.neighborhood.findUnique(
        GetNeighborhoodEventsQuery(input)
      );
      if (!neighborhood)
        throw new TRPCError({ code: "NOT_FOUND", message: "Neighborhood not found" });
      return [];
      // return neighborhood.events;
    }),
});
