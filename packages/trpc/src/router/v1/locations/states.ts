import { createTRPCRouter, publicProcedure } from "../../../trpc";
import { TRPCError } from "@trpc/server";

import {
  GetStatesInputSchema,
  GetStatesOutputSchema,
  GetStateRegionsInputSchema,
  GetStateRegionsOutputSchema,
  GetStateCitiesInputSchema,
  GetStateCitiesOutputSchema,
  GetStateVenuesInputSchema,
  GetStateVenuesOutputSchema,
  GetStateEventsInputSchema,
  GetStateEventsOutputSchema,
} from "@/lib/schema/locations/state";

import {
  GetAllStatesQuery,
  GetStateRegionsQuery,
  GetStateCitiesQuery,
  GetStateVenuesQuery,
  GetStateEventsQuery,
} from "./states.queries";

export const statesRouter = createTRPCRouter({
  list: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/locations/states",
        tags: ["locations"],
      },
    })
    .input(GetStatesInputSchema)
    .output(GetStatesOutputSchema)
    .query(({ ctx }) => ctx.prisma.state.findMany(GetAllStatesQuery)),

  getRegions: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/locations/states/{id}/regions",
        tags: ["locations"],
      },
    })
    .input(GetStateRegionsInputSchema)
    .output(GetStateRegionsOutputSchema)
    .query(async ({ ctx, input }) => {
      const state = await ctx.prisma.state.findUnique(
        GetStateRegionsQuery(input)
      );
      if (!state)
        throw new TRPCError({ code: "NOT_FOUND", message: "State not found" });
      return state.regions;
    }),
  getCities: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/locations/states/{id}/cities",
        tags: ["locations"],
      },
    })
    .input(GetStateCitiesInputSchema)
    .output(GetStateCitiesOutputSchema)
    .query(async ({ ctx, input }) => {
      const state = await ctx.prisma.state.findUnique(
        GetStateCitiesQuery(input)
      );
      if (!state)
        throw new TRPCError({ code: "NOT_FOUND", message: "State not found" });
      return state.cities;
    }),
  getVenues: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/locations/states/{id}/venues",
        tags: ["locations"],
      },
    })
    .input(GetStateVenuesInputSchema)
    .output(GetStateVenuesOutputSchema)
    .query(async ({ ctx, input }) => {
      const state = await ctx.prisma.state.findUnique(
        GetStateVenuesQuery(input)
      );
      if (!state)
        throw new TRPCError({ code: "NOT_FOUND", message: "State not found" });
      return state.venues;
    }),
  getEvents: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/locations/states/{id}/events",
        tags: ["locations"],
      },
    })
    .input(GetStateEventsInputSchema)
    .output(GetStateEventsOutputSchema)
    .query(async ({ ctx, input }) => {
      const state = await ctx.prisma.state.findUnique(
        GetStateEventsQuery(input)
      );
      if (!state)
        throw new TRPCError({ code: "NOT_FOUND", message: "State not found" });
      return [];
      // return state.events;
    }),
});
