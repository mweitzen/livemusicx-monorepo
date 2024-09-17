import { z } from "zod";
import { createSlug } from "@repo/utils/create-slug";
import type { RouterInputs, RouterOutputs } from "@/lib/trpc/shared";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  authorizedProcedure,
} from "@/server/trpc";

import {
  GetAllOrganizersInputSchema,
  GetAllOrganizersOutputSchema,
  GetOrganizerDetailsInputSchema,
  GetOrganizerDetailsOutputSchema,
  GetOrganizerEventsInputSchema,
  GetOrganizerEventsOutputSchema,
  CreateOrganizerInputSchema,
  CreateOrganizerOutputSchema,
} from "@livemusicx/schema/accounts/organizers";

import {
  QuickViewAccountsSelect,
  QuickViewAccountsWhere,
  QuickViewTake,
} from "@/server/api/shared.queries";

type OrganizersOutputs = RouterOutputs["accounts"]["organizers"];

export type AllOrganizers = OrganizersOutputs["getAll"];
export type QuickViewOrganizers = OrganizersOutputs["getQuickView"];
export type FavoriteOrganizers = OrganizersOutputs["getFavorites"];

type OrganizersInputs = RouterInputs["accounts"]["organizers"];

export type GetAllOrganizersInput = OrganizersInputs["getAll"];

export const organizersRouter = createTRPCRouter({
  /*
   *
   * PUBLIC */
  getTotalCount: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/organizers/count", tags: ["accounts"] } })
    .input(GetAllOrganizersInputSchema)
    .output(z.number())
    .query(({ ctx }) => ctx.prisma.organizer.count()),
  getAll: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/organizers", tags: ["accounts"] } })
    .input(GetAllOrganizersInputSchema)
    // .output(GetAllOrganizersOutputSchema)
    .query(({ ctx }) =>
      ctx.prisma.organizer.findMany({
        where: {},
        select: {
          id: true,
          slug: true,
          name: true,
          avatar: true,
          basedIn: true,
          about: true,
          genres: true,
          _count: {
            select: {
              events: {
                where: {
                  timeStart: {
                    gte: new Date(),
                  },
                },
              },
            },
          },
        },
      })
    ),
  getQuickView: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/organizers/quick-view", tags: ["accounts"] } })
    // .input(z.object({}))
    // .output(z.object({}))
    .query(async ({ ctx }) => {
      const organizers = await ctx.prisma.organizer.findMany({
        take: QuickViewTake,
        // where: QuickViewAccountsWhere,
        select: {
          ...QuickViewAccountsSelect,
          basedIn: {
            select: {
              name: true,
            },
          },
        },
      });
      return organizers;
      // return organizers.sort(
      //   (a, b) => (a.events[0].timeStart as any) - (b.events[0].timeStart as any)
      // );
    }),
  getDetails: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/organizers/{id}", tags: ["accounts"] } })
    .input(GetOrganizerDetailsInputSchema)
    // .output(GetOrganizerDetailsOutputSchema)
    .query(async ({ ctx, input }) => {
      if (!input.id && !input.slug) {
        return null;
        // return "At least one of: [id, slug] must be provided to get details";
      }

      return await ctx.prisma.organizer.findUnique({
        where: {
          id: input.id || undefined,
          slug: input.slug || undefined,
        },
        include: {
          _count: {
            select: {
              favoritedBy: true,
            },
          },
          genres: true,
          basedIn: true,
          events: {
            orderBy: {
              timeStart: "asc",
            },
            take: 5,
          },
          affiliatedVenues: true,
          affiliatedGroups: true,
          affiliatedMusicians: true,
        },
      });
    }),
  getEvents: publicProcedure
    // .meta({
    //   openapi: { method: "GET", path: "/accounts/organizers/{id}/events", tags: ["accounts"] },
    // })
    .input(GetOrganizerEventsInputSchema)
    // .output(GetOrganizerEventsOutputSchema)
    .query(async ({ ctx, input }) => {
      const organizer = await ctx.prisma.organizer.findUnique({
        where: {
          id: input.id || undefined,
          slug: input.slug || undefined,
        },
        include: {
          events: {
            orderBy: {
              timeStart: "asc",
            },
          },
        },
      });
      if (!organizer) return [];

      return organizer.events;
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
    .input(CreateOrganizerInputSchema)
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
      return {
        slug: returnSlug,
        ...input,
      };
    }),
  claimAccount: authorizedProcedure.mutation(() => {}),
  updateAccount: authorizedProcedure.mutation(() => {}),
  deactivateAccount: authorizedProcedure.mutation(() => {}),
  transferAccount: authorizedProcedure.mutation(() => {}),
  inviteAssociate: authorizedProcedure.mutation(() => {}),
  removeAssociate: authorizedProcedure.mutation(() => {}),
  requestAffiliation: authorizedProcedure.mutation(() => {}),
  removeAffiliation: authorizedProcedure.mutation(() => {}),
  sendInquiry: authorizedProcedure.mutation(() => {}),
});
