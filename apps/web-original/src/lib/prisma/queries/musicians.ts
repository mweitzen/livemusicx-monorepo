import { z } from "zod";
import type { Prisma } from "@repo/db/schema";

import { GetAllMusiciansInputSchema } from "~/lib/schema/accounts/musicians";

export const GetAllMusiciansQuery = (
  input: z.infer<typeof GetAllMusiciansInputSchema>,
) => ({}) satisfies Prisma.MusicianFindManyArgs;
