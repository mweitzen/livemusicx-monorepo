import { z } from "zod";
import type { Prisma } from "@prisma/client";

import {
  GetNeighborhoodEventsInputSchema,
  GetNeighborhoodVenuesInputSchema,
  GetNeighborhoodsInputSchema,
} from "~/lib/schema/locations/neighborhood";

export const GetAllNeighborhoodsQuery = (
  input: z.infer<typeof GetNeighborhoodsInputSchema>
): Prisma.NeighborhoodFindManyArgs => ({
  take: input.take,
  skip: input.take * (input.page - 1),
  where: input
    ? {
        name:
          input.query !== undefined && input.query !== ""
            ? { contains: input.query, mode: "insensitive" }
            : undefined,
        // city:
        //   input.states || input.regions || input.cities
        //     ? {
        //         id: input.cities
        //           ? {
        //               in: input.cities,
        //             }
        //           : undefined,
        //         stateId: input.states
        //           ? {
        //               in: input.states,
        //             }
        //           : undefined,
        //         regionId: input.regions
        //           ? {
        //               in: input.regions,
        //             }
        //           : undefined,
        //       }
        //     : undefined,
        venues: input.withEvents
          ? {
              some: {
                events: {
                  some: {
                    timeStart: {
                      gte: new Date(),
                    },
                  },
                },
              },
            }
          : undefined,
      }
    : undefined,
  orderBy: { name: "asc" },
});

export const GetNeighborhoodVenuesQuery = (
  input: z.infer<typeof GetNeighborhoodVenuesInputSchema>
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
  } satisfies Prisma.NeighborhoodFindUniqueArgs);

export const GetNeighborhoodEventsQuery = (
  input: z.infer<typeof GetNeighborhoodEventsInputSchema>
) =>
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
  } satisfies Prisma.NeighborhoodFindUniqueArgs);
