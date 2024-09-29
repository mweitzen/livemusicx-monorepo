import type { TRPCRouterRecord } from "@trpc/server";

import { authorizedProcedure, publicProcedure } from "../trpc";

import { CreateKeywordInput, __PLACEHOLDER__ } from "@repo/validators/general";
import { createSlug } from "@repo/utils";

export const generalRouter = {
  getGenres: publicProcedure.query(
    async ({ ctx }) => await ctx.db.genre.findMany()
  ),

  getVenueKeywords: publicProcedure.query(
    async ({ ctx }) => await ctx.db.venueKeyword.findMany()
  ),

  getEventKeywords: publicProcedure.query(
    async ({ ctx }) => await ctx.db.eventKeyword.findMany()
  ),

  createNewVenueKeyword: authorizedProcedure
    .input(CreateKeywordInput)
    .mutation(async ({ ctx, input }) => {
      // Get user adding the keyword
      const user = ctx.session.user.id;

      // Check for innapropriate content

      // Report innapropriate content

      // Format Keyword
      const slug = createSlug(input.name);

      // Create Keyword
      const result = await ctx.db.venueKeyword.create({
        data: {
          id: createSlug(input.name),
          displayName: input.name,
        },
      });
    }),

  createNewEventKeyword: authorizedProcedure
    .input(CreateKeywordInput)
    .mutation(async ({ ctx, input }) => {
      // Get user adding the keyword
      const user = ctx.session.user.id;

      // Check for innapropriate content

      // Report innapropriate content

      // Create Keyword
      const result = await ctx.db.eventKeyword.create({
        data: {
          id: createSlug(input.name),
          displayName: input.name,
        },
      });
    }),
} satisfies TRPCRouterRecord;
