import { Prisma } from "../schema";

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
          { groups: { some: SearchAccountsQuery(query) } },
        ],
      } satisfies Prisma.EventWhereInput);

export const SearchGenresQuery = (query?: string) =>
  ({
    displayName: SearchQuery(query),
  }) satisfies Prisma.GenreWhereInput;

export const SearchAccountsQuery = (query?: string) =>
  ({
    OR: [
      { name: SearchQuery(query) },
      { about: SearchQuery(query) },
      { genres: { some: SearchGenresQuery(query) } },
    ],
  }) satisfies
    | Prisma.VenueWhereInput
    | Prisma.MusicianWhereInput
    | Prisma.MusicGroupWhereInput
    | Prisma.OrganizerWhereInput;
