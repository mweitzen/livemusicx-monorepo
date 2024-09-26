import type { TRPCRouterRecord } from "@trpc/server";
import { __PLACEHOLDER__ } from "@repo/validators/general";

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

import {
  AddTagInput,
  FEATURED_TAKE,
  GetDetailsInput,
  GetFeaturedInput,
} from "@repo/validators/shared";

import {
  BookmarkedIncludeQuery,
  BookmarkedQuery,
  EventIncludePublicQuery,
  FavoritedAccountsQuery,
  GetCurrentQuery,
  GetDetailsQuery,
  GetDraftsQuery,
  GetFeatureDatesQuery,
  GetFutureDatesQuery,
  GetPreviousDatesQuery,
  GetPublishedQuery,
  OrderByDateAscending,
  OrderByDateDescending,
  SearchEventsQuery,
} from "@repo/db/queries";

export const eventsRouter = {
  // TODO: Combine get upcoming and get current + date search
  getUpcoming: publicProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      return await ctx.db.event.findMany({
        take: input.take,
        skip: (input.page - 1) * input.take,
        where: {
          AND: [
            { ...SearchEventsQuery(input.query) },
            {
              ...GetFutureDatesQuery,
              ...GetPublishedQuery,
              ...BookmarkedQuery(userId, input.bookmarked),
              ...FavoritedAccountsQuery(userId, input.favorites),
              isFree: input.isFree,
              isChildFriendly: input.isChildFriendly,
              isHoliday: input.isHoliday,
              servesAlcohol: input.servesAlcohol,
              servesFood: input.servesFood,
            },
          ],
        },
        include: {
          ...BookmarkedIncludeQuery(userId),
        },
        orderBy: OrderByDateAscending,
      });
    }),

  getCurrent: publicProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      return await ctx.db.event.findMany({
        take: input.take,
        skip: (input.page - 1) * input.take,
        where: {
          AND: [
            { ...SearchEventsQuery(input.query) },
            {
              ...GetCurrentQuery,
              ...GetPublishedQuery,
              ...BookmarkedQuery(userId, input.bookmarked),
              ...FavoritedAccountsQuery(userId, input.favorites),
              isFree: input.isFree,
              isChildFriendly: input.isChildFriendly,
              isHoliday: input.isHoliday,
              servesAlcohol: input.servesAlcohol,
              servesFood: input.servesFood,
            },
          ],
        },
        include: {
          ...BookmarkedIncludeQuery(userId),
        },
        orderBy: OrderByDateAscending,
      });
    }),

  getPast: authorizedProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db.event.findMany({
        take: input.take,
        skip: (input.page - 1) * input.take,
        where: {
          AND: [
            { ...SearchEventsQuery(input.query) },
            {
              ...GetPreviousDatesQuery,
              ...GetPublishedQuery,
            },
          ],
        },
        orderBy: OrderByDateDescending,
      });
    }),

  getDrafts: authorizedProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db.event.findMany({
        take: input.take,
        skip: (input.page - 1) * input.take,
        where: {
          AND: [
            { ...SearchEventsQuery(input.query) },
            {
              ...GetFutureDatesQuery,
              ...GetDraftsQuery,
            },
          ],
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
          ...EventIncludePublicQuery(ctx.session?.user.id),
        },
      })
  ),

  getFeatured: publicProcedure.input(GetFeaturedInput).query(
    async ({ ctx, input }) =>
      await ctx.db.event.findMany({
        take: FEATURED_TAKE,
        where: {
          ...GetFeatureDatesQuery,
          ...GetPublishedQuery,
        },
      })
  ),

  getBookmarked: protectedProcedure
    .input(SearchEventsInput)
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          eventsBookmarked: {
            take: input.take,
            skip: (input.page - 1) * input.take,
            where: {
              AND: [
                { ...SearchEventsQuery(input.query) },
                {
                  ...GetFutureDatesQuery,
                  ...GetPublishedQuery,
                },
              ],
            },
          },
        },
      });
      if (!user) return [];
      return user.eventsBookmarked;
    }),

  isBookmarked: protectedProcedure
    .input(GetDetailsInput)
    .query(async ({ ctx, input }) => {
      const check = await ctx.db.event.findUnique({
        where: {
          id: input.id,
          bookmarkedBy: {
            some: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return !!check;
    }),

  addToBookmarked: protectedProcedure.input(GetDetailsInput).mutation(
    async ({ ctx, input }) =>
      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          eventsBookmarked: {
            connect: {
              id: input.id!,
              slug: input.slug!,
            },
          },
        },
      })
  ),

  removeFromBookmarked: protectedProcedure.input(GetDetailsInput).mutation(
    async ({ ctx, input }) =>
      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          eventsBookmarked: {
            disconnect: {
              id: input.id!,
              slug: input.slug!,
            },
          },
        },
      })
  ),

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
    .input(AddTagInput)
    .mutation(async ({ ctx, input }) => {
      // TODO: Ensure User can Edit Event
      await ctx.db.event.update({
        where: {
          id: input.resourceId,
        },
        data: {
          keywords: {
            connect: {
              id: input.tagId,
            },
          },
        },
      });
    }),

  removeKeywords: authorizedProcedure
    .input(AddTagInput)
    .mutation(async ({ ctx, input }) => {
      // TODO: Ensure User can Edit Event
      await ctx.db.event.update({
        where: {
          id: input.resourceId,
        },
        data: {
          keywords: {
            connect: {
              id: input.tagId,
            },
          },
        },
      });
    }),

  addGenres: authorizedProcedure
    .input(AddTagInput)
    .mutation(async ({ ctx, input }) => {
      // TODO: Ensure User can Edit Event
      await ctx.db.event.update({
        where: {
          id: input.resourceId,
        },
        data: {
          genres: {
            connect: {
              id: input.tagId,
            },
          },
        },
      });
    }),

  removeGenres: authorizedProcedure
    .input(AddTagInput)
    .mutation(async ({ ctx, input }) => {
      // TODO: Ensure User can Edit Event
      await ctx.db.event.update({
        where: {
          id: input.resourceId,
        },
        data: {
          genres: {
            connect: {
              id: input.tagId,
            },
          },
        },
      });
    }),

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
