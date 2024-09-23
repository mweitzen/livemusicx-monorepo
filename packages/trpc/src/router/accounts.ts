import type { TRPCRouterRecord } from "@trpc/server";

import {
  authorizedProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

import { SearchAccountsInput } from "@repo/validators/accounts";

import { __PLACEHOLDER__ } from "@repo/validators/general";

export const accountsRouter = {
  getAll: publicProcedure
    .input(SearchAccountsInput)
    .query(async ({ ctx, input }) => {}),

  getDetails: publicProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

  getEvents: publicProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

  getFeatured: publicProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

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
