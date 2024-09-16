import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";

import {
  GetRegionsInputSchema,
  GetRegionsOutputSchema,
  GetRegionCitiesInputSchema,
  GetRegionCitiesOutputSchema,
  GetRegionVenuesInputSchema,
  GetRegionVenuesOutputSchema,
  GetRegionEventsInputSchema,
  GetRegionEventsOutputSchema,
} from "@livemusicx/schema/locations/region";

import {
  GetAllRegionsQuery,
  GetRegionCitiesQuery,
  GetRegionVenuesQuery,
  GetRegionEventsQuery,
} from "./regions.queries";

export const regionsRouter = createTRPCRouter({
  list: publicProcedure
    .meta({ openapi: { method: "GET", path: "/locations/regions", tags: ["locations"] } })
    .input(GetRegionsInputSchema)
    .output(GetRegionsOutputSchema)
    .query(({ ctx, input }) => ctx.prisma.region.findMany(GetAllRegionsQuery(input))),

  getCities: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/locations/regions/{id}/cities", tags: ["locations"] },
    })
    .input(GetRegionCitiesInputSchema)
    .output(GetRegionCitiesOutputSchema)
    .query(async ({ ctx, input }) => {
      const region = await ctx.prisma.region.findUnique(GetRegionCitiesQuery(input));
      if (!region) throw new TRPCError({ code: "NOT_FOUND", message: "Region not found" });
      return region.cities;
    }),
  getVenues: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/locations/regions/{id}/venues", tags: ["locations"] },
    })
    .input(GetRegionVenuesInputSchema)
    .output(GetRegionVenuesOutputSchema)
    .query(async ({ ctx, input }) => {
      const region = await ctx.prisma.region.findUnique(GetRegionVenuesQuery(input));
      if (!region) throw new TRPCError({ code: "NOT_FOUND", message: "Region not found" });
      return region.venues;
    }),
  getEvents: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/locations/regions/{id}/events", tags: ["locations"] },
    })
    .input(GetRegionEventsInputSchema)
    .output(GetRegionEventsOutputSchema)
    .query(async ({ ctx, input }) => {
      const region = await ctx.prisma.region.findUnique(GetRegionEventsQuery(input));
      if (!region) throw new TRPCError({ code: "NOT_FOUND", message: "Region not found" });
      return [];
      // return region.events;
    }),
});
