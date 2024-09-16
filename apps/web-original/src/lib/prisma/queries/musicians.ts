import { z } from "zod";
import type { Prisma } from "@prisma/client";

import { GetAllMusiciansInputSchema } from "@/lib/schema/accounts/musicians";

export const GetAllMusiciansQuery = (input: z.infer<typeof GetAllMusiciansInputSchema>) =>
  ({} satisfies Prisma.MusicianFindManyArgs);
