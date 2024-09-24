import { z } from "zod";

export const URLSchema = z.string().url("Please provide a full, valid URL");

export const EmailSchema = z
  .string()
  .email("Please provide a valid email address");

export const PhoneNumberSchema = z
  .string()
  .regex(
    new RegExp("^(\\+0?1\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$"),
    "Not passing regex"
  )
  .min(10)
  .transform((val) => (val ? val.replace(/\D/g, "") : undefined));

export const IDArraySchema = z.array(z.object({ id: z.string() }));

const DEFAULT_PAGE = 1;
const DEFAULT_TAKE = 20;

export const SearchSchemaBase = {
  query: z.string().optional(),
  page: z.number().optional().default(DEFAULT_PAGE),
  take: z.number().optional().default(DEFAULT_TAKE),
};

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

export const VenueType = z.enum(["VENUE", "THEATER"]);
export const StageType = z.enum(["STAGE", "ROOM", "AREA"]);

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
