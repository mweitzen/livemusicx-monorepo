import { format } from "date-fns";

import { authorizedProcedure, createTRPCRouter } from "../../../trpc";
import { TRPCError } from "@trpc/server";

import {
  GetDetailsInputSchema,
  IDInputSchema,
  SimpleSearchSchema,
} from "../../../lib-tmp/schema";

import {
  PublishEventDraftInputSchema,
  SaveEventDraftInputSchema,
} from "../../../lib-tmp/schema/events/drafts";

import {
  GetEventDraftDetailsQuery,
  GetAllEventDraftsQuery,
  SaveEventDraftQuery,
} from "./drafts.queries";
import { generateUniqueSlug } from "@repo/db/helpers";

export const draftsRouter = createTRPCRouter({
  get: authorizedProcedure
    // .meta({ openapi: { method: "GET", path: "/events/drafts/{id}" } })
    .input(GetDetailsInputSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id!;
      const user = await ctx.db.user.findUnique(
        GetEventDraftDetailsQuery(input, userId)
      );
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
      const user = await ctx.db.user.findUnique(
        GetAllEventDraftsQuery(input, userId)
      );
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
      const { musicians, groups, genres, keywords, ticketLinks, ...data } =
        input.data;

      try {
        // Create slug
        let slug = await generateUniqueSlug(input.data.name, "event");
        let exists = await ctx.db.event.findUnique({ where: { slug } });
        let x = 1;
        while (exists) {
          slug = `${slug}-${x}`;
          exists = await ctx.db.event.findUnique({ where: { slug } });
          x++;
        }

        const result = await ctx.db.$transaction([
          ctx.db.event.create({
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
          ctx.db.eventDraft.delete({
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
      ctx.db.eventDraft.upsert(SaveEventDraftQuery(input, ctx.session.user.id!))
    ),

  delete: authorizedProcedure
    // .meta({ openapi: { method: "POST", path: "/events/drafts/{id}/delete" } })
    .input(IDInputSchema)
    .mutation(({ ctx, input }) =>
      ctx.db.eventDraft.delete({
        where: {
          id: input.id,
        },
      })
    ),
});
