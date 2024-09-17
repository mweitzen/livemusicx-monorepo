import { createTRPCRouter, protectedProcedure } from "../../../trpc";

export const draftsRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) => ctx.db.eventDraft.findMany()),
});
