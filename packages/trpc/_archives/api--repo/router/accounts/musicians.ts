import type { RouterInputs, RouterOutputs } from "@/lib/trpc/shared";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  authorizedProcedure,
} from "@/server/trpc";
import { z } from "zod";

import { createSlug } from "@repo/utils/create-slug";

import { GetAllMusiciansQuery } from "./musicians.queries";
import {
  ClaimMusicianInputSchema,
  ClaimMusicianOutputSchema,
  CreateMusicianInputSchema,
  CreateMusicianOutputSchema,
  GetAllMusiciansInputSchema,
  GetAllMusiciansOutputSchema,
  GetMusicianDetailsInputSchema,
  GetMusicianDetailsOutputSchema,
  GetMusicianEventsInputSchema,
  GetMusicianEventsOutputSchema,
  GetRelatedMusiciansInputSchema,
  GetRelatedMusiciansOutputSchema,
} from "@livemusicx/schema/accounts/musicians";

type MusiciansOutputs = RouterOutputs["accounts"]["musicians"];

export type AllMusicians = MusiciansOutputs["getAll"];
export type FavoriteMusicians = MusiciansOutputs["getFavorites"];

type MusiciansInputs = RouterInputs["accounts"]["musicians"];

export type GetAllMusiciansInput = MusiciansInputs["getAll"];
export type GetUsersFavoriteMusiciansInput = MusiciansInputs["getFavorites"];

export const musiciansRouter = createTRPCRouter({
  /*
   *
   * PUBLIC */
  getTotalCount: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/musicians/count", tags: ["accounts"] } })
    .input(GetAllMusiciansInputSchema)
    .output(z.number())
    .query(({ ctx }) => ctx.prisma.musician.count()),
  getAll: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/musicians", tags: ["accounts"] } })
    .input(GetAllMusiciansInputSchema)
    // .output(GetAllMusiciansOutputSchema)
    .query(({ ctx, input }) =>
      ctx.prisma.musician.findMany(
        GetAllMusiciansQuery(input, ctx.session?.user)
      )
    ),
  getDetails: publicProcedure
    // .meta({ openapi: { method: "GET", path: "/accounts/musicians/{id}", tags: ["accounts"] } })
    .input(GetMusicianDetailsInputSchema)
    // .output(GetMusicianDetailsOutputSchema)
    .query(({ ctx, input }) =>
      ctx.prisma.musician.findUnique({
        where: {
          id: input.id || undefined,
          slug: input.slug || undefined,
        },
        include: {
          events: {
            orderBy: {
              timeStart: "asc",
            },
            take: 5,
          },
          basedIn: true,
          groups: true,
          media: true,
          genres: true,
          affiliatedVenues: true,
          affiliatedOrganizers: true,
          _count: {
            select: {
              favoritedBy: true,
            },
          },
        },
      })
    ),
  getEvents: publicProcedure
    // .meta({
    //   openapi: { method: "GET", path: "/accounts/musicians/{id}/events", tags: ["accounts"] },
    // })
    .input(GetMusicianEventsInputSchema)
    // .output(GetMusicianEventsOutputSchema)
    .query(async ({ ctx, input }) => {
      const musician = await ctx.prisma.musician.findUnique({
        where: {
          id: input.id || undefined,
          slug: input.slug || undefined,
        },
        select: {
          events: {
            orderBy: {
              timeStart: "asc",
            },
          },
        },
      });
      if (!musician) return [];
      return musician.events;
    }),
  getRelatedMusicians: publicProcedure
    // .meta({
    //   openapi: { method: "GET", path: "/accounts/musicians/{id}/related", tags: ["accounts"] },
    // })
    .input(GetRelatedMusiciansInputSchema)
    // .output(GetRelatedMusiciansOutputSchema)
    .query(async ({ ctx, input }) => {
      const musician = await ctx.prisma.musician.findUnique({
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
  /*
   *
   * PROTECTED */
  getFavorites: protectedProcedure.query(() => {}),
  addToFavorites: protectedProcedure.query(() => {}),
  removeFromFavorites: protectedProcedure.query(() => {}),

  /*
   *
   * AUTHORIZED */
  createAccount: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/accounts/musicians",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .input(CreateMusicianInputSchema)
    // .output(CreateMusicianOutputSchema)
    .mutation(async ({ ctx, input }) => {
      // Create slug
      let slug = createSlug(input.name);
      let exists = await ctx.prisma.musician.findUnique({ where: { slug } });
      let x = 1;
      while (exists) {
        slug = `${slug}-${x}`;
        exists = await ctx.prisma.musician.findUnique({ where: { slug } });
        x++;
      }

      // Create account
      return await ctx.prisma.musician.create({
        data: {
          slug,
          active: true,
          name: input.name,
          about: input.about,
          accountManager: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          basedIn: {
            connect: {
              id: input.basedInId,
            },
          },
          genres: {
            connect: input.genres,
          },
          // groups: {
          //   connect: [{ id: "" }],
          // },
        },
      });
    }),
  claimAccount: authorizedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/accounts/musicians/{id}/claim",
    //     tags: ["accounts"],
    //     protect: true,
    //   },
    // })
    .input(ClaimMusicianInputSchema)
    // .output(ClaimMusicianOutputSchema)
    .mutation(({ ctx, input }) => {
      return {
        ...input,
      };
    }),
  updateAccount: authorizedProcedure.mutation(() => {}),
  deactivateAccount: authorizedProcedure.mutation(() => {}),
  requestAffiliation: authorizedProcedure.mutation(() => {}),
  removeAffiliation: authorizedProcedure.mutation(() => {}),
  sendInquiry: authorizedProcedure.mutation(() => {}),
});
