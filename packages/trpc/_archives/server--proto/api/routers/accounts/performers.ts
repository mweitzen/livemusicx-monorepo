import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const performersRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.musician.findMany();
  }),
});
