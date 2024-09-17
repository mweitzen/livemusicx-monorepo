import { z } from "zod";
import { createTRPCRouter, authorizedProcedure } from "../../../trpc";

export const authorizedRouter = createTRPCRouter({
  /**
   *
   *
   * @summary CHECK FOR EXISTING, UNCLAIMED ACCOUNTS
   *
   *
   */
  checkForExistingAccounts: authorizedProcedure
    .input(
      z.object({
        name: z.string(),
        accountType: z.enum(["musician", "group", "organizer"]),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.name || input.name === "") return null;

      const take = 5;

      const where = {
        name: {
          startsWith: input.name,
          mode: "insensitive" as any,
        },
        active: false,
        accountManagerId: null,
      };

      const select = {
        id: true,
        name: true,
        about: true,
        basedIn: true,
        genres: true,
      };

      switch (input.accountType) {
        case "musician":
          return await ctx.db.musician.findMany({
            take,
            where,
            select,
          });
        case "group":
          return await ctx.db.musicGroup.findMany({
            take,
            where,
            select,
          });
        case "organizer":
          return await ctx.db.organizer.findMany({ take, where, select });
        default:
          return null;
      }
    }),

  /**
   *
   *
   * @summary CLAIM AN EXISTING, UNCLAIMED ACCOUNT
   *
   *
   */
  claimAccount: authorizedProcedure
    .input(
      z.object({
        id: z.string(),
        accountType: z.enum(["musician", "group", "organizer"]),
        data: z.object({
          name: z.string().optional(),
          about: z.string().optional(),
          cityId: z.string(),
          genres: z.array(z.object({ id: z.string() })),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const query = {
        where: {
          id: input.id,
        },
        data: {
          name: input.data.name,
          about: input.data.about,
          basedInId: input.data.cityId,
          genres: {
            connect: input.data.genres,
          },
          active: true,
          accountManagerId: ctx.session.user.id,
        },
      };

      switch (input.accountType) {
        case "musician":
          return await ctx.db.musician.update(query);
        case "group":
          return await ctx.db.musicGroup.update(query);
        case "organizer":
          return await ctx.db.organizer.update(query);
        default:
          return null;
      }
    }),
  /**
   *
   *
   * @summary GET USERS ACCOUNTS
   *
   *
   */
  getUsersAccounts: authorizedProcedure
    .input(z.object({ query: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      // const userAccountType = ctx.session.user.accountType;
      const userAccountType = ["PERFORMER", "VENUE", "ORGANIZER"].at(
        Math.floor(Math.random() * 3)
      );
      const query = input ? input.query : undefined;
      const queryPartial = {
        name: { contains: query, mode: "insensitive" },
      };
      const selectPartial = {
        orderBy: { name: "asc" },
        where: !query ? queryPartial : undefined,
      };

      const currentUser = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          accountsMusicians:
            userAccountType === "PERFORMER"
              ? {
                  ...(selectPartial as any),
                  select: {
                    id: true,
                    name: true,
                    basedIn: true,
                    performerType: true,
                    groups: true,
                  },
                }
              : undefined,
          accountsGroups:
            userAccountType === "PERFORMER"
              ? (selectPartial as any)
              : undefined,
          accountsVenues:
            userAccountType === "VENUE" ? (selectPartial as any) : undefined,
          accountsOrganizers:
            userAccountType === "ORGANIZER"
              ? (selectPartial as any)
              : undefined,
        },
      });

      if (!currentUser) return null;

      switch (userAccountType) {
        case "PERFORMER":
          const musicians = currentUser.accountsMusicians;
          const groups = musicians.flatMap(
            (musician) => (musician as any).groups
          );
          return [...musicians, ...groups].sort(function (a, b) {
            return a.name - b.name;
          });

        case "VENUE":
          const venues = currentUser.accountsVenues;
        case "ORGANIZER":
          const organizers = currentUser.accountsOrganizers;
        default:
          return null;
      }
    }),
  getNextEvent: authorizedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        events: {
          where: {
            timeStart: {
              gt: new Date(),
            },
          },
          orderBy: {
            timeStart: "asc",
          },
          take: 1,
          include: {
            venue: true,
            stage: true,
            ticketLinks: true,
            organizer: true,
            musicians: true,
            groups: true,
          },
        },
      },
    });
    if (!user) return null;
    if (user.events.length === 0) return null;
    return user.events[0];
  }),
  getDashboardUpcomingEvents: authorizedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        events: {
          where: {
            timeStart: {
              gt: new Date(),
            },
          },
          orderBy: {
            timeStart: "asc",
          },
          skip: 1,
          take: 4,
          include: {
            venue: true,
            stage: true,
          },
        },
      },
    });
    if (!user) return null;
    return user.events;
  }),
});
