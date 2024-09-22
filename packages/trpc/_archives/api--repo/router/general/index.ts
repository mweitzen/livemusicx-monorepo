import { RouterOutputs } from "~/lib/trpc/shared";
import { createTRPCRouter, publicProcedure } from "~/server/trpc";

import { GetGenresInputSchema, GetGenresOutputSchema } from "@livemusicx/schema";

export type AllGenres = RouterOutputs["general"]["getGenres"];

export const generalRouter = createTRPCRouter({
  getGenres: publicProcedure
    .meta({ openapi: { method: "GET", path: "/general/genres", tags: ["general"] } })
    .input(GetGenresInputSchema)
    .output(GetGenresOutputSchema)
    .query(({ ctx }) => ctx.prisma.genre.findMany()),
});
