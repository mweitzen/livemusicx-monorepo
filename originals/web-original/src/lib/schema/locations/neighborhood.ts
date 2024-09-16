import { z } from "zod";
import { GetChildrenInputSchema } from "@/lib/schema";

export const GetNeighborhoodsInputSchema = z
  .object({
    page: z.number().optional().default(1),
    take: z.number().optional().default(20),
    query: z.string().optional(),
    // states: z.array(z.string()).optional(),
    // regions: z.array(z.string()).optional(),
    // cities: z.array(z.string()).optional(),
    withEvents: z.boolean().optional(),
  })
  .optional()
  .default({
    page: 1,
    take: 20,
  });

export const GetNeighborhoodsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const GetNeighborhoodVenuesInputSchema = GetChildrenInputSchema;
export const GetNeighborhoodVenuesOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const GetNeighborhoodEventsInputSchema = GetChildrenInputSchema;
export const GetNeighborhoodEventsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);
