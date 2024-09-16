import { z } from "zod";
import { GetChildrenInputSchema } from "@/lib/schema";

export const GetRegionsInputSchema = z.object({
  page: z.number().optional().default(1),
  take: z.number().optional().default(20),
  query: z.string().optional(),
  stateId: z.string(),
});

export const GetRegionsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const GetRegionCitiesInputSchema = GetChildrenInputSchema;
export const GetRegionCitiesOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const GetRegionVenuesInputSchema = GetChildrenInputSchema;
export const GetRegionVenuesOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const GetRegionEventsInputSchema = GetChildrenInputSchema;
export const GetRegionEventsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);
