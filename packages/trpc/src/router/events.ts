import { __PLACEHOLDER__ } from "@repo/validators/general";
import type { TRPCRouterRecord } from "@trpc/server";

import { createEventSlug } from "@repo/utils";

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
  FEATURED_TAKE,
  AddTagInput,
  GetDetailsInput,
  GetFeaturedInput,
} from "@repo/validators/shared";

import {
  BookmarkedIncludeQuery,
  BookmarkedQuery,
  FavoritedAccountsQuery,
  FilterEventsQuery,
  FindManyEventsInclude,
  GetCurrentQuery,
  GetDetailsQuery,
  GetDraftsQuery,
  GetEventDetailsInclude,
  GetFeatureDatesQuery,
  GetFutureDatesQuery,
  GetPreviousDatesQuery,
  GetPublishedQuery,
  ManyToManyConnect,
  MultiKeywordQuery,
  OrderByDateAscending,
  OrderByDateDescending,
  SearchEventsQuery,
  VenueTypesQuery,
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
            { venue: { ...VenueTypesQuery(input.venueTypes) } },
            { genres: { ...MultiKeywordQuery(input.genres) } },
            { keywords: { ...MultiKeywordQuery(input.keywords) } },
            { ...FavoritedAccountsQuery(userId, input.favorites) },
            {
              ...GetFutureDatesQuery,
              ...GetPublishedQuery,
              ...BookmarkedQuery(userId, input.bookmarked),
              ...FilterEventsQuery(input),
            },
          ],
        },
        include: {
          ...FindManyEventsInclude,
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
            { venue: { ...VenueTypesQuery(input.venueTypes) } },
            { genres: { ...MultiKeywordQuery(input.genres) } },
            { keywords: { ...MultiKeywordQuery(input.keywords) } },
            { ...FavoritedAccountsQuery(userId, input.favorites) },
            {
              ...GetCurrentQuery,
              ...GetPublishedQuery,
              ...BookmarkedQuery(userId, input.bookmarked),
              ...FilterEventsQuery(input),
            },
          ],
        },
        include: {
          ...FindManyEventsInclude,
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
          // createdBy: ctx.session.user.id,
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
          ...GetEventDetailsInclude,
          ...BookmarkedIncludeQuery(ctx.session?.user.id),
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
          // location query
        },
        include: {
          ...FindManyEventsInclude,
          ...BookmarkedIncludeQuery(ctx.session?.user.id),
        },
        orderBy: OrderByDateAscending,
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
          bookmarkedEvents: {
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
      return user.bookmarkedEvents;
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
          bookmarkedEvents: {
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
          bookmarkedEvents: {
            disconnect: {
              id: input.id!,
              slug: input.slug!,
            },
          },
        },
      })
  ),
  test: publicProcedure.input(CreateEventInput).mutation(({ input }) => {
    const { genreIds, keywordIds, bandIds, musicianIds, ticketLinks, ...data } =
      input;

    /**
     * Create slug
     */
    const slug = createEventSlug(data);

    /**
     * Create Event
     */
    const newEvent = {
      data: {
        slug,
        genres: { connect: genreIds },
        keywords: { connect: keywordIds },
        bands: { connect: bandIds },
        musicians: { connect: musicianIds },
        ...data,
      },
    };

    return newEvent;
  }),
  create: authorizedProcedure
    .input(CreateEventInput)
    .mutation(async ({ ctx, input }) => {
      const {
        genreIds,
        keywordIds,
        bandIds,
        musicianIds,
        ticketLinks,
        ...data
      } = input;

      /**
       * Get venue for location
       */
      const venue = await ctx.db.venue.findUnique({
        where: {
          id: data.venueId,
        },
        select: { location: { select: { id: true } } },
      });

      /**
       * Create slug
       */
      const slug = createEventSlug(data);

      /**
       * Create Event
       */
      const newEvent = await ctx.db.event.create({
        data: {
          slug,
          createdById: ctx.session.user.id!,
          managedById: ctx.session.user.id!,
          locationId: venue?.location.id,
          genres: { connect: genreIds },
          keywords: { connect: keywordIds },
          bands: { connect: bandIds },
          musicians: { connect: musicianIds },
          ...data,
        },
      });

      // If publishing, Run Publish
      return newEvent;
    }),

  update: authorizedProcedure
    .input(UpdateEventInput)
    .mutation(async ({ ctx, input }) => {}),

  delete: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  publish: authorizedProcedure
    .input(UpdateEventDateInput)
    .mutation(async ({ ctx, input }) => {
      // Ensure all details are input
      //
      // Publish event (change event publish status)
      //
      // Check for external linking
      //
      // Link to external services
      //
      // Notify participants
    }),

  postpone: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {
      // Update event status
      //
      // Check for external linking (including all participants)
      //
      // Update external linked services
      //
      // Notify participants
      //
      // Notify registered users
    }),

  reschedule: authorizedProcedure
    .input(UpdateEventDateInput)
    .mutation(async ({ ctx, input }) => {
      // Update event status
      //
      // Check for external linking (including all participants)
      //
      // Update external linked services
      //
      // Notify participants
      //
      // Notify registered users
    }),

  cancel: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {
      // Update event status
      //
      // Check for external linking (including all participants)
      //
      // Update external linked services
      //
      // Notify participants
      //
      // Notify registered users
    }),

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
      console.log(input);
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
    .query(async ({ ctx, input }) => {
      // Retrieve event participants
      //
      // Send email
    }),

  emailAttendees: authorizedProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {
      // Retrieve event atendees
      //
      // Send email
    }),

  getNext: authorizedProcedure
    .input(__PLACEHOLDER__)
    .query(async ({ ctx, input }) => {
      // Get user
      //
      // Get profiles
      //
      // Find next event
    }),

  createTemplate: authorizedProcedure
    .input(__PLACEHOLDER__)
    .mutation(async ({ ctx, input }) => {}),

  addDates: authorizedProcedure
    .input(UpdateEventDateInput)
    .mutation(async ({ ctx, input }) => {
      // Retrieve details from base event
      //
      // Iterate over new dates and create events
      //
      // Notify participants of new dates
    }),
} satisfies TRPCRouterRecord;
