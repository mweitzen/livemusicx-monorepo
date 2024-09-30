import { z } from "zod";

import {
  ClaimAccountSchema,
  CreatePerformerSchema,
  defaultPerformerValues,
} from "./shared";

import {
  GetDetailsInputSchema,
  IDInputSchema,
  SearchSchemaBase,
  defaultPaginationValues,
} from "~/lib/schema";

export const defaultCreateMusicianValues = {
  ...defaultPerformerValues,
  groups: [],
};

export const GetAllMusiciansInputSchema = SearchSchemaBase.optional().default(
  defaultPaginationValues,
);
export const GetAllMusiciansOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
);

export const GetMusicianDetailsInputSchema = GetDetailsInputSchema;
export const GetMusicianDetailsOutputSchema = z
  .object({
    id: z.string(),
  })
  .nullable();

export const GetMusicianEventsInputSchema = GetDetailsInputSchema;
export const GetMusicianEventsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
);

export const GetRelatedMusiciansInputSchema = IDInputSchema;
export const GetRelatedMusiciansOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
);

export const CreateMusicianInputSchema = CreatePerformerSchema.extend({
  groups: z.array(z.object({ id: z.string() })).optional(),
});
export const CreateMusicianOutputSchema = z.object({
  id: z.string(),
});

export const ClaimMusicianInputSchema = ClaimAccountSchema.merge(
  z.object({
    data: CreateMusicianInputSchema.optional(),
  }),
);
export const ClaimMusicianOutputSchema = z.object({});
