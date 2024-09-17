import { RouterOutputs } from "../../../index";
import { createTRPCRouter, publicProcedure } from "../../../trpc";

import {
  GetGenresInputSchema,
  GetGenresOutputSchema,
} from "../../../lib-tmp/schema";

export type AllGenres = RouterOutputs["v1"]["general"]["getGenres"];

export const generalRouter = createTRPCRouter({
  getGenres: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/general/genres", tags: ["general"] },
    })
    .input(GetGenresInputSchema)
    .output(GetGenresOutputSchema)
    .query(({ ctx }) => ctx.db.genre.findMany()),
});
