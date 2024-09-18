import type { RouterOutputs, RouterInputs } from "@/lib/trpc/shared";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  authorizedProcedure,
} from "@/server/trpc";

import {
  GetEventDetailsQuery,
  GetEventsQuickViewQuery,
  GetUpcomingEventsQuery,
} from "./main.queries";

import {
  EventCountOutputSchema,
  GetEventDetailsInputSchema,
  GetUpcomingEventsInputSchema,
} from "@/lib/schema/events";

import { NoInputSchema, SimpleSearchSchema, IDInputSchema } from "@/lib/schema/shared";

import { PublishEventInputSchema } from "@/lib/schema/events/main";

/*
 *
 *
 *
 * TYPES */
type EventsOutputs = RouterOutputs["events"]["main"];

type UpcomingEvents = EventsOutputs["getUpcoming"];
type QuickViewEvents = EventsOutputs["getQuickView"];
type FavoriteEvents = EventsOutputs["getBookmarked"];
type EventDetails = EventsOutputs["getDetails"];

type EventsInputs = RouterInputs["events"]["main"];

type GetUpcomingEventsInput = EventsInputs["getUpcoming"];
type GetUsersFavoriteEventsInput = EventsInputs["getBookmarked"];

/*
 *
 *
 *
 * ROUTER */
const mainRouter = createTRPCRouter({
  /*
   *
   * PUBLIC */
  getCount: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/events/count", tags: ["events"] } })
    .input(GetUpcomingEventsInputSchema)
    .output(EventCountOutputSchema)
    .query(({ ctx, input }) =>
      // TODO
      // ctx.prisma.event.count(GetUpcomingEventsQuery(input, ctx.session?.user))
      ctx.prisma.event.count({
        where: {
          timeStart: { gte: input.dateStart ? new Date(input.dateStart) : new Date() },
          NOT: {
            status: {
              in: ["CANCELLED", "POSTPONED"],
            },
          },
        },
      })
    ),

  getUpcoming: publicProcedure
    .input(GetUpcomingEventsInputSchema)
    .query(async ({ ctx, input }) =>
      ctx.prisma.event.findMany(GetUpcomingEventsQuery(input, ctx.session?.user))
    ),

  getDetails: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/events/{id}", tags: ["events"] } })
    .input(GetEventDetailsInputSchema)
    .query(({ ctx, input }) => ctx.prisma.event.findUnique(GetEventDetailsQuery(input))),

  getQuickView: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/events/quick-view", tags: ["events"] } })
    .input(NoInputSchema)
    .query(({ ctx }) => ctx.prisma.event.findMany(GetEventsQuickViewQuery)),

  /*
   *
   * PROTECTED */
  getBookmarked: protectedProcedure.input(SimpleSearchSchema).query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
        name: input ? { contains: input.query ?? "", mode: "insensitive" } : undefined,
      },
      select: { eventsBookmarked: true },
    });
    if (!user) return [];
    return user.eventsBookmarked;
  }),

  addToBookmarked: protectedProcedure.input(IDInputSchema).query(({ ctx, input }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.event.update({
      where: {
        id: input.id,
      },
      data: {
        bookmarkedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }),
  removeFromBookmarked: protectedProcedure.input(IDInputSchema).query(({ ctx, input }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.event.update({
      where: {
        id: input.id,
      },
      data: {
        bookmarkedBy: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }),

  /*
   *
   * AUTHORIZED */
  publish: authorizedProcedure.input(PublishEventInputSchema).mutation(() => {}),
  update: authorizedProcedure.mutation(() => {}),
  reschedule: authorizedProcedure.mutation(() => {}),
  postpone: authorizedProcedure.mutation(() => {}),
  cancel: authorizedProcedure.mutation(() => {}),
  archive: authorizedProcedure.mutation(() => {}),
  addParticipation: authorizedProcedure.mutation(() => {}),
});

export { mainRouter };
export type {
  UpcomingEvents,
  QuickViewEvents,
  FavoriteEvents,
  EventDetails,
  GetUpcomingEventsInput,
  GetUsersFavoriteEventsInput,
};
