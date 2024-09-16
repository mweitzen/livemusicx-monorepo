import { addDays } from "date-fns";
import type { Prisma } from "@livemusicx/db";

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
