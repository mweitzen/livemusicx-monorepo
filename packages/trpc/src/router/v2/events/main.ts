import { createTRPCRouter, protectedProcedure } from "../../../trpc";

export const mainRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) => ctx.db.event.findMany()),
});
