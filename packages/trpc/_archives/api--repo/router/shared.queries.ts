import { z } from "zod";
import { addDays } from "date-fns";
import type { User } from "next-auth";
import type { Prisma } from "@livemusicx/db";

import { GetUpcomingEventsInputSchema } from "@livemusicx/schema/events";

export const QuickViewTake = 10;
export const QuickViewEventsWhere = {
  AND: [
    {
      timeStart: {
        gte: new Date(),
      },
    },
    {
      timeStart: {
        lte: addDays(new Date(), 7),
      },
    },
  ],
} satisfies Prisma.EventWhereInput;

export const QuickViewAccountsWhere = {
  events: {
    some: QuickViewEventsWhere,
  },
} satisfies
  | Prisma.VenueWhereInput
  | Prisma.OrganizerWhereInput
  | Prisma.MusicGroupWhereInput
  | Prisma.MusicianWhereInput;

export const QuickViewAccountsSelect = {
  id: true,
  slug: true,
  name: true,
  avatar: true,
  genres: true,
  events: {
    select: {
      name: true,
      venue: {
        select: { name: true },
      },
      timeStart: true,
    },
    where: {
      timeStart: {
        gte: new Date(),
      },
    },
    orderBy: {
      timeStart: "asc",
    },
    take: 1,
  },
} satisfies
  | Prisma.VenueSelect
  | Prisma.OrganizerSelect
  | Prisma.MusicGroupSelect
  | Prisma.MusicianSelect;

export const GenresWhere = (genres?: string[]) => {
  if (!genres || genres.length === 0) return undefined;
  return {
    some: {
      id: {
        in: genres,
      },
    },
  };
};

export const VenuesWhere = (
  input: z.infer<typeof GetUpcomingEventsInputSchema>,
  user?: User | null
): Prisma.VenueWhereInput => ({
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
  type:
    input.venueTypes !== undefined && input.venueTypes.length
      ? {
          in: input.venueTypes,
        }
      : undefined,
  city:
    (input.cities !== undefined && input.cities.length) ||
    (input.regionId !== undefined && input.regionId !== "")
      ? {
          id:
            input.cities !== undefined && input.cities.length
              ? {
                  in: input.cities,
                }
              : undefined,
          region:
            input.regionId !== undefined && input.regionId !== ""
              ? {
                  id: input.regionId,
                }
              : undefined,
        }
      : undefined,
  neighborhood:
    input.neighborhoods !== undefined && input.neighborhoods.length
      ? {
          id: {
            in: input.neighborhoods,
          },
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
                timeStart: input.dateStart ? { gte: new Date(input.dateStart) } : undefined,
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
  servesAlcohol: input.servesAlcohol !== undefined ? input.servesAlcohol || null : undefined,
  servesFood: input.servesFood !== undefined ? input.servesFood || null : undefined,
  minimumAge:
    input.minimumAge !== undefined && input.minimumAge > 0
      ? {
          gte: input.minimumAge,
        }
      : undefined,
});
