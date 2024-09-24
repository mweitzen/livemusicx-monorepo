import { z } from "zod";

export const __PLACEHOLDER__ = z.object({}).optional();

export const CreateKeywordInput = z.object({ name: z.string() });
