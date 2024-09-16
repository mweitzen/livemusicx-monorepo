import { z } from "zod";
import { NoInputSchema } from "../shared";

export const GetGenresInputSchema = NoInputSchema;
export const GetGenresOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    displayName: z.string(),
  })
);
