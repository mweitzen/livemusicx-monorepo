import { createTRPCRouter, protectedProcedure } from "../../../trpc";

export const templatesRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) => ctx.db.eventTemplate.findMany()),
});
