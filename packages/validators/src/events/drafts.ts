import { z } from "zod";

import { EventInputSchemaBase } from "./shared";
import { PublishEventInputSchema } from "./main";

export const SaveEventDraftInputSchema = z.object({
  id: z.string().optional(),
  data: EventInputSchemaBase.partial(),
});

export const PublishEventDraftInputSchema = z.object({
  id: z.string(),
  data: PublishEventInputSchema,
});
