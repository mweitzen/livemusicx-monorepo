import { z } from "zod";
import { addDays } from "date-fns";
import type { Prisma } from "@repo/db/schema";
import type { User } from "next-auth";

import {
  GetUpcomingEventsInputSchema,
  GetEventDetailsInputSchema,
} from "~/lib/schema/events/main";

import {
  GenresWhere,
  QuickViewEventsWhere,
  VenuesWhere,
} from "../shared.queries";
import { EventSelect } from "./shared.queries";

export const GetUpcomingEventsQuery = (
  input: z.infer<typeof GetUpcomingEventsInputSchema>,
  user?: User | null,
) => {
  const where: Prisma.EventWhereInput = {
    timeStart: {
      gte: input.dateStart ? new Date(input.dateStart) : new Date(),
    },
    NOT: {
      status: {
        in: ["CANCELLED", "POSTPONED"],
      },
    },
  };

  if (input.dateEnd !== undefined) {
    where.timeEnd = {
      lte: addDays(new Date(input.dateEnd), 1),
    };
  }

  if (!!user) {
    if (input.bookmarked !== undefined) {
      if (input.bookmarked) {
        where.bookmarkedBy = {
          some: {
            id: user.id,
          },
        };
      } else {
        where.bookmarkedBy = {
          none: {
            id: user.id,
          },
        };
      }
    }
    if (input.favorites !== undefined) {
      let favoritedBy;
      if (input.favorites) {
        favoritedBy = {
          some: {
            id: user.id,
          },
        };
      } else {
        favoritedBy = {
          none: {
            id: user.id,
          },
        };
      }
      where.OR = [
        { venue: { favoritedBy } },
        { organizer: { favoritedBy } },
        { musicians: { some: { favoritedBy } } },
        { groups: { some: { favoritedBy } } },
      ];
    }
  }

  if (input.query !== undefined && input.query !== "") {
    where.OR = [
      {
        name: {
          contains: input.query,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: input.query,
          mode: "insensitive",
        },
      },
      {
        keywords: {
          some: {
            displayName: {
              contains: input.query,
              mode: "insensitive",
            },
          },
        },
      },
    ];
  }

  where.venue = VenuesWhere(input, user);

  where.genres = GenresWhere(input.genres);
  where.isFree = input.isFree;
  where.isChildFriendly = input.isChildFriendly;
  where.isHoliday = input.isHoliday;
  where.servesAlcohol = input.servesAlcohol;
  where.servesFood = input.servesFood;

  return {
    take: input.take,
    skip: (input.page - 1) * 20,
    orderBy: {
      timeStart: "asc",
    },
    where,
    select: { ...EventSelect, description: true },
  } satisfies Prisma.EventFindManyArgs;
};

export const GetEventDetailsQuery = (
  input: z.infer<typeof GetEventDetailsInputSchema>,
) =>
  ({
    where: {
      id: input.id || undefined,
      slug: input.slug || undefined,
    },
    include: {
      venue: true,
      genres: true,
      keywords: true,
      ticketLinks: true,
      musicians: true,
      groups: true,
      stage: true,
      organizer: true,
      _count: {
        select: {
          bookmarkedBy: true,
        },
      },
    },
  }) satisfies Prisma.EventFindUniqueArgs;

export const GetEventsQuickViewQuery = {
  take: 10,
  orderBy: {
    timeStart: "asc",
  },
  where: {
    ...QuickViewEventsWhere,
    isPrivate: false,
    status: {
      notIn: ["POSTPONED", "CANCELLED"],
    },
  },
  select: EventSelect,
} satisfies Prisma.EventFindManyArgs;

export const PublishEventInput = z.object({});
