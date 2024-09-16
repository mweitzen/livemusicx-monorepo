import { z } from "zod";
import type { Prisma } from "@livemusicx/db";

import {
  GetStateRegionsInputSchema,
  GetStateCitiesInputSchema,
  GetStateVenuesInputSchema,
  GetStateEventsInputSchema,
} from "@livemusicx/schema/locations/state";

/*
 *
 *
 *
 ** GET STATES */
export const GetAllStatesQuery: Prisma.StateFindManyArgs = {};
export const GetStateRegionsQuery = (input: z.infer<typeof GetStateRegionsInputSchema>) =>
  ({
    where: {
      id: input.id,
    },
    select: {
      regions: {
        take: input.take,
        skip: input.take * (input.page - 1),
        orderBy: { name: "asc" },
      },
    },
  }) satisfies Prisma.StateFindUniqueArgs;

export const GetStateCitiesQuery = (input: z.infer<typeof GetStateCitiesInputSchema>) =>
  ({
    where: {
      id: input.id,
    },
    select: {
      cities: {
        take: input.take,
        skip: input.take * (input.page - 1),
        orderBy: { name: "asc" },
      },
    },
  }) satisfies Prisma.StateFindUniqueArgs;

export const GetStateVenuesQuery = (input: z.infer<typeof GetStateVenuesInputSchema>) =>
  ({
    where: {
      id: input.id,
    },
    select: {
      venues: {
        take: input.take,
        skip: input.take * (input.page - 1),
        orderBy: { name: "asc" },
      },
    },
  }) satisfies Prisma.StateFindUniqueArgs;
export const GetStateEventsQuery = (input: z.infer<typeof GetStateEventsInputSchema>) =>
  ({
    where: {
      id: input.id,
    },
    // select: {
    //   events: {
    //     take: input.take,
    //     skip: input.take * (input.page - 1),
    //     orderBy: { timeStart: "asc" },
    //   },
    // },
  }) satisfies Prisma.StateFindUniqueArgs;
