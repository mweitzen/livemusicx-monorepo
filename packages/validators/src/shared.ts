import { z } from "zod";

/**
 * Basic String Schemas
 *
 */
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

/**
 * Search Schema
 *
 */
const DEFAULT_PAGE = 1;
const DEFAULT_TAKE = 20;

export const SearchSchema = {
  query: z.string().optional(),
  page: z.number().default(DEFAULT_PAGE),
  take: z.number().default(DEFAULT_TAKE),
};
export const SearchSchemaDefaults = {
  page: DEFAULT_PAGE,
  take: DEFAULT_TAKE,
};

/**
 * Filter Schema
 *
 */
export const FilterSchema = {
  regionId: z.string().optional(),
  cityIds: z.array(z.string()).optional(),
  neighborhoodIds: z.array(z.string()).optional(),
  dateStart: z.date().optional(),
  dateEnd: z.date().optional(),
  genres: z.array(z.string()).optional(),
};

/**
 * Sort Schema
 *
 */
export const SortSchema = {};

/**
 * Get Details Input
 *
 */
export const GetDetailsInput = z
  .object({
    id: z.string().optional(),
    slug: z.string().optional(),
  })
  .refine(({ id, slug }) => !!id || !!slug, {
    message: "Either an ID or a Slug must be provided to retrieve details.",
  });
