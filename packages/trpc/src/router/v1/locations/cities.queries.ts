import { z } from "zod";
import type { Prisma } from "@repo/db/schema";

import {
  GetCitiesInputSchema,
  GetCityNeighborhoodsInputSchema,
  GetCityVenuesInputSchema,
  GetCityEventsInputSchema,
} from "../../../lib-tmp/schema/locations/city";

export const GetAllCitiesQuery = (
  input: z.infer<typeof GetCitiesInputSchema>
): Prisma.CityFindManyArgs => ({
  take: input.take,
  skip: input.take * (input.page - 1),
  where: input
    ? {
        name:
          input.query !== undefined && input.query !== ""
            ? { contains: input.query, mode: "insensitive" }
            : undefined,
        // stateId: input.states
        //   ? {
        //       in: input.states,
        //     }
        //   : undefined,
        // regionId: input.regions
        //   ? {
        //       in: input.regions,
        //     }
        //   : undefined,
        OR: input.withMusicians
          ? [
              {
                musiciansOperatingIn: {
                  some: {
                    name: {
                      not: undefined,
                    },
                  },
                },
              },
              {
                groupsOperatingIn: {
                  some: {
                    name: {
                      not: undefined,
                    },
                  },
                },
              },
            ]
          : undefined,
        venues:
          input.withVenues || input.withEvents
            ? {
                some: {
                  name: { not: undefined },
                  events: input.withEvents
                    ? {
                        some: {
                          timeStart: {
                            gte: new Date(),
                          },
                        },
                      }
                    : undefined,
                },
              }
            : undefined,
      }
    : undefined,
  orderBy: { name: "asc" },
  // include: {
  //   state: true,
  //   region: true,
  //   neighborhoods: input.neighborhoods ? { orderBy: { name: "asc" } } : undefined,
  //   streets: input.streets ? { orderBy: { name: "asc" } } : undefined,
  //   venues:
  //     input.venues || input.events
  //       ? {
  //           orderBy: { name: "asc" },
  //           include: input.events ? { events: { orderBy: { timeStart: "asc" } } } : undefined,
  //         }
  //       : undefined,
  //   _count: input.count
  //     ? {
  //         select: {
  //           musiciansOperatingIn: input.count.musicians ?? undefined,
  //           groupsOperatingIn: input.count.groups ?? undefined,
  //           venues: input.count.events
  //             ? {
  //                 where: {
  //                   events: {
  //                     some: {
  //                       timeStart: {
  //                         gte: new Date(),
  //                       },
  //                     },
  //                   },
  //                 },
  //               }
  //             : undefined,
  //         },
  //       }
  //     : undefined,
  // },
});
export const GetCityNeighborhoodsQuery = (
  input: z.infer<typeof GetCityNeighborhoodsInputSchema>
) =>
  ({
    where: {
      id: input.id,
    },
    select: {
      neighborhoods: {
        take: input.take,
        skip: input.take * (input.page - 1),
        orderBy: { name: "asc" },
      },
    },
  }) satisfies Prisma.CityFindUniqueArgs;

export const GetCityVenuesQuery = (
  input: z.infer<typeof GetCityVenuesInputSchema>
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
  }) satisfies Prisma.CityFindUniqueArgs;

export const GetCityEventsQuery = (
  input: z.infer<typeof GetCityEventsInputSchema>
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
  }) satisfies Prisma.CityFindUniqueArgs;
