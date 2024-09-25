import { Prisma } from "../schema";
import { GetFeatureDatesQuery } from "./events";

export const GetFeaturedAccountsQuery = (location?: string) =>
  ({
    take: 10,
    where: {
      events: {
        some: {
          ...GetFeatureDatesQuery,
        },
      },
    },
    include: {
      events: {
        take: 1,
        where: {
          ...GetFeatureDatesQuery,
        },
        orderBy: { timeStart: "asc" },
      },
    },
  }) satisfies
    | Prisma.MusicianFindManyArgs
    | Prisma.MusicGroupFindManyArgs
    | Prisma.VenueFindManyArgs
    | Prisma.OrganizerFindManyArgs;
