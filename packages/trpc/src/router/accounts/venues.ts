import { z } from "zod";
import { createSlug } from "@/lib/utils";
import type { RouterInputs, RouterOutputs } from "@/lib/trpc/shared";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  authorizedProcedure,
} from "@/server/trpc";

import {
  VenuesWhere,
  QuickViewTake,
  QuickViewAccountsSelect,
  QuickViewAccountsWhere,
} from "@/server/api/shared.queries";

import {
  GetAllVenuesInputSchema,
  GetAllVenuesOutputSchema,
  GetVenueDetailsInputSchema,
  GetVenueDetailsOutputSchema,
  GetVenueEventsInputSchema,
  GetVenueEventsOutputSchema,
  GetVenueQuickViewInputSchema,
  GetVenueQuickViewOutputSchema,
  CreateVenueInuptSchema,
  CreateVenueOutputSchema,
} from "@/lib/schema/accounts/venues";

type VenuesOutputs = RouterOutputs["accounts"]["venues"];

export type AllVenues = VenuesOutputs["getAll"];
export type QuickViewVenues = VenuesOutputs["getQuickView"];
export type FavoriteVenues = VenuesOutputs["getFavorites"];
export type VenueDetails = VenuesOutputs["getDetails"];

type VenuesInputs = RouterInputs["accounts"]["venues"];

export type GetAllVenuesInput = VenuesInputs["getAll"];
export type GetUsersFavoriteVenuesInput = VenuesInputs["getFavorites"];

export const venuesRouter = createTRPCRouter({
  /*
   *
   * PUBLIC */
  getCount: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/venues/count", tags: ["accounts"] } })
    .input(GetAllVenuesInputSchema)
    .output(z.number())
    .query(({ ctx }) => ctx.prisma.venue.count()),
  getAll: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/venues", tags: ["accounts"] } })
    .input(GetAllVenuesInputSchema)
    // .output(GetAllVenuesOutputSchema)
    .query(({ ctx, input }) =>
      ctx.prisma.venue.findMany({
        take: input.take,
        skip: (input.page - 1) * input.take,
        where: VenuesWhere(input, ctx.session?.user),
        orderBy: {
          name: "asc",
        },
        include: {
          city: true,
          neighborhood: true,
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
  getDetails: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/venues/{id}", tags: ["accounts"] } })
    .input(GetVenueDetailsInputSchema)
    // .output(GetVenueDetailsOutputSchema)
    .query(async ({ ctx, input }) => {
      return ctx.prisma.venue.findUnique({
        where: {
          id: input.id || undefined,
          slug: input.slug || undefined,
        },
        include: {
          city: true,
          neighborhood: true,
          events: {
            orderBy: {
              timeStart: "asc",
            },
            take: 5,
          },
          stages: true,
          genres: true,
          affiliatedMusicians: true,
          affiliatedGroups: true,
          affiliatedOrganizers: true,
          _count: {
            select: {
              favoritedBy: true,
            },
          },
        },
      });
    }),
  getEvents: publicProcedure
    // .meta({
    //   openapi: { method: "GET", path: "/accounts/venues/{id}/events", tags: ["accounts"] },
    // })
    .input(GetVenueEventsInputSchema)
    // .output(GetVenueEventsOutputSchema)
    .query(async ({ ctx, input }) => {
      const venue = await ctx.prisma.venue.findUnique({
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
      if (!venue) return [];

      return venue.events;
    }),
  getQuickView: publicProcedure
    // .meta({
    //   openapi: { method: "GET", path: "/accounts/venues/quick-view", tags: ["accounts"] },
    // })
    .input(GetVenueQuickViewInputSchema)
    // .output(GetVenueQuickViewOutputSchema)
    .query(async ({ ctx }) => {
      const venues = await ctx.prisma.venue.findMany({
        take: QuickViewTake,
        where: QuickViewAccountsWhere,
        select: {
          ...QuickViewAccountsSelect,
          type: true,
          city: { select: { name: true } },
        },
      });
      console.log("venues", venues);
      return venues.sort(
        (a, b) => (a.events[0].timeStart as any) - (b.events[0].timeStart as any)
      );
    }),

  /*
   *
   * PROTECTED */
  getFavorites: protectedProcedure.query(async ({ ctx }) => {}),
  addToFavorites: protectedProcedure.mutation(async ({ ctx }) => {}),
  removeFromFavorites: protectedProcedure.mutation(async ({ ctx }) => {}),

  /*
   *
   * AUTHORIZED */
  createAccount: authorizedProcedure
    // .meta({
    //   openapi: { method: "POST", path: "/accounts/venues", tags: ["accounts"], protect: true },
    // })
    .input(CreateVenueInuptSchema)
    // .output(CreateVenueOutputSchema)
    .mutation(async ({ ctx, input }) => {
      // Create slug
      let slug = createSlug(input.name);
      let exists = await ctx.prisma.venue.findUnique({ where: { slug } });
      let x = 1;
      while (exists) {
        slug = `${slug}-${x}`;
        exists = await ctx.prisma.venue.findUnique({ where: { slug } });
        x++;
      }
    }),
  claimAccount: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/accounts/venues/{id}/claim",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .mutation(async ({ ctx }) => {}),
  updateAccount: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/accounts/venues/{id}",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .mutation(async ({ ctx }) => {}),
  deactivateAccount: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/accounts/venues/{id}/deactivate",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .mutation(async ({ ctx }) => {}),
  transferAccount: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/accounts/venues/{id}/transfer",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .mutation(async ({ ctx }) => {}),
  inviteAssociate: authorizedProcedure.mutation(async ({ ctx }) => {}),
  removeAssociate: authorizedProcedure.mutation(async ({ ctx }) => {}),
  requestAffiliation: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/accounts/venues/{id}/request",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .mutation(async ({ ctx }) => {}),
  removeAffiliation: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/accounts/venues/{id}/remove-affiliation",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .mutation(async ({ ctx }) => {}),
  sendInquiry: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/accounts/venues/{id}/inquiry",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .mutation(async ({ ctx }) => {}),
  addStage: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/accounts/venues/{id}/stages",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .mutation(async ({ ctx }) => {}),
  updateStage: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/accounts/venues/{id}/stages/{stageId}",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .mutation(async ({ ctx }) => {}),
  removeStage: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "DELETE",
    //     path: "/accounts/venues/{id}/stages/{stageId}",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .mutation(async ({ ctx }) => {}),
});
