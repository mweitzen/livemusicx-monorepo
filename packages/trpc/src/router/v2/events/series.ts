import { createTRPCRouter, protectedProcedure } from "../../../trpc";

export const seriesRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) => ctx.db.event.findMany()),
});
