import { createTRPCRouter, publicProcedure } from "../../../trpc";
import { TRPCError } from "@trpc/server";

import {
  GetCitiesInputSchema,
  GetCitiesOutputSchema,
  GetCityNeighborhoodsInputSchema,
  GetCityNeighborhoodsOutputSchema,
  GetCityVenuesInputSchema,
  GetCityVenuesOutputSchema,
  GetCityEventsInputSchema,
  GetCityEventsOutputSchema,
} from "@/lib/schema/locations/city";

import {
  GetAllCitiesQuery,
  GetCityNeighborhoodsQuery,
  GetCityVenuesQuery,
  GetCityEventsQuery,
} from "./cities.queries";

export const citiesRouter = createTRPCRouter({
  list: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/locations/cities",
        tags: ["locations"],
      },
    })
    .input(GetCitiesInputSchema)
    .output(GetCitiesOutputSchema)
    .query(({ ctx, input }) =>
      ctx.prisma.city.findMany(GetAllCitiesQuery(input))
    ),

  getNeighborhoods: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/locations/cities/{id}/neighborhoods",
        tags: ["locations"],
      },
    })
    .input(GetCityNeighborhoodsInputSchema)
    .output(GetCityNeighborhoodsOutputSchema)
    .query(async ({ ctx, input }) => {
      const city = await ctx.prisma.city.findUnique(
        GetCityNeighborhoodsQuery(input)
      );
      if (!city)
        throw new TRPCError({ code: "NOT_FOUND", message: "City not found" });
      return city.neighborhoods;
    }),
  getVenues: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/locations/cities/{id}/venues",
        tags: ["locations"],
      },
    })
    .input(GetCityVenuesInputSchema)
    .output(GetCityVenuesOutputSchema)
    .query(async ({ ctx, input }) => {
      const city = await ctx.prisma.city.findUnique(GetCityVenuesQuery(input));
      if (!city)
        throw new TRPCError({ code: "NOT_FOUND", message: "City not found" });
      return city.venues;
    }),
  getEvents: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/locations/cities/{id}/events",
        tags: ["locations"],
      },
    })
    .input(GetCityEventsInputSchema)
    .output(GetCityEventsOutputSchema)
    .query(async ({ ctx, input }) => {
      const city = await ctx.prisma.city.findUnique(GetCityEventsQuery(input));
      if (!city)
        throw new TRPCError({ code: "NOT_FOUND", message: "City not found" });
      return [];
      // return city.events;
    }),
});
