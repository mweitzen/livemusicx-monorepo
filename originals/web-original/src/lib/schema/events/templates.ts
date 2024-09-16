import { z } from "zod";
import { EventInputSchemaBase } from "./shared";

export const CreateEventTemplateInputSchema = EventInputSchemaBase.omit({
  name: true,
  ticketLinks: true,
  dateStart: true,
})
  .partial()
  .extend({
    templateName: z.string().min(2),
    eventName: z.string().optional(),
  });
