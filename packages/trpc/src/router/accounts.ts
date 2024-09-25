import type { TRPCRouterRecord } from "@trpc/server";

import {
  authorizedProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

import {
  GetFeaturedAccountsInput,
  SearchAccountsInput,
} from "@repo/validators/accounts";

import { __PLACEHOLDER__ } from "@repo/validators/general";
import { FEATURED_TAKE } from "@repo/validators/shared";
import { GetFeaturedAccountsQuery } from "@repo/db/queries";

export const accountsRouter = {
  getAll: publicProcedure
    .input(SearchAccountsInput)
    .query(async ({ ctx, input }) => {
      switch (input.type) {
      }
    }),

  getDetails: publicProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

  getEvents: publicProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

  getFeatured: publicProcedure
    .input(GetFeaturedAccountsInput)
    .query(async ({ ctx, input }) => {
      switch (input.type) {
        case "MUSICIAN":
          return await ctx.db.musician.findMany({
            ...GetFeaturedAccountsQuery(input.location),
          });
        case "BAND":
          return await ctx.db.musicGroup.findMany({
            ...GetFeaturedAccountsQuery(input.location),
          });
        case "VENUE":
          return await ctx.db.venue.findMany({
            ...GetFeaturedAccountsQuery(input.location),
          });
        case "ORGANIZER":
          return await ctx.db.organizer.findMany({
            ...GetFeaturedAccountsQuery(input.location),
          });
      }
    }),

  getFavorites: protectedProcedure
    .input(SearchAccountsInput)
    .query(async ({ ctx, input }) => {}),

  addToFavorites: protectedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  removeFromFavorites: protectedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  create: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  update: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  deactivate: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  transfer: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  message: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  inviteAssociate: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  addAssociate: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  removeAssociate: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  addAffiliation: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  removeAffiliation: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  requestAffiliation: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  sendInquiry: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  claim: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  getUnclaimed: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  getManaged: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),
} satisfies TRPCRouterRecord;
