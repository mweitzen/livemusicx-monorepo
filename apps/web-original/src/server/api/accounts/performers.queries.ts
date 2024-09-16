import { z } from "zod";
import { addDays } from "date-fns";

import type { User } from "next-auth";
import type { Prisma } from "@repo/db";

import { GetAllGroupsInputSchema } from "@/lib/schema/accounts/groups";

export const GetAllPerformersWhere = (
  input: z.infer<typeof GetAllGroupsInputSchema>,
  user?: User | null,
) => {
  return {
    favoritedBy:
      user && input.favorites !== undefined
        ? input.favorites
          ? {
              some: {
                id: user.id,
              },
            }
          : {
              none: {
                id: user.id,
              },
            }
        : undefined,
    OR:
      input.query !== undefined && input.query !== ""
        ? [
            {
              name: {
                contains: input.query,
                mode: "insensitive",
              },
            },
            {
              about: {
                contains: input.query,
                mode: "insensitive",
              },
            },
          ]
        : undefined,
    basedIn:
      input.regionId! === undefined ||
      (input.cities !== undefined && input.cities.length)
        ? {
            id:
              input.cities !== undefined && input.cities.length
                ? {
                    in: input.cities,
                  }
                : undefined,
            regionId:
              input.regionId !== undefined && input.regionId !== ""
                ? input.regionId
                : undefined,
          }
        : undefined,
    genres:
      input.genres !== undefined && input.genres.length
        ? {
            some: {
              id: {
                in: input.genres,
              },
            },
          }
        : undefined,
    events:
      input.dateStart !== undefined || input.dateEnd !== undefined
        ? {
            some: {
              AND: [
                {
                  timeStart: input.dateStart
                    ? { gte: new Date(input.dateStart) }
                    : undefined,
                },
                {
                  timeStart: input.dateEnd
                    ? { lte: addDays(new Date(input.dateEnd), 1) }
                    : undefined,
                },
              ],
            },
          }
        : undefined,
  } satisfies Prisma.MusicianWhereInput | Prisma.MusicGroupWhereInput;
};
