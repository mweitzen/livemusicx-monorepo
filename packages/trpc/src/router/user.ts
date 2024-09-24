import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure } from "../trpc";
import { __PLACEHOLDER__ } from "@repo/validators/general";

export const userRouter = {
  current: protectedProcedure.query(
    async ({ ctx }) =>
      await ctx.db.user.findFirst({ where: { id: ctx.session.user.id } })
  ),

  get: protectedProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

  setHomeLocation: protectedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  update: protectedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  verify: protectedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  upgrade: protectedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  downgrade: protectedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  delete: protectedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),
} satisfies TRPCRouterRecord;
