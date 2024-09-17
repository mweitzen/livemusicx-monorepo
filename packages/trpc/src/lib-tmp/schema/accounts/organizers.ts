import { z } from "zod";

import {
  GetDetailsInputSchema,
  SearchSchemaBase,
  defaultPaginationValues,
} from "../../schema";
import { CreateAccountSchema } from "./shared";

export const GetAllOrganizersInputSchema = SearchSchemaBase.optional().default(
  defaultPaginationValues
);
export const GetAllOrganizersOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  })
);

export const GetOrganizerDetailsInputSchema = GetDetailsInputSchema;
export const GetOrganizerDetailsOutputSchema = z
  .object({
    id: z.string(),
  })
  .nullable();

export const GetOrganizerEventsInputSchema = GetDetailsInputSchema;
export const GetOrganizerEventsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  })
);

export const CreateOrganizerInputSchema = CreateAccountSchema.extend({});
export const CreateOrganizerOutputSchema = z.object({
  id: z.string(),
});
