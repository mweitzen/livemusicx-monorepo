import type { Prisma } from "@repo/db/v1";

export const EventSelect = {
  id: true,
  slug: true,
  name: true,
  timeStart: true,
  image: true,
  genres: true,
  status: true,
  isFree: true,
  isHoliday: true,
  isChildFriendly: true,
  organizer: {
    select: {
      name: true,
    },
  },
  venue: {
    select: {
      name: true,
    },
  },
  musicians: {
    select: {
      name: true,
    },
  },
  groups: {
    select: {
      name: true,
    },
  },
} satisfies Prisma.EventSelect;
