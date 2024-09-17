import { z } from "zod";
import { Prisma } from "@prisma/client";

import {
  authorizedProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../../trpc";

import { MusicianInputSchema } from "@/lib/validators/accounts";
import { TRPCError } from "@trpc/server";

import { generateUniqueSlug } from "@repo/db/helpers";

export const musiciansRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => ctx.db.musician.findMany()),

  search: publicProcedure
    .input(z.object({ query: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      let where = {} as Prisma.MusicianWhereInput;

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

      return await ctx.db.musician.findMany({
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

      return await ctx.db.musician.findMany({
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
      ctx.db.musician.findFirst({
        where: { slug: input.slug },
        select: {
          about: true,
          basedIn: true,
          affiliatedOrganizers: true,
          affiliatedVenues: true,
          groups: true,
          avatar: true,
          canCall: true,
          canText: true,
          canEmail: true,
          email: true,
          genres: true,
          id: true,
          name: true,
          phone: true,
          slug: true,
          socialBandcamp: true,
          socialSpotify: true,
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
      const musician = await ctx.db.musician.findFirst({
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

      if (!musician) {
        return null;
      }

      return musician;
    }),

  getEvents: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const musician = await ctx.db.musician.findFirst({
        where: { id: input.id },
        select: {
          events: {
            orderBy: {
              timeStart: "asc",
            },
          },
        },
      });
      if (!musician) return [];
      return [...musician.events];
    }),

  getRelatedMusicians: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const musician = await ctx.db.musician.findUnique({
        where: {
          id: input.id,
        },
        select: {
          groups: {
            select: {
              members: true,
            },
          },
          affiliatedVenues: {
            select: {
              affiliatedMusicians: true,
            },
          },
        },
      });
      if (!musician) return [];
      const relatedMusicians = new Set<any>();
      for (const group of musician.groups) {
        for (const member of group.members) {
          relatedMusicians.add(member);
        }
      }
      for (const venue of musician.affiliatedVenues) {
        for (const affiliatedMusician of venue.affiliatedMusicians) {
          relatedMusicians.add(affiliatedMusician);
        }
      }

      return Array.from(relatedMusicians);
    }),

  // getAffiliatedMusicians: publicProcedure.query(()=>{}),
  // getAffiliatedGroups: publicProcedure.query(()=>{}),
  // getAffiliatedOrganizers: publicProcedure.query(()=>{}),

  favorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.db.musician.update({
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
      ctx.db.musician.update({
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
    .input(MusicianInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { genreIds, groupIds, ...data } = input;
      const slug = await generateUniqueSlug(data.name, ctx.db.musician);
      const newMusician = await ctx.db.musician.create({
        data: {
          slug,
          active: true,
          accountManagerId: ctx.session.user.id,
          performerType: "musician",
          genres: {
            connect: genreIds,
          },
          groups: {
            connect: groupIds,
          },
          ...data,
        },
      });

      return newMusician;
    }),

  claim: authorizedProcedure
    .input(z.object({ id: z.string(), data: MusicianInputSchema }))
    .mutation(async ({ ctx, input }) => {
      // check that the account is not already claimed
      const accountClaimed = await ctx.db.musician.findFirst({
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
      const { genreIds, groupIds, ...data } = input.data;

      const updatedMusician = await ctx.db.musician.update({
        where: {
          id: input.id,
        },
        data: {
          active: true,
          accountManagerId: ctx.session.user.id,
          genres: {
            connect: genreIds,
          },
          groups: {
            connect: groupIds,
          },
          ...data,
        },
      });

      return updatedMusician;
    }),

  update: authorizedProcedure
    .input(z.object({ id: z.string(), data: MusicianInputSchema }))
    .mutation(async ({ ctx, input }) => {
      // check that user manages the account they are updating
      // if not return UNAUTHORIZED
      // update musician
      const { genreIds, groupIds, ...data } = input.data;

      const updatedMusician = await ctx.db.musician.update({
        where: {
          id: input.id,
        },
        data: {
          genres: {
            connect: genreIds,
          },
          groups: {
            connect: groupIds,
          },
          ...data,
        },
      });

      return updatedMusician;
    }),

  deactivate: authorizedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updatedMusician = await ctx.db.musician.update({
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
