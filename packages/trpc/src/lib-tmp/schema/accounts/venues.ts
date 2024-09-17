import { z } from "zod";
import { VenueType, StageType } from "@repo/db/v1";

import { CreateAccountSchema } from "./shared";
import {
  GetDetailsInputSchema,
  NoInputSchema,
  SearchSchemaBase,
  defaultPaginationValues,
} from "../../schema";

export const GetAllVenuesInputSchema = SearchSchemaBase.extend({
  venueTypes: z.array(z.nativeEnum(VenueType)).optional(),
  servesAlcohol: z.boolean().optional(), // off, include, exclude
  servesFood: z.boolean().optional(), // off, include, exclude
  minimumAge: z.number().optional(),
})
  .optional()
  .default(defaultPaginationValues);
export const GetAllVenuesOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  })
);

export const GetVenueDetailsInputSchema = GetDetailsInputSchema;
export const GetVenueDetailsOutputSchema = z
  .object({
    id: z.string(),
  })
  .nullable();

export const GetVenueEventsInputSchema = GetDetailsInputSchema;
export const GetVenueEventsOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  })
);

export const GetVenueQuickViewInputSchema = NoInputSchema;
export const GetVenueQuickViewOutputSchema = z.array(
  // z.object({
  //   id: z.string(),
  //   name: z.string(),
  //   slug: z.string(),
  // })
  z.any()
);

export const CreateVenueBaseSchema = CreateAccountSchema.extend({
  type: z.nativeEnum(VenueType),
  phone: z.string(),
  website: z.string().optional(),
  phoneBooking: z.string().optional(),
  emailBooking: z.string().optional(),
  businessYelp: z.string().url("Please provide a full, valid URL").optional(),
  businessTripAdvisor: z
    .string()
    .url("Please provide a full, valid URL")
    .optional(),
  businessGoogle: z.string().url("Please provide a full, valid URL").optional(),
  businessOpenTable: z
    .string()
    .url("Please provide a full, valid URL")
    .optional(),
  servesAlcohol: z.boolean().optional().default(false),
  servesFood: z.boolean().optional().default(false),
  addressLong: z.string(),
  streetNumber: z.string(),
  unit: z.string().optional(),
  street: z.string(),
  neighborhood: z.string().optional(),
  zipcode: z.number(),
  city: z.string(),
  state: z.string(),
  stages: z
    .array(z.object({ name: z.string(), type: z.nativeEnum(StageType) }))
    .optional()
    .default([{ name: "Main Stage", type: "STAGE" }]),
});

export const CreateVenueInuptSchema = CreateVenueBaseSchema.extend({
  ageRestriction: z.boolean().optional().default(false),
  minimumAge: z.number().optional(),
  // social accounts etc.
}).refine(
  (schema) =>
    (schema.ageRestriction === undefined && schema.minimumAge === undefined) ||
    (schema.ageRestriction && schema.minimumAge !== undefined) ||
    (!schema.ageRestriction && schema.minimumAge === undefined)
);

export const CreateVenueOutputSchema = z.object({
  id: z.string(),
});

// const createUnclaimedVenueSchema = createVenueBase.omit({
//   avatar: true,
//   about: true,
//   stages: true,
// });

export const ClaimVenueInputSchema = CreateVenueBaseSchema.omit({
  addressLong: true,
  streetNumber: true,
  unit: true,
  street: true,
  neighborhood: true,
  zipcode: true,
  city: true,
  state: true,
})
  .extend({
    id: z.string(),
    ageRestriction: z.boolean().optional().default(false),
    minimumAge: z.number().optional(),
    // social accounts etc.
  })
  .refine(
    (schema) =>
      (schema.ageRestriction === undefined &&
        schema.minimumAge === undefined) ||
      (schema.ageRestriction && schema.minimumAge !== undefined) ||
      (!schema.ageRestriction && schema.minimumAge === undefined)
  );
