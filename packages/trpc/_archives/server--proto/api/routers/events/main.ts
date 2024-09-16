import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const mainRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) => ctx.db.event.findMany()),
});
