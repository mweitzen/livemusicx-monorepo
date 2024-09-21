import { z } from "zod";
import { Prisma } from "@repo/db";

import {
  authorizedProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../../trpc";

import { VenueInputSchema } from "@repo/validators";

import { generateUniqueSlug } from "@repo/db/helpers";

/**
 *
 *  Initialize the Venues Router
 *
 */
export const venuesRouter = createTRPCRouter({
  /**
   *
   * List all venues
   *
   */
  list: publicProcedure.query(({ ctx }) => ctx.db.venue.findMany()),

  /**
   *
   * Search venues with a query parameter
   *
   */
  search: publicProcedure
    .input(z.object({ query: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      let where = {} as Prisma.VenueWhereInput;

      if (input && input.query) {
        const searchProperties = {
          contains: input.query,
          mode: "insensitive",
        } as const;

        where.OR = [
          { name: searchProperties },
          { about: searchProperties },
          { genres: { some: { name: searchProperties } } },
          { keywords: { some: { name: searchProperties } } },
        ];
      }

      return await ctx.db.venue.findMany({
        where,
        select: {
          id: true,
          name: true,
          addressShort: true,
          avatar: true,
          genres: true,
          keywords: true,
          slug: true,
          type: true,
        },
      });
    }),

  /**
   *
   * Search unclaimed venues
   *
   */
  searchUnclaimed: authorizedProcedure
    .input(z.object({ name: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      if (!input || !input.name) return [];

      return await ctx.db.venue.findMany({
        where: {
          name: {
            contains: input.name,
            mode: "insensitive",
          },
          active: false,
          accountManagerId: null,
        },
        select: {
          id: true,
          name: true,
          addressShort: true,
        },
      });
    }),

  /**
   *
   * Get public facing details for a single venue
   * given the provided "slug" as a paramter.
   *
   */
  getPublicDetails: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.venue.findFirst({
        where: { slug: input.slug },
        select: {
          about: true,
          addressLong: true,
          addressShort: true,
          affiliatedGroups: true,
          affiliatedMusicians: true,
          affiliatedOrganizers: true,
          ageRestriction: true,
          avatar: true,
          businessGoogle: true,
          businessOpentable: true,
          businessTripadvisor: true,
          businessYelp: true,
          canCall: true,
          canText: true,
          canEmail: true,
          city: true,
          email: true,
          emailBooking: true,
          genres: true,
          id: true,
          keywords: true,
          minimumAge: true,
          name: true,
          neighborhood: true,
          phone: true,
          phoneBooking: true,
          region: true,
          requiresReservation: true,
          reservationLink: true,
          servesAlcohol: true,
          servesFood: true,
          slug: true,
          socialFacebook: true,
          socialInstagram: true,
          socialTwitter: true,
          socialYouTube: true,
          stages: true,
          state: true,
          street: true,
          streetNumber: true,
          type: true,
          unit: true,
          username: {
            select: {
              username: true,
            },
          },
          website: true,
          zipcode: true,
        },
      })
    ),

  /**
   *
   * GET ADMIN DETAILS
   *
   * Get public facing details for a single venue
   * given the provided "slug" as a paramter.
   *
   */
  getAdminDetails: authorizedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // check if venue exists
      // return NOT FOUND
      // check if user manages the account
      // return UNAUTHORIZED
      // return venue
      const venue = await ctx.db.venue.findFirst({
        where: {
          id: input.id,
          // accountManagerId: ctx.session.user.id,
        },
        include: {
          accountManager: true,
          city: true,
          favoritedBy: {
            select: {
              _count: true,
            },
          },
          events: {
            select: {
              _count: true,
            },
          },
          genres: true,
          keywords: true,
          neighborhood: true,
          region: true,
          stages: true,
          street: true,
          state: true,
          username: true,
          zipcode: true,
        },
      });

      if (!venue) {
        return null;
      }

      return venue;
    }),

  /**
   *
   * Get events for a given venue
   *
   */
  getEvents: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const venue = await ctx.db.venue.findFirst({
        where: { id: input.id },
        select: {
          events: {
            orderBy: {
              timeStart: "asc",
            },
          },
        },
      });
      if (!venue) return [];
      return [...venue.events];
    }),

  // getAffiliatedMusicians: publicProcedure.query(()=>{}),
  // getAffiliatedGroups: publicProcedure.query(()=>{}),
  // getAffiliatedOrganizers: publicProcedure.query(()=>{}),

  favorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.db.venue.update({
        where: { id: input.id },
        data: {
          favoritedBy: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      })
    ),

  unfavorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.db.venue.update({
        where: { id: input.id },
        data: {
          favoritedBy: {
            disconnect: {
              id: ctx.session.user.id,
            },
          },
        },
      })
    ),

  create: authorizedProcedure
    .input(VenueInputSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        genreIds,
        keywordIds,
        state,
        street,
        city,
        neighborhood,
        zipcode,
        ...data
      } = input;
      const slug = await generateUniqueSlug(data.name, "venue");
      // const newVenue = await ctx.db.venue.create({
      //   data: {
      //     slug,
      //     active: true,
      //     accountManagerId: ctx.session.user.id,
      //     genres: {
      //       connect: genreIds,
      //     },
      //     keywords: {
      //       connect: keywordIds,
      //     },
      //     ...data,
      //   },
      // });

      // return newVenue;
    }),
  claim: authorizedProcedure.mutation(() => {}),
  update: authorizedProcedure.mutation(() => {}),
  deactivate: authorizedProcedure.mutation(() => {}),
  transfer: authorizedProcedure.mutation(() => {}),

  requestAffiliation: authorizedProcedure.mutation(() => {}),
  acceptAffiliation: authorizedProcedure.mutation(() => {}),
  denyAffiliation: authorizedProcedure.mutation(() => {}),
  removeAffiliation: authorizedProcedure.mutation(() => {}),

  sendInquiry: authorizedProcedure.mutation(() => {}),
  message: authorizedProcedure.mutation(() => {}),

  createStage: authorizedProcedure.mutation(() => {}),
  updateStage: authorizedProcedure.mutation(() => {}),
  deleteStage: authorizedProcedure.mutation(() => {}),
});
