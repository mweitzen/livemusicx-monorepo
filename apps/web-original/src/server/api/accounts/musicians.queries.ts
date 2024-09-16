import { z } from "zod";

import type { User } from "next-auth";
import type { Prisma } from "@repo/db";

import { GetAllMusiciansInputSchema } from "@/lib/schema/accounts/musicians";
import { GetAllPerformersWhere } from "./performers.queries";

export const GetAllMusiciansQuery = (
  input: z.infer<typeof GetAllMusiciansInputSchema>,
  user?: User | null,
) => {
  return {
    take: input.take,
    skip: (input.page - 1) * input.take,
    where: GetAllPerformersWhere(input, user),
    orderBy: {
      name: "asc",
    },
    include: {
      basedIn: true,
      genres: true,
      _count: {
        select: {
          events: {
            where: {
              timeStart: {
                gte: new Date(),
              },
            },
          },
        },
      },
    },
  } satisfies Prisma.MusicianFindManyArgs;
};
