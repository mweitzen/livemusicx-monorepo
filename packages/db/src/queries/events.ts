import { Prisma, EventStatus } from "../schema";

const now = new Date();
const anHourAgo = new Date(now.getTime() - 3600 * 1000);

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
  // TODO: Make UNSCHEDULED
  status: EventStatus.SCHEDULED,
} satisfies Prisma.EventWhereInput;

export const EventIncludePublicQuery = {
  _count: true,
  city: true,
  genres: true,
  groups: true,
  keywords: true,
  musicians: true,
  neighborhood: true,
  organizer: true,
  region: true,
  state: true,
  stage: true,
  ticketLinks: true,
  venue: true,
} satisfies Prisma.EventInclude;

export const OrderByDateAscending = {
  timeStart: "asc",
} satisfies Prisma.EventOrderByWithRelationInput;

export const OrderByDateDescending = {
  timeStart: "desc",
} satisfies Prisma.EventOrderByWithRelationInput;
