import { format } from "date-fns";
import { createSlug } from "@/lib/utils";

import { authorizedProcedure, createTRPCRouter } from "@/server/trpc";
import { TRPCError } from "@trpc/server";

import { GetDetailsInputSchema, IDInputSchema, SimpleSearchSchema } from "@livemusicx/schema";

import {
  PublishEventDraftInputSchema,
  SaveEventDraftInputSchema,
} from "@livemusicx/schema/events/drafts";

import {
  GetEventDraftDetailsQuery,
  GetAllEventDraftsQuery,
  SaveEventDraftQuery,
} from "./drafts.queries";

export const draftsRouter = createTRPCRouter({
  get: authorizedProcedure
    // .meta({ openapi: { method: "GET", path: "/events/drafts/{id}" } })
    .input(GetDetailsInputSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id!;
      const user = await ctx.prisma.user.findUnique(GetEventDraftDetailsQuery(input, userId));
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
      }
      if (!user.eventDrafts[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Draft not found.",
        });
      }
      return user.eventDrafts[0];
    }),

  list: authorizedProcedure
    // .meta({ openapi: { method: "GET", path: "/events/drafts" } })
    .input(SimpleSearchSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id!;
      const user = await ctx.prisma.user.findUnique(GetAllEventDraftsQuery(input, userId));
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
      }
      return user.eventDrafts;
    }),

  publish: authorizedProcedure
    // .meta({ openapi: { method: "POST", path: "/events/drafts/{id}/publish" } })
    .input(PublishEventDraftInputSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id!;
      const { musicians, groups, genres, keywords, ticketLinks, ...data } = input.data;

      try {
        // Create slug
        let slug = createSlug(input.data.name);
        let exists = await ctx.prisma.event.findUnique({ where: { slug } });
        let x = 1;
        while (exists) {
          slug = `${slug}-${x}`;
          exists = await ctx.prisma.event.findUnique({ where: { slug } });
          x++;
        }

        const result = await ctx.prisma.$transaction([
          ctx.prisma.event.create({
            data: {
              ...data,
              slug: `${format(data.dateStart, "yyyy-MM-dd")}-${slug}`,
              publishedById: userId,
              status: "SCHEDULED",
              musicians: {
                connect: musicians,
              },
              groups: {
                connect: groups,
              },
              genres: {
                connect: genres,
              },
              keywords: {
                connect: keywords,
              },
            },
          }),
          ctx.prisma.eventDraft.delete({
            where: {
              id: input.id,
            },
          }),
        ]);

        return result[0];
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to publish draft.",
        });
      }
    }),

  save: authorizedProcedure
    //.meta({openapi:{method:"POST", path:"/events/drafts/{id}/save"}})
    .input(SaveEventDraftInputSchema)
    .mutation(({ ctx, input }) =>
      ctx.prisma.eventDraft.upsert(SaveEventDraftQuery(input, ctx.session.user.id!))
    ),

  delete: authorizedProcedure
    // .meta({ openapi: { method: "POST", path: "/events/drafts/{id}/delete" } })
    .input(IDInputSchema)
    .mutation(({ ctx, input }) =>
      ctx.prisma.eventDraft.delete({
        where: {
          id: input.id,
        },
      })
    ),
});
