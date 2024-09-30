import { Prisma } from "../schema";

/**
 *
 *
 *
 * QUERIES
 *
 *
 *
 */
export const GetDetailsQuery = (input: { id?: string; slug?: string }) => ({
  id: input.id!,
  slug: input.slug!,
});

export const SearchQuery = (query?: string) => ({
  contains: query,
  mode: "insensitive" as const,
});

export const SearchEventsQuery = (query?: string) =>
  !query
    ? undefined
    : ({
        OR: [
          { name: SearchQuery(query) },
          { description: SearchQuery(query) },
          { genres: { some: SearchGenresQuery(query) } },
          { venue: SearchAccountsQuery(query) },
          { organizer: SearchAccountsQuery(query) },
          { musicians: { some: SearchAccountsQuery(query) } },
          { bands: { some: SearchAccountsQuery(query) } },
        ],
      } satisfies Prisma.EventWhereInput);

export const SearchGenresQuery = (query?: string) =>
  ({
    displayName: SearchQuery(query),
  }) satisfies Prisma.GenreWhereInput;

export const SearchAccountsQuery = (query?: string) =>
  ({
    profile: {
      OR: [
        { name: SearchQuery(query) },
        { about: SearchQuery(query) },
        { genres: { some: SearchGenresQuery(query) } },
      ],
    },
  }) satisfies
    | Prisma.MusicianWhereInput
    | Prisma.BandWhereInput
    | Prisma.VenueWhereInput
    | Prisma.OrganizerWhereInput;

/**
 *
 *
 *
 * CREATE / CONNECT
 *
 *
 *
 */
export const ManyToManyConnect = (ids: string[]) =>
  ({ connect: ids.map((id) => ({ id })) }) as const;
