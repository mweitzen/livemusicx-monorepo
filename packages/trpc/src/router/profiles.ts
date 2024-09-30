import { TRPCRouterRecord } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  musicians: {
    getAll: publicProcedure
      .input(() => {})
      .query(
        async ({ ctx, input }) =>
          await ctx.db.musician.findUnique({
            where: { id: "" },
            include: { profile: true },
          })
      ),
    test: publicProcedure.query(async ({ ctx }) => {
      const musician = await ctx.db.musician.findUnique({
        where: { id: "" },
        include: {
          profile: true,
        },
      });
      if (!musician) return musician;
      return {
        ...musician,
        ...musician.profile,
      };
    }),
  } satisfies TRPCRouterRecord,

  bands: {
    getAll: publicProcedure
      .input(() => {})
      .query(async ({ ctx, input }) => {
        const bands = await ctx.db.band.findMany({
          include: { profile: true, members: { include: { profile: true } } },
        });

        return bands.map(({ profile, ...band }) => ({
          ...band,
          ...profile,
        }));
      }),
  } satisfies TRPCRouterRecord,

  venues: {
    getAll: publicProcedure.input(() => {}).query(async ({ ctx, input }) => {}),
  } satisfies TRPCRouterRecord,

  organizers: {
    getAll: publicProcedure.input(() => {}).query(async ({ ctx, input }) => {}),
  } satisfies TRPCRouterRecord,
});
