import { z } from "zod";

import { createTRPCRouter, authorizedProcedure } from "../../../trpc";

export const authorizedRouter = createTRPCRouter({
  getManagedAccounts: authorizedProcedure.query(async ({ ctx }) => {
    const accountType = ctx.session.user.accountType;

    const select = {
      select: {
        id: true,
        slug: true,
        name: true,
        avatar: true,
      },
    } as const;

    const userAccount = await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
      select: {
        accountsMusicians: select,
        accountsGroups: select,
        accountsVenues: select,
        accountsOrganizers: select,
      },
    });

    if (!userAccount) return [];

    switch (accountType) {
      case "PERFORMER":
        return [
          ...userAccount.accountsMusicians.map((account) => ({
            ...account,
            type: "musician",
          })),
          ...userAccount.accountsGroups.map((account) => ({
            ...account,
            type: "group",
          })),
        ].sort((a, b) => a.name.localeCompare(b.name));
      case "VENUE":
        return userAccount.accountsVenues.map((account) => ({
          ...account,
          type: "venue",
        }));
      case "ORGANIZER":
        return userAccount.accountsOrganizers.map((account) => ({
          ...account,
          type: "organizer",
        }));
      default:
        return [];
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
