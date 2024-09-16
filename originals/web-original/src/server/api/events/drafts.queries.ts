import { z } from "zod";
import type { Prisma } from "@prisma/client";

import { SaveEventDraftInputSchema } from "@/lib/schema/events/drafts";
import { GetDetailsInputSchema, SimpleSearchSchema } from "@/lib/schema";

export const SaveEventDraftQuery = (
  input: z.infer<typeof SaveEventDraftInputSchema>,
  userId: string
) => {
  const { musicians, groups, genres, keywords, ticketLinks, ...data } = input.data;

  return {
    where: {
      id: input.id ?? "",
    },
    update: {
      ...data,
      musicians: {
        connect: musicians,
      },
      groups: {
        connect: groups,
      },
      genres: {
        connect: genres,
      },
      keywords: {
        connect: keywords,
      },
      // updatedById: userId,
    },
    create: {
      ...data,
      createdById: userId,
      musicians: {
        connect: musicians,
      },
      groups: {
        connect: groups,
      },
      genres: {
        connect: genres,
      },
      keywords: {
        connect: keywords,
      },
    },
  } satisfies Prisma.EventDraftUpsertArgs;
};

export const GetEventDraftDetailsQuery = (
  input: z.infer<typeof GetDetailsInputSchema>,
  userId: string
) =>
  ({
    where: {
      id: userId,
    },
    select: {
      eventDrafts: {
        where: {
          id: input.id ?? undefined,
          slug: input.slug ?? undefined,
        },
        include: {
          venue: { select: { id: true, name: true } },
          stage: { select: { id: true, name: true } },
          organizer: { select: { id: true, name: true } },
          musicians: { select: { id: true, name: true } },
          groups: { select: { id: true, name: true } },
          genres: true,
          keywords: true,
          ticketLinks: true,
        },
      },
    },
  } satisfies Prisma.UserFindUniqueArgs);

export const GetAllEventDraftsQuery = (
  input: z.infer<typeof SimpleSearchSchema>,
  userId: string
) =>
  ({
    where: {
      id: userId,
    },
    select: {
      eventDrafts: {
        where: input
          ? {
              OR: [
                {
                  name: {
                    contains: input.query ?? undefined,
                  },
                },
                {
                  slug: {
                    contains: input.query ?? undefined,
                  },
                },
              ],
            }
          : undefined,
        include: {
          venue: { select: { id: true, name: true } },
          stage: { select: { id: true, name: true } },
          organizer: { select: { id: true, name: true } },
          musicians: { select: { id: true, name: true } },
          groups: { select: { id: true, name: true } },
          genres: true,
          keywords: true,
          ticketLinks: true,
        },
      },
    },
  } satisfies Prisma.UserFindUniqueArgs);
