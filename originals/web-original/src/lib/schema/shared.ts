import { z } from "zod";

export const NoInputSchema = z.void();

export const IDInputSchema = z.object({ id: z.string() });
export const IDArraySchema = z.array(z.object({ id: z.string() }));
export const SlugInputSchema = z.object({ slug: z.string() });

export const SimpleSearchSchema = z.object({ query: z.string().optional() });

export const PaginationSchema = z
  .object({
    page: z.number().optional().default(1),
    take: z.number().optional().default(20),
  })
  .optional();

export const GetDetailsInputSchema = z
  .object({ id: z.string().optional().default(""), slug: z.string().optional() })
  .refine(({ id, slug }) => !!id || id === "" || !!slug, {
    message: "Either an ID or a Slug must be provided to retrieve details.",
  });

export const GetChildrenInputSchema = z.object({
  id: z.string(),
  page: z.number().optional().default(1),
  take: z.number().optional().default(20),
  query: z.string().optional(),
});

export const GetChildrenInputShape = {
  id: z.string(),
  page: z.number().optional().default(1),
  take: z.number().optional().default(20),
  query: z.string().optional(),
};

export const PaginationShape = {
  page: z.number().optional().default(1),
  take: z.number().optional().default(20),
};

export const defaultPaginationValues = {
  page: 1,
  take: 20,
};

export const groupSizes = z.enum([
  "small", // 2-4
  "medium", // 5-8
  "large", // 9+
]);

export const SearchSchemaBase = z.object({
  page: z.number().min(1).optional().default(1),
  take: z.number().min(1).optional().default(20),
  query: z.string().optional(), // searchs name / description, + keywords
  regionId: z.string().optional(),
  cities: z.array(z.string()).optional(),
  neighborhoods: z.array(z.string()).optional(),
  dateStart: z.date().optional(),
  dateEnd: z.date().optional(),
  genres: z.array(z.string()).optional(),
  favorites: z.boolean().optional(), // off, include, exclude
});
