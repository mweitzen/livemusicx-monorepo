import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "../trpc";

import { __PLACEHOLDER__ } from "@repo/validators/general";

export const locationsRouter = {
  getAll: publicProcedure.query(
    async ({ ctx }) => await ctx.db.location.findMany()
  ),
  getCities: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.db.location.findMany({ where: { type: "CITY" } })
  ),
} satisfies TRPCRouterRecord;
