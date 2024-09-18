import { z } from "zod";
import type { RouterInputs, RouterOutputs } from "@/lib/trpc/shared";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/trpc";

import {
  GetAllPerformersInputSchema,
  GetAllPerformersOutputSchema,
  GetPerformersQuickViewInputSchema,
  GetPerformersQuickViewOutputSchema,
} from "@/lib/schema/accounts/performers";
import { GetAllMusiciansQuery } from "./musicians.queries";
import { GetAllGroupsQuery } from "./groups.queries";
import {
  QuickViewAccountsWhere,
  QuickViewAccountsSelect,
} from "../shared.queries";

type PerformersOutputs = RouterOutputs["accounts"]["performers"];

export type AllPerformers = PerformersOutputs["getAll"];
export type QuickViewPerformers = PerformersOutputs["getQuickView"];
export type FavoritePerformers = PerformersOutputs["getUsersFavorites"];

type PerformersInputs = RouterInputs["accounts"]["performers"];

export type GetAllPerformersInput = PerformersInputs["getAll"];
export type GetUsersFavoritePerformersInput =
  PerformersInputs["getUsersFavorites"];

export const performersRouter = createTRPCRouter({
  getTotalCount: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/performers/count", tags: ["accounts"] } })
    .input(GetAllPerformersInputSchema)
    .output(z.number())
    .query(async ({ ctx }) => {
      const musicianCount = await ctx.prisma.musician.count();
      const groupCount = await ctx.prisma.musicGroup.count();

      return musicianCount + groupCount;
    }),
  getAll: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/performers", tags: ["accounts"] } })
    .input(GetAllPerformersInputSchema)
    // .output(GetAllPerformersOutputSchema)
    .query(async ({ ctx, input }) => {
      const musicians = await ctx.prisma.musician.findMany(
        GetAllMusiciansQuery(input, ctx.session?.user),
      );

      const groups = await ctx.prisma.musicGroup.findMany(
        GetAllGroupsQuery(input, ctx.session?.user),
      );
      return [...musicians, ...groups].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }),
  getQuickView: publicProcedure
    // .meta({
    //   openapi: { method: "GET", path: "/accounts/performers/quick-view", tags: ["accounts"] },
    // })
    .input(GetPerformersQuickViewInputSchema)
    // .output(GetPerformersQuickViewOutputSchema)
    .query(async ({ ctx }) => {
      const query = {
        take: 5,
        where: QuickViewAccountsWhere,
        select: {
          ...QuickViewAccountsSelect,
          performerType: true,
          basedIn: {
            select: {
              name: true,
            },
          },
        },
      };
      const musicians = await ctx.prisma.musician.findMany(query);
      const groups = await ctx.prisma.musicGroup.findMany(query);

      return [...musicians, ...groups].sort(
        (a, b) =>
          (a.events[0].timeStart as any) - (b.events[0].timeStart as any),
      );
    }),
  getUsersFavorites: protectedProcedure.query(async ({ ctx }) => {
    const where = {
      favoritedBy: {
        some: {
          id: ctx.session.user.id,
        },
      },
    };

    const include = {
      username: true,
    };

    const musicians = await ctx.prisma.musician.findMany({
      where,
      include,
    });

    const groups = await ctx.prisma.musicGroup.findMany({
      where,
      include,
    });

    return [...musicians, ...groups];
  }),
});
