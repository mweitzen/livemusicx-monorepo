import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../../trpc";

const accountType = z.object({
  accountType: z.enum([
    "venues",
    "performers",
    "musicians",
    "groups",
    "organizers",
  ]),
});

export const publicRouter = createTRPCRouter({
  /*
   *
   * GET BOOKMARKED EVENTS */
  getBookmarkedEvents: protectedProcedure
    .input(z.object({ query: z.string().optional() }).optional())
    .query(async ({ ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          eventsBookmarked: { select: { id: true } },
        },
      });
      if (!user || !user.eventsBookmarked) {
        return [];
      } else {
        return user.eventsBookmarked;
      }
    }),

  /*
   *
   * ADD EVENT TO BOOKMARKS */
  addEventToBookmarks: protectedProcedure
    .input(z.string())
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          eventsBookmarked: {
            connect: {
              id: input,
            },
          },
        },
      });
    }),

  /*
   *
   * REMOVE EVENT FROM BOOKMARKS */
  removeEventFromBookmarks: protectedProcedure
    .input(z.string())
    .mutation(({ input, ctx }) =>
      ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          eventsBookmarked: {
            disconnect: {
              id: input,
            },
          },
        },
      })
    ),

  /*
   *
   * GET FAVORITE ACCOUNTS */
  getFavoriteAccounts: protectedProcedure
    .input(accountType)
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        select: {
          favoriteVenues:
            input.accountType === "venues"
              ? {
                  select: {
                    id: true,
                  },
                }
              : undefined,

          favoriteMusicians:
            input.accountType === "musicians" ||
            input.accountType === "performers"
              ? {
                  select: {
                    id: true,
                  },
                }
              : undefined,
          favoriteGroups:
            input.accountType === "groups" || input.accountType === "performers"
              ? {
                  select: {
                    id: true,
                  },
                }
              : undefined,
          favoriteOrganizers:
            input.accountType === "organizers"
              ? {
                  select: {
                    id: true,
                  },
                }
              : undefined,
        },
      });

      if (!user) return [];

      switch (input.accountType) {
        case "venues":
          return user.favoriteVenues as { id: string }[];
        case "performers":
          return [...user.favoriteMusicians, ...user.favoriteGroups] as {
            id: string;
          }[];
        case "musicians":
          return user.favoriteMusicians as { id: string }[];
        case "groups":
          return user.favoriteGroups as { id: string }[];
        case "organizers":
          return user.favoriteOrganizers as { id: string }[];
        default:
          return [];
      }
    }),

  /*
   *
   * ADD ACCOUNT FROM FAVORITES */
  addAccountToFavorites: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        type: z.enum(["venue", "musician", "group", "organizer"]),
      })
    )
    .mutation(async ({ ctx, input: { id, type } }) => {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          favoriteVenues: {
            connect:
              type === "venue"
                ? {
                    id,
                  }
                : undefined,
          },
          favoriteMusicians: {
            connect:
              type === "musician"
                ? {
                    id,
                  }
                : undefined,
          },
          favoriteGroups: {
            connect:
              type === "group"
                ? {
                    id,
                  }
                : undefined,
          },
          favoriteOrganizers: {
            connect:
              type === "organizer"
                ? {
                    id,
                  }
                : undefined,
          },
        },
      });
    }),

  /*
   *
   * REMOVE ACCOUNT FROM FAVORITES */
  removeAccountFromFavorites: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        type: z.enum(["venue", "musician", "group", "organizer"]),
      })
    )
    .mutation(({ ctx, input: { id, type } }) =>
      ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          favoriteVenues: {
            disconnect:
              type === "venue"
                ? {
                    id,
                  }
                : undefined,
          },
          favoriteMusicians: {
            disconnect:
              type === "musician"
                ? {
                    id,
                  }
                : undefined,
          },
          favoriteGroups: {
            disconnect:
              type === "group"
                ? {
                    id,
                  }
                : undefined,
          },
          favoriteOrganizers: {
            disconnect:
              type === "organizer"
                ? {
                    id,
                  }
                : undefined,
          },
        },
      })
    ),
});
