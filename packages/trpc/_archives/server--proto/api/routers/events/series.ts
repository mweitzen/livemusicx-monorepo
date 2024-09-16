import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const seriesRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) => ctx.db.event.findMany()),
});
