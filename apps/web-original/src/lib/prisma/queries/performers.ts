import { z } from "zod";
import type { Prisma } from "@repo/db";

import { GetAllPerformersInputSchema } from "@/lib/schema/accounts/performers";

export const GetAllPerformersQuery = (
  input: z.infer<typeof GetAllPerformersInputSchema>,
) => ({}) satisfies Prisma.MusicianFindManyArgs | Prisma.MusicGroupFindManyArgs;
