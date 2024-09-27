import { TRPCRouterRecord } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  musicians: {
    getAll: publicProcedure.input(() => {}).query(async ({ ctx, input }) => {}),
  } satisfies TRPCRouterRecord,

  bands: {
    getAll: publicProcedure.input(() => {}).query(async ({ ctx, input }) => {}),
  } satisfies TRPCRouterRecord,

  venues: {
    getAll: publicProcedure.input(() => {}).query(async ({ ctx, input }) => {}),
  } satisfies TRPCRouterRecord,

  organizers: {
    getAll: publicProcedure.input(() => {}).query(async ({ ctx, input }) => {}),
  } satisfies TRPCRouterRecord,
});
