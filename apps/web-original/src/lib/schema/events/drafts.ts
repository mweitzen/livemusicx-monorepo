import { z } from "zod";

import { EventInputSchemaBase } from "@/lib/schema/events/shared";
import { PublishEventInputSchema } from "@/lib/schema/events/main";

export const SaveEventDraftInputSchema = z.object({
  id: z.string().optional(),
  data: EventInputSchemaBase.partial(),
});

export const PublishEventDraftInputSchema = z.object({
  id: z.string(),
  data: PublishEventInputSchema,
});
