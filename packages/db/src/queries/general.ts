import { Prisma } from "../schema";

export const MultiKeywordQuery = (ids?: string[]) =>
  !ids || ids.length === 0
    ? undefined
    : ({
        some: {
          id: {
            in: ids,
          },
        },
      } satisfies
        | Prisma.GenreListRelationFilter
        | Prisma.EventKeywordListRelationFilter
        | Prisma.VenueKeywordListRelationFilter);
