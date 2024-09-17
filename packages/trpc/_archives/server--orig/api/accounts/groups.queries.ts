import { z } from "zod";
// import { createSlug } from "@repo/utils/create-slug";
import type { User } from "next-auth";
import type { Prisma } from "@prisma/client";

import {
  GetAllGroupsInputSchema,
  CreateGroupInputSchema,
} from "@/lib/schema/accounts/groups";
import { GetAllPerformersWhere } from "./performers.queries";

export const GetAllGroupsQuery = (
  input: z.infer<typeof GetAllGroupsInputSchema>,
  user?: User | null
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
      favoritedBy: true,
      _count: {
        select: {
          members: true,
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
  } satisfies Prisma.MusicGroupFindManyArgs;
};

// export const CreateGroupQuery = (input: z.infer<typeof CreateGroupInputSchema>, user: User | null) => ({
//   data: {
//     ...input
//   }
// } satisfies Prisma.MusicGroupCreateArgs);
