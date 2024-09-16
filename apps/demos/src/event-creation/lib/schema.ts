import { z } from "zod";

const IDFieldArraySchema = z.array(z.object({ id: z.string() }));
const TicketLinksSchema = z.array(
  z.object({ value: z.string().url("Please provide a valid URL") })
);

const PublishEventSchemaBase = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
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
  musicians: IDFieldArraySchema.optional(),
  groups: IDFieldArraySchema.optional(),
  genres: IDFieldArraySchema.optional(),
  keywords: IDFieldArraySchema.optional(),
});

export const PublishEventSchema = PublishEventSchemaBase.refine(
  (schema) =>
    (schema.ageRestriction === undefined && schema.minimumAge === undefined) ||
    (schema.ageRestriction && schema.minimumAge !== undefined) ||
    (!schema.ageRestriction && schema.minimumAge === undefined),
  "If you set an age restriction, you must provide a minimum age."
).refine(
  (schema) =>
    (schema.requiresTicket === undefined && schema.ticketLinks === undefined) ||
    (schema.requiresTicket &&
      schema.ticketLinks !== undefined &&
      schema.ticketLinks.length > 0),
  "If you set an requires ticket, you must provide at least one ticket link."
);

export const SaveEventDraftSchema = z.object({
  id: z.string().optional(),
  data: PublishEventSchemaBase.partial(),
});

export const PublishEventDraftSchema = z.object({
  id: z.string(),
  data: PublishEventSchema,
});

export const CreateEventTemplateSchema = PublishEventSchemaBase.omit({
  name: true,
  ticketLinks: true,
  dateStart: true,
})
  .partial()
  .extend({
    templateName: z.string().min(2),
    eventName: z.string().optional(),
  });
