import { Prisma, VenueType } from "../schema";
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
      profile: true,
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
    | Prisma.BandFindManyArgs
    | Prisma.VenueFindManyArgs
    | Prisma.OrganizerFindManyArgs;

export const FavoritedQuery = (userId?: string, include?: boolean) =>
  !include
    ? undefined
    : ({
        profile: {
          favoritedBy: {
            some: {
              id: userId,
            },
          },
        },
      } satisfies
        | Prisma.MusicianWhereInput
        | Prisma.BandWhereInput
        | Prisma.VenueWhereInput
        | Prisma.OrganizerWhereInput);

export const VenueTypesQuery = (types?: VenueType | VenueType[]) =>
  !types || types.length === 0
    ? undefined
    : ({
        type: {
          in: typeof types === "object" ? types : [types],
        },
      } satisfies Prisma.VenueWhereInput);
