import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure } from "../trpc";
import { __PLACEHOLDER__ } from "@repo/validators/general";
import { SetHomeLocationInput } from "@repo/validators/user";

export const userRouter = {
  current: protectedProcedure.query(
    async ({ ctx }) =>
      await ctx.db.user.findUnique({ where: { id: ctx.session.user.id } })
  ),

  get: protectedProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

  setHomeLocation: protectedProcedure.input(SetHomeLocationInput).mutation(
    async ({ ctx, input }) =>
      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {},
      })
  ),

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
