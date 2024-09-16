import { z } from "zod";
import { authorizedProcedure, createTRPCRouter } from "@/server/trpc";

export const templatesRouter = createTRPCRouter({
  get: authorizedProcedure.input(z.string()).query(({ ctx, input }) =>
    ctx.prisma.eventTemplate.findUnique({
      where: { id: input },
    })
  ),
  list: authorizedProcedure
    .input(z.object({ q: z.string().optional() }).optional())
    .query(({ ctx, input }) =>
      ctx.prisma.eventTemplate.findMany({
        where: input
          ? {
              OR: [
                { templateName: { contains: input.q, mode: "insensitive" } },
                {
                  templateDescription: {
                    contains: input.q,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : undefined,
      })
    ),
  create: authorizedProcedure.input(z.object({})).mutation(async ({ ctx, input }) => {}),
  update: authorizedProcedure.input(z.object({})).mutation(async ({ ctx, input }) => {}),
  delete: authorizedProcedure.input(z.string()).mutation(async ({ ctx, input }) =>
    ctx.prisma.eventTemplate.delete({
      where: { id: input },
    })
  ),
});
