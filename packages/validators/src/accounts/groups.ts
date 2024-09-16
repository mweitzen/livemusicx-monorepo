import { z } from "zod";
import {
  GetDetailsInputSchema,
  IDArraySchema,
  SearchSchemaBase,
  defaultPaginationValues,
  groupSizes,
} from "../shared";
import { ClaimAccountSchema, CreatePerformerSchema } from "./shared";

export const GetAllGroupsInputSchema = SearchSchemaBase.extend({
  groupSizes: z.array(groupSizes).optional(),
})
  .optional()
  .default(defaultPaginationValues);
export const GetAllGroupsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  })
);

export const GetGroupDetailsInputSchema = GetDetailsInputSchema;
export const GetGroupDetailsOutputSchema = z
  .object({
    id: z.string(),
  })
  .nullable();

export const GetGroupEventsInputSchema = GetDetailsInputSchema;
export const GetGroupEventsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  })
);

export const CreateGroupInputSchema = CreatePerformerSchema.extend({
  members: IDArraySchema.optional(),
});

export const ClaimGroupInputSchema = ClaimAccountSchema.merge(
  z.object({
    data: CreateGroupInputSchema.optional(),
  })
);
