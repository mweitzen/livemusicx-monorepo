import { z } from "zod";

const ContactSchema = {
  canEmail: z.boolean().optional(),
  canCall: z.boolean().optional(),
  canText: z.boolean().optional(),
  phone: z.string().optional(),
  email: z.string().email("Please provide a valid email address").optional(),
};

const SocialSchema = {
  website: z.string().url("Please provide a full, valid URL").optional(),
  socialYouTube: z.string().url("Please provide a full, valid URL").optional(),
  socialFacebook: z.string().url("Please provide a full, valid URL").optional(),
  socialInstagram: z.string().url("Please provide a full, valid URL").optional(),
  socialTwitter: z.string().url("Please provide a full, valid URL").optional(),
};

const CreateAccountSchema = z.object({
  name: z.string().min(2, "Please provide a name").max(100),
  avatar: z.string().optional(),
  about: z.string().optional(),
  genres: z.array(z.object({ id: z.string() })).optional(),
  ...ContactSchema,
  ...SocialSchema,
});

const CreatePerformerSchema = CreateAccountSchema.extend({
  basedInId: z.string().optional(),
  socialSpotify: z.string().url("Please provide a full, valid URL").optional(),
  socialBandcamp: z.string().url("Please provide a full, valid URL").optional(),
});

export const CreateMusicianSchema = CreatePerformerSchema.extend({
  groups: z.array(z.object({ id: z.string() })).optional(),
});

export const CreateGroupSchema = CreatePerformerSchema.extend({
  members: z.array(z.object({ id: z.string() })).optional(),
});

export const CreateOrganizerSchema = CreateAccountSchema.extend({
  operatesInId: z.string().optional(),
});
