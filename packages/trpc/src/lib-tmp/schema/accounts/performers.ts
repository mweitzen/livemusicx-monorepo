import { z } from "zod";

import { GetAllGroupsInputSchema } from "./groups";
import { NoInputSchema } from "../../schema";

export const GetAllPerformersInputSchema = GetAllGroupsInputSchema;
export const GetAllPerformersOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  })
);

export const GetPerformersQuickViewInputSchema = NoInputSchema;
export const GetPerformersQuickViewOutputSchema = z.array(
  // z.object({
  //   id: z.string(),
  //   name: z.string(),
  //   slug: z.string(),
  // })
  z.any()
);
