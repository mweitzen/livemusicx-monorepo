import type { TRPCRouterRecord } from "@trpc/server";

import { authorizedProcedure, publicProcedure } from "../trpc";

import { __PLACEHOLDER__ } from "@repo/validators/general";

export const generalRouter = {
  getGenres: publicProcedure.query(async () => {}),

  getVenueKeywords: publicProcedure.query(async () => {}),

  getEventKeywords: publicProcedure.query(async () => {}),

  addVenueKeyword: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  addEventKeyword: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),
} satisfies TRPCRouterRecord;
