import { z } from "zod";
import type { RouterInputs, RouterOutputs } from "~/lib/trpc/shared";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  authorizedProcedure,
} from "~/server/trpc";

import { createSlug, generateUniqueSlug } from "@repo/utils";

import {
  GetAllGroupsInputSchema,
  GetAllGroupsOutputSchema,
  GetGroupDetailsInputSchema,
  GetGroupDetailsOutputSchema,
  GetGroupEventsInputSchema,
  GetGroupEventsOutputSchema,
  CreateGroupInputSchema,
  ClaimGroupInputSchema,
} from "~/lib/schema/accounts/groups";

import { GetAllGroupsQuery } from "./groups.queries";

type GroupsOutputs = RouterOutputs["accounts"]["groups"];

export type AllGroups = GroupsOutputs["getAll"];
export type FavoriteGroups = GroupsOutputs["getFavorites"];
export type GroupDetails = GroupsOutputs["getDetails"];

type GroupsInputs = RouterInputs["accounts"]["groups"];

export type GetAllGroupsInput = GroupsInputs["getAll"];
export type GetUsersFavoriteGroupsInput = GroupsInputs["getFavorites"];

export const groupsRouter = createTRPCRouter({
  /*
   *
   * PUBLIC */
  getTotalCount: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/groups/count", tags: ["accounts"] } })
    .input(GetAllGroupsInputSchema)
    .output(z.number())
    .query(({ ctx }) => ctx.prisma.musicGroup.count()),
  getAll: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/groups", tags: ["accounts"] } })
    .input(GetAllGroupsInputSchema)
    // .output(GetAllGroupsOutputSchema)
    .query(({ ctx, input }) =>
      ctx.prisma.musicGroup.findMany(
        GetAllGroupsQuery(input, ctx.session?.user),
      ),
    ),
  getDetails: publicProcedure
    // .meta({
    //   openapi: { method: "GET", path: "/accounts/groups/{id}", tags: ["accounts"] },
    // })
    .input(GetGroupDetailsInputSchema)
    // .output(GetGroupDetailsOutputSchema)
    .query(({ ctx, input }) =>
      ctx.prisma.musicGroup.findUnique({
        where: {
          id: input.id || undefined,
          slug: input.slug || undefined,
        },
        include: {
          events: {
            orderBy: {
              timeStart: "asc",
            },
            take: 5,
          },
          basedIn: true,
          members: true,
          media: true,
          genres: true,
          affiliatedVenues: true,
          affiliatedOrganizers: true,
          _count: {
            select: {
              favoritedBy: true,
            },
          },
        },
      }),
    ),

  getEvents: publicProcedure
    // .meta({
    //   openapi: {
    //     method: "GET",
    //     path: "/accounts/groups/{id}/events",
    //     tags: ["accounts", "events"],
    //   },
    // })
    .input(GetGroupEventsInputSchema)
    // .output(GetGroupEventsOutputSchema)
    .query(async ({ ctx, input }) => {
      const group = await ctx.prisma.musicGroup.findUnique({
        where: {
          id: input.id || undefined,
          slug: input.slug || undefined,
        },
        select: {
          events: {
            orderBy: {
              timeStart: "asc",
            },
          },
        },
      });
      if (!group) return [];

      return group.events;
    }),

  /*
   *
   * PROTECTED */
  getFavorites: protectedProcedure.query(() => {}),
  addToFavorites: protectedProcedure.query(() => {}),
  removeFromFavorites: protectedProcedure.query(() => {}),

  /*
   *
   * AUTHORIZED */
  createAccount: authorizedProcedure
    // .meta({ openapi: { method: "POST", path: "/accounts/groups" } })
    .input(CreateGroupInputSchema)
    // .output()
    .mutation(async ({ ctx, input }) => {
      // Create slug
      let slug = createSlug(input.name);
      let returnSlug = slug;
      let exists = await ctx.prisma.musicGroup.findUnique({ where: { slug } });
      let x = 1;
      while (exists) {
        returnSlug = `${slug}-${x}`;
        exists = await ctx.prisma.musicGroup.findUnique({
          where: { slug: returnSlug },
        });
        x++;
      }

      const newAccount = await ctx.prisma.musicGroup.create({
        data: {
          // ...input,
          name: input.name,
          about: input.about,
          slug: returnSlug,
          active: true,
          accountManager: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          performerType: "group",
        },
      });

      return newAccount;
    }),
  claimAccount: authorizedProcedure
    // .meta({ openapi: { method: "POST", path: "/accounts/groups/{id}/claim" } })
    .input(ClaimGroupInputSchema)
    .mutation(({ ctx, input }) => {
      return {
        ...input,
      };
    }),
  updateAccount: authorizedProcedure.mutation(() => {}),
  deactivateAccount: authorizedProcedure.mutation(() => {}),
  transferAccount: authorizedProcedure.mutation(() => {}),
  inviteMember: authorizedProcedure.mutation(() => {}),
  addMember: authorizedProcedure.mutation(() => {}),
  removeMember: authorizedProcedure.mutation(() => {}),
  requestAffiliation: authorizedProcedure.mutation(() => {}),
  removeAffiliation: authorizedProcedure.mutation(() => {}),
  sendInquiry: authorizedProcedure.mutation(() => {}),
});
