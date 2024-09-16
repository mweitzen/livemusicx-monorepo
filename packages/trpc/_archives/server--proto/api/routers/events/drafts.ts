import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const draftsRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) => ctx.db.eventDraft.findMany()),
});
