import { Prisma, EventStatus } from "../schema";
import { FavoritedQuery } from "./accounts";

const now = new Date();
const anHourAgo = new Date(now.getTime() - 1000 * 3600);
const oneWeekFromNow = new Date(now.getTime() + 1000 * 3600 * 24 * 7);

// Time start is less than now
// Time end is not null and greater than now OR Time start greater than 1 hour ago
export const GetCurrentQuery = {
  timeStart: {
    lte: now,
  },
  OR: [
    {
      timeEnd: {
        not: null,
        gte: now,
      },
    },
    {
      timeStart: {
        gte: anHourAgo,
      },
    },
  ],
} satisfies Prisma.EventWhereInput;

// Time start is greater than now OR Time end is not null and greater than now
export const GetFutureDatesQuery = {
  OR: [
    {
      timeStart: {
        gte: now,
      },
    },
    {
      timeEnd: {
        not: null,
        gte: now,
      },
    },
  ],
} satisfies Prisma.EventWhereInput;

// Time start is greater than now OR Time end is not null and greater than now
export const GetFeatureDatesQuery = {
  AND: [
    {
      timeStart: {
        gte: now,
      },
    },
    {
      timeStart: {
        lte: oneWeekFromNow,
      },
    },
  ],
} satisfies Prisma.EventWhereInput;

// Time start is less than now AND time end is null
export const GetPreviousDatesQuery = {
  OR: [
    {
      AND: [
        {
          timeStart: {
            lte: now,
          },
        },
        {
          timeEnd: {
            equals: null,
          },
        },
      ],
    },
    {
      timeEnd: {
        not: null,
        lte: now,
      },
    },
  ],
} satisfies Prisma.EventWhereInput;

export const GetDateRangeQuery = ({
  dateBegin,
  dateEnd,
}: {
  dateBegin?: Date;
  dateEnd?: Date;
}) =>
  ({
    AND: [
      {
        timeStart: {
          gte: dateBegin ?? now,
        },
      },
      {
        timeStart: {
          lte: dateEnd,
        },
      },
    ],
  }) satisfies Prisma.EventWhereInput;

export const GetPublishedQuery = {
  status: {
    in: [EventStatus.SCHEDULED, EventStatus.RESCHEDULED],
  },
} satisfies Prisma.EventWhereInput;

export const GetDraftsQuery = {
  status: EventStatus.UNSCHEDULED,
} satisfies Prisma.EventWhereInput;

export const FilterEventsQuery = () => ({}) satisfies Prisma.EventWhereInput;

export const BookmarkedQuery = (userId?: string, include?: boolean) =>
  !include
    ? undefined
    : ({
        bookmarkedBy: {
          some: {
            id: userId,
          },
        },
      } satisfies Prisma.EventWhereInput);

export const BookmarkedIncludeQuery = (userId?: string) => ({
  bookmarkedBy: {
    where: {
      id: userId,
    },
  },
});

export const FavoritedAccountsQuery = (userId?: string, include?: boolean) =>
  !include
    ? undefined
    : ({
        AND: [
          {
            OR: [
              { venue: { ...FavoritedQuery(userId, include) } },
              { organizer: { ...FavoritedQuery(userId, include) } },
              { musicians: { some: { ...FavoritedQuery(userId, include) } } },
              { bands: { some: { ...FavoritedQuery(userId, include) } } },
            ],
          },
        ],
      } satisfies Prisma.EventWhereInput);

export const EventIncludePublicQuery = (userId?: string) =>
  ({
    _count: true,
    genres: true,
    keywords: true,
    location: true,
    ticketLinks: true,
    bands: { include: { profile: true } },
    musicians: { include: { profile: true } },
    organizer: { include: { profile: true } },
    venue: { include: { profile: true } },
    stage: true,
    bookmarkedBy: {
      where: {
        id: userId,
      },
    },
  }) satisfies Prisma.EventInclude;

export const OrderByDateAscending = {
  timeStart: "asc",
} satisfies Prisma.EventOrderByWithRelationInput;

export const OrderByDateDescending = {
  timeStart: "desc",
} satisfies Prisma.EventOrderByWithRelationInput;
