import { z } from "zod";
import { NoInputSchema } from "../shared";

export const GetChildrenInputSchema = z.object({
  id: z.string(),
  page: z.number().optional().default(1),
  take: z.number().optional().default(20),
  query: z.string().optional(),
});

export const GetStatesInputSchema = NoInputSchema;
export const GetStatesOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    shortCode: z.string(),
  })
);

export const GetStateRegionsInputSchema = GetChildrenInputSchema;

export const GetStateRegionsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const GetStateCitiesInputSchema = GetChildrenInputSchema;
export const GetStateCitiesOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const GetStateEventsInputSchema = GetChildrenInputSchema;
export const GetStateEventsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const GetStateVenuesInputSchema = GetChildrenInputSchema;
export const GetStateVenuesOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);
