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

import { __PLACEHOLDER__ } from "@repo/validators/general";

export const eventsRouter = {
  getCount: publicProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {}),

  getUpcoming: publicProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {}),

  getPast: authorizedProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {}),

  getDrafts: authorizedProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {}),

  getDetails: publicProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {}),

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

  addParticipant: authorizedProcedure
    .input(UpdateEventParticipantInput)
    .mutation(async ({ ctx, input }) => {}),

  removePartipant: authorizedProcedure
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
