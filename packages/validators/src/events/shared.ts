import { z } from "zod";
import { IDArraySchema } from "../shared";

export const TicketLinkSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
});
export const TicketLinksSchema = z.array(TicketLinkSchema);

export const EventInputSchemaBase = z.object({
  name: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  description: z.string(),
  image: z.any(),
  dateStart: z.date().min(new Date(), "Event must be in the future."),
  timeDoor: z.string().optional(),
  timeStart: z.string(),
  timeEnd: z.string().optional(),
  isPrivate: z.boolean(),
  isFree: z.boolean(),
  servesAlcohol: z.boolean(),
  servesFood: z.boolean(),
  isChildFriendly: z.boolean(),
  isHoliday: z.boolean(),
  ageRestriction: z.boolean(),
  minimumAge: z.number().optional(),
  requiresRsvp: z.boolean(),
  rsvpLink: z.string().optional(),
  requiresTicket: z.boolean(),
  venueId: z.string(),
  stageId: z.string(),
  organizerId: z.string().optional(),
  ticketLinks: TicketLinksSchema.optional(),
  musicians: IDArraySchema.optional(),
  groups: IDArraySchema.optional(),
  genres: IDArraySchema.optional(),
  keywords: IDArraySchema.optional(),
});
