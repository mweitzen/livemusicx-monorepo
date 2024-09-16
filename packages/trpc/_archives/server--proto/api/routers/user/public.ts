import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const publicRouter = createTRPCRouter({
  getAccount: protectedProcedure.query(({ ctx }) =>
    ctx.db.user.findFirst({ where: { id: ctx.session.user.id } })
  ),

  updateAccount: protectedProcedure.mutation(({ ctx }) =>
    ctx.db.user.update({ where: { id: ctx.session.user.id }, data: {} })
  ),

  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    // delete user from db
    return await ctx.db.user.delete({ where: { id: ctx.session.user.id } });

    // email user that account is deleted
  }),

  getBookmarkedEvents: protectedProcedure
    .input(z.object({ query: z.string().optional() }).optional())
    .query(async ({ ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          eventsBookmarked: { select: { id: true } },
        },
      });

      if (!user || !user.eventsBookmarked) return [];

      return user.eventsBookmarked;
    }),

  getFavoritedAccounts: protectedProcedure.query(async ({ ctx }) => {
    const selectedData = {
      id: true,
      name: true,
      slug: true,
      about: true,
      avatar: true,
    } as const;

    const user = await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
      select: {
        favoriteGroups: { select: selectedData },
        favoriteMusicians: { select: selectedData },
        favoriteOrganizers: { select: selectedData },
        favoriteVenues: { select: selectedData },
      },
    });

    if (!user) return [];

    return [
      ...user.favoriteGroups,
      ...user.favoriteMusicians,
      ...user.favoriteOrganizers,
      ...user.favoriteVenues,
    ];
  }),
});
