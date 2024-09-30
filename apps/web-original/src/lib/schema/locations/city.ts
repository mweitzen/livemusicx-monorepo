import { z } from "zod";
import { GetChildrenInputSchema } from "~/lib/schema";

export const GetCitiesInputSchema = z
  .object({
    page: z.number().optional().default(1),
    take: z.number().optional().default(20),
    query: z.string().optional(),
    // states: z.array(z.string()).optional(),
    // regions: z.array(z.string()).optional(),
    withMusicians: z.boolean().optional(),
    withVenues: z.boolean().optional(),
    withEvents: z.boolean().optional(),
  })
  .optional()
  .default({
    page: 1,
    take: 20,
  });

export const GetCitiesOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);

export const GetCityNeighborhoodsInputSchema = GetChildrenInputSchema;
export const GetCityNeighborhoodsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);

export const GetCityVenuesInputSchema = GetChildrenInputSchema;
export const GetCityVenuesOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);

export const GetCityEventsInputSchema = GetChildrenInputSchema;
export const GetCityEventsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);
