import { z } from "zod";

import { ProfileType, VenueType } from "./enums";
import {
  EmailSchema,
  URLSchema,
  PhoneNumberSchema,
  IDArraySchema,
  SearchSchema,
  FilterSchema,
  SortSchema,
} from "./shared";

export const SearchAccountsInput = z.object({
  ...SearchSchema,
  ...FilterSchema,
  ...SortSchema,
  type: ProfileType,
});
export const CreateAccountInput = z.object({});
export const GetFeaturedAccountsInput = z.object({
  type: ProfileType,
  location: z.string().optional(),
});

const AccountSchemaBase = {
  name: z.string(),
  about: z.string().optional(),
  avatar: URLSchema.optional(),
  genreIds: IDArraySchema.optional(),
  email: EmailSchema.optional(),
  phone: PhoneNumberSchema.optional(),
  website: URLSchema.optional(),
  canCall: z.boolean().optional(),
  canText: z.boolean().optional(),
  canEmail: z.boolean().optional(),
  socialYouTube: URLSchema.optional(),
  socialFacebook: URLSchema.optional(),
  socialInstagram: URLSchema.optional(),
  socialTwitter: URLSchema.optional(),
};

const NonVenueSchemaBase = {
  basedInId: z.string().optional(),
};

const PerformerSchemaBase = {
  socialSpotify: URLSchema.optional(),
  socialBandcamp: URLSchema.optional(),
};

export const MusicianInputSchema = z.object({
  ...AccountSchemaBase,
  ...NonVenueSchemaBase,
  ...PerformerSchemaBase,
  groupIds: IDArraySchema.optional(),
});

export const GroupInputSchema = z.object({
  ...AccountSchemaBase,
  ...NonVenueSchemaBase,
  ...PerformerSchemaBase,
  memberIds: IDArraySchema.optional(),
});

export const OrganizerInputSchema = z.object({
  ...AccountSchemaBase,
  ...NonVenueSchemaBase,
  phoneInquiries: PhoneNumberSchema.optional(),
  emailInquiries: EmailSchema.optional(),
});

export const VenueInputSchema = z
  .object({
    ...AccountSchemaBase,
    type: VenueType,
    keywordIds: IDArraySchema.optional(),
    ageRestriction: z.boolean().optional().default(false),
    servesAlcohol: z.boolean().optional(),
    servesFood: z.boolean().optional(),
    minimumAge: z.number().optional(),
    phoneBooking: PhoneNumberSchema.optional(),
    emailBooking: EmailSchema.optional(),
    businessOpenTable: URLSchema.optional(),
    businessGoogle: URLSchema.optional(),
    businessTripAdvisor: URLSchema.optional(),
    businessYelp: URLSchema.optional(),
    addressShort: z.string(),
    addressLong: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string().optional(),
    streetNumber: z.string(),
    street: z.string(),
    unit: z.string().optional(),
    zipcode: z.number(),
  })
  .refine(
    (schema) =>
      (schema.ageRestriction === undefined &&
        schema.minimumAge === undefined) ||
      (schema.ageRestriction && schema.minimumAge !== undefined) ||
      (!schema.ageRestriction && schema.minimumAge === undefined)
  );
