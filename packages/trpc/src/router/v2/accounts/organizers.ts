import {
  authorizedProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../../trpc";
import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { Prisma } from "@repo/db/v1";
import { OrganizerInputSchema } from "@/lib/validators/accounts";

import { generateUniqueSlug } from "@repo/db/helpers";

/**
 *
 *
 *  Initialize the Organizers Router
 *
 *
 */
export const organizersRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => ctx.db.organizer.findMany()),

  search: publicProcedure
    .input(z.object({ query: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      let where = {} as Prisma.OrganizerWhereInput;

      if (input && input.query) {
        const searchProperties = {
          contains: input.query,
          mode: "insensitive",
        } as const;

        where.OR = [
          { name: searchProperties },
          { about: searchProperties },
          { genres: { some: { name: searchProperties } } },
        ];
      }

      return await ctx.db.organizer.findMany({
        where,
        select: {
          id: true,
          name: true,
          avatar: true,
          genres: true,
          slug: true,
        },
      });
    }),

  searchUnclaimed: authorizedProcedure
    .input(z.object({ name: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      if (!input || !input.name) return [];

      return await ctx.db.organizer.findMany({
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
        },
      });
    }),

  getPublicDetails: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.organizer.findFirst({
        where: { slug: input.slug },
        select: {
          about: true,
          basedIn: true,
          affiliatedMusicians: true,
          affiliatedGroups: true,
          affiliatedVenues: true,
          avatar: true,
          canCall: true,
          canText: true,
          canEmail: true,
          emailInquiries: true,
          genres: true,
          id: true,
          name: true,
          phone: true,
          phoneInquiries: true,
          slug: true,
          socialFacebook: true,
          socialInstagram: true,
          socialTwitter: true,
          socialYouTube: true,
          username: {
            select: {
              username: true,
            },
          },
          website: true,
        },
      })
    ),

  getAuthorizedDetails: authorizedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // check if musician exists
      // return NOT FOUND
      // check if user manages the account
      // return UNAUTHORIZED
      // return musician
      const organizer = await ctx.db.organizer.findFirst({
        where: {
          id: input.id,
          // accountManagerId: ctx.session.user.id,
        },
        include: {
          accountManager: true,
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
          username: true,
        },
      });

      if (!organizer) {
        return null;
      }

      return organizer;
    }),

  getEvents: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const organizer = await ctx.db.organizer.findFirst({
        where: { id: input.id },
        select: {
          events: {
            orderBy: {
              timeStart: "asc",
            },
          },
        },
      });
      if (!organizer) return [];
      return [...organizer.events];
    }),

  // getAffiliatedMusicians: publicProcedure.query(()=>{}),
  // getAffiliatedGroups: publicProcedure.query(()=>{}),
  // getAffiliatedOrganizers: publicProcedure.query(()=>{}),

  favorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.db.organizer.update({
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
      ctx.db.organizer.update({
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
    .input(OrganizerInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { genreIds, ...data } = input;
      const slug = await generateUniqueSlug(data.name, ctx.db.musician);
      const newOrganizer = await ctx.db.organizer.create({
        data: {
          slug,
          active: true,
          accountManagerId: ctx.session.user.id,
          genres: {
            connect: genreIds,
          },
          ...data,
        },
      });

      return newOrganizer;
    }),

  claim: authorizedProcedure
    .input(z.object({ id: z.string(), data: OrganizerInputSchema }))
    .mutation(async ({ ctx, input }) => {
      // check that the account is not already claimed
      const accountClaimed = await ctx.db.organizer.findFirst({
        where: {
          id: input.id,
          active: true,
          accountManagerId: {
            not: null,
          },
        },
      });

      if (accountClaimed) {
        throw new TRPCError({
          message: "Error trying to claim account. Account already claimed.",
          code: "FORBIDDEN",
        });
      }
      const { genreIds, ...data } = input.data;

      const updatedOrganizer = await ctx.db.organizer.update({
        where: {
          id: input.id,
        },
        data: {
          active: true,
          accountManagerId: ctx.session.user.id,
          genres: {
            connect: genreIds,
          },
          ...data,
        },
      });

      return updatedOrganizer;
    }),

  update: authorizedProcedure
    .input(z.object({ id: z.string(), data: OrganizerInputSchema }))
    .mutation(async ({ ctx, input }) => {
      // check that user manages the account they are updating
      // if not return UNAUTHORIZED
      // update Organizer
      const { genreIds, ...data } = input.data;

      const updatedOrganizer = await ctx.db.organizer.update({
        where: {
          id: input.id,
        },
        data: {
          genres: {
            connect: genreIds,
          },
          ...data,
        },
      });

      return updatedOrganizer;
    }),

  deactivate: authorizedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updatedOrganizer = await ctx.db.organizer.update({
        where: {
          id: input.id,
        },
        data: {
          active: false,
          accountManager: {
            disconnect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return "success";
    }),
  // transfer: authorizedProcedure.mutation(() => {}),

  requestAffiliation: authorizedProcedure.mutation(() => {}),
  acceptAffiliation: authorizedProcedure.mutation(() => {}),
  denyAffiliation: authorizedProcedure.mutation(() => {}),
  removeAffiliation: authorizedProcedure.mutation(() => {}),

  sendInquiry: authorizedProcedure.mutation(() => {}),
  message: authorizedProcedure.mutation(() => {}),
});
