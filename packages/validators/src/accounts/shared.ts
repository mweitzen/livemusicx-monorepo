import { z } from "zod";
import { IDArraySchema } from "../shared";

// regular expression matching phone number no matter how it is formatted as long as it is 10 digits generally grouped as 3 digits, 3 digits, 4 digits, but can also have no spaces at all
// const phoneNumberRegex = new RegExp("^(\\+\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$");

function stringOrNull(val: unknown) {
  return val === "" || val === undefined ? null : val;
}

const URLSchema = z.preprocess(
  stringOrNull,
  z.string().url("Please provide a full, valid URL").nullable()
);

const EmailSchema = z.preprocess(
  stringOrNull,
  z.string().email("Please provide a valid email address").nullable()
);

const PhoneNumberSchema = z.preprocess(
  stringOrNull,
  z
    .string()
    .regex(
      new RegExp("^(\\+0?1\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$"),
      "Not passing regex"
    )
    .min(10)
    .nullable()
    .transform((val) => (val ? val.replace(/\D/g, "") : null))
);

const NullableString = z.preprocess(stringOrNull, z.string().nullable());

export const ContactSchemaShape = {
  canCall: z.boolean().default(true),
  canText: z.boolean().default(false),
  canEmail: z.boolean().default(false),
  phone: PhoneNumberSchema,
  email: EmailSchema,
};

export const SocialSchemaShape = {
  website: URLSchema,
  socialYouTube: URLSchema,
  socialFacebook: URLSchema,
  socialInstagram: URLSchema,
  socialTwitter: URLSchema,
};

export const CreateAccountSchema = z.object({
  name: z.string(),
  avatar: URLSchema,
  about: NullableString,
  genres: IDArraySchema.default([]),
  ...ContactSchemaShape,
  ...SocialSchemaShape,
});

export const CreatePerformerSchema = CreateAccountSchema.extend({
  basedInId: z.string().optional(),
  socialSpotify: URLSchema,
  socialBandcamp: URLSchema,
});

export const ClaimAccountSchema = z.object({
  id: z.string(),
});

export const defaultContactValues = {
  canCall: true,
  canText: false,
  canEmail: false,
  phone: "",
  email: "",
};

export const defaultSocialValues = {
  website: "",
  socialYouTube: "",
  socialFacebook: "",
  socialInstagram: "",
  socialTwitter: "",
};

export const defaultAccountValues = {
  name: "",
  avatar: "",
  about: "",
  genres: [],
  ...defaultContactValues,
  ...defaultSocialValues,
};

export const defaultPerformerValues = {
  basedInId: "",
  socialSpotify: "",
  socialBandcamp: "",
  ...defaultAccountValues,
};
