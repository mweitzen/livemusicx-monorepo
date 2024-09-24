import type { TRPCRouterRecord } from "@trpc/server";

import {
  protectedProcedure,
  publicProcedure,
  authorizedProcedure,
} from "../trpc";

import {
  SearchEventsInput,
  CreateEventInput,
  UpdateEventInput,
  UpdateEventDateInput,
  UpdateEventParticipantInput,
} from "@repo/validators/events";
import { GetDetailsInput } from "@repo/validators/shared";

import { __PLACEHOLDER__ } from "@repo/validators/general";

import {
  EventIncludePublicQuery,
  GetCurrentQuery,
  GetDetailsQuery,
  GetDraftsQuery,
  GetFutureDatesQuery,
  GetPreviousDatesQuery,
  GetPublishedQuery,
  OrderByDateAscending,
  OrderByDateDescending,
} from "@repo/db/queries";

export const eventsRouter = {
  getUpcoming: publicProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {
      // Input represents filter options

      // Format Filters

      // Return Upcoming Events
      return await ctx.db.event.findMany({
        where: {
          ...GetFutureDatesQuery,
          ...GetPublishedQuery,
        },
        orderBy: OrderByDateAscending,
      });
    }),

  getCurrent: publicProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {
      // Input represents filter options

      // Format Filters

      // Return Current Events
      return await ctx.db.event.findMany({
        where: {
          ...GetCurrentQuery,
          ...GetPublishedQuery,
        },
        orderBy: OrderByDateAscending,
      });
    }),

  getPast: authorizedProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {
      // Return Past Events
      return await ctx.db.event.findMany({
        where: {
          ...GetPreviousDatesQuery,
          ...GetPublishedQuery,
        },
        orderBy: OrderByDateDescending,
      });
    }),

  getDrafts: authorizedProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db.event.findMany({
        where: {
          ...GetPreviousDatesQuery,
          ...GetDraftsQuery,
        },
        orderBy: OrderByDateDescending,
      });
    }),

  getDetails: publicProcedure.input(GetDetailsInput).query(
    async ({ ctx, input }) =>
      await ctx.db.event.findUnique({
        where: {
          ...GetDetailsQuery(input),
        },
        include: {
          ...EventIncludePublicQuery,
        },
      })
  ),

  getFeatured: publicProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

  getBookmarked: protectedProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {}),

  addToBookmarked: protectedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  removeFromBookmarked: protectedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  create: authorizedProcedure
    .input(CreateEventInput)
    .mutation(async ({ ctx, input }) => {}),

  update: authorizedProcedure
    .input(UpdateEventInput)
    .mutation(async ({ ctx, input }) => {}),

  delete: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  publish: authorizedProcedure
    .input(UpdateEventDateInput)
    .mutation(async ({ ctx, input }) => {}),

  postpone: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  reschedule: authorizedProcedure
    .input(UpdateEventDateInput)
    .mutation(async ({ ctx, input }) => {}),

  cancel: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  archive: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  addKeywords: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  removeKeywords: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  addGenres: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  removeGenres: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  addParticipants: authorizedProcedure
    .input(UpdateEventParticipantInput)
    .mutation(async ({ ctx, input }) => {}),

  removeParticipants: authorizedProcedure
    .input(UpdateEventParticipantInput)
    .mutation(async ({ ctx, input }) => {}),

  requestParticipation: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  emailParticipants: authorizedProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

  emailAttendees: authorizedProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

  getNext: authorizedProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

  createTemplate: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  addDates: authorizedProcedure
    .input(UpdateEventDateInput)
    .mutation(async ({ ctx, input }) => {}),
} satisfies TRPCRouterRecord;
