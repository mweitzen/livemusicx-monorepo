import { z } from "zod";
import type { Prisma } from "@repo/db/schema";

import {
  GetRegionsInputSchema,
  GetRegionCitiesInputSchema,
  GetRegionVenuesInputSchema,
  GetRegionEventsInputSchema,
} from "~/lib/schema/locations/region";

export const GetAllRegionsQuery = (
  input: z.infer<typeof GetRegionsInputSchema>,
): Prisma.RegionFindManyArgs => ({
  take: input.take,
  skip: input.take * (input.page - 1),
  where: {
    name:
      input.query !== undefined && input.query !== ""
        ? { contains: input.query, mode: "insensitive" }
        : undefined,
  },
  orderBy: { name: "asc" },
});

export const GetRegionCitiesQuery = (
  input: z.infer<typeof GetRegionCitiesInputSchema>,
) =>
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
  }) satisfies Prisma.RegionFindUniqueArgs;

export const GetRegionVenuesQuery = (
  input: z.infer<typeof GetRegionVenuesInputSchema>,
) =>
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
  }) satisfies Prisma.RegionFindUniqueArgs;

export const GetRegionEventsQuery = (
  input: z.infer<typeof GetRegionEventsInputSchema>,
): Prisma.RegionFindUniqueArgs =>
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
  }) satisfies Prisma.RegionFindUniqueArgs;
