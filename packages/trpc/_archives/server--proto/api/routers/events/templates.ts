import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const templatesRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) => ctx.db.eventTemplate.findMany()),
});
