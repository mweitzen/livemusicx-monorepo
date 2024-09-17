import { createTRPCRouter, publicProcedure } from "../../../trpc";
import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { SearchSchemaBase } from "@repo/validators";
import { Prisma } from "@prisma/client";

export const statesRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          withEvents: z.boolean().optional(),
          withVenues: z.boolean().optional(),
          withPerformers: z.boolean().optional(),
          withOrganizers: z.boolean().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      if (!input) {
        return await ctx.db.state.findMany();
      }

      let where = {} as Prisma.StateWhereInput;
      const someNotNull = {
        some: {
          name: {
            not: undefined,
          },
        },
      } as const;

      if (input.withVenues) {
        where.venues = someNotNull;
      }
      if (input.withPerformers) {
        where.cities = {
          some: {
            OR: [
              { musiciansBasedIn: someNotNull },
              { groupsBasedIn: someNotNull },
            ],
          },
        };
      }
      if (input.withOrganizers) {
        if (where.cities?.some?.OR) {
          where.cities.some.OR.push({ organizersBasedIn: someNotNull });
        } else {
          where.cities = {
            some: {
              organizersBasedIn: someNotNull,
            },
          };
        }
      }
      return await ctx.db.state.findMany({ where });
    }),

  getRegions: publicProcedure
    .input(
      z.object({
        id: z.string(),
        ...SearchSchemaBase,
      })
    )
    .query(async ({ ctx, input }) => {
      const state = await ctx.db.state.findUnique({
        where: {
          id: input.id,
        },
        select: {
          regions: {
            take: input.take,
            skip: input.take * (input.page - 1),
            orderBy: { name: "asc" },
          },
        },
      });
      if (!state)
        throw new TRPCError({ code: "NOT_FOUND", message: "State not found" });
      return state.regions;
    }),

  getCities: publicProcedure
    .input(
      z.object({
        id: z.string(),
        ...SearchSchemaBase,
      })
    )
    .query(async ({ ctx, input }) => {
      const state = await ctx.db.state.findUnique({
        where: {
          id: input.id,
        },
        select: {
          cities: {
            take: input.take,
            skip: input.take * (input.page - 1),
            orderBy: { name: "asc" },
          },
        },
      });
      if (!state)
        throw new TRPCError({ code: "NOT_FOUND", message: "State not found" });
      return state.cities;
    }),
});
