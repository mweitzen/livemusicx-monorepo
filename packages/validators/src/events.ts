import { z } from "zod";
import {
  FilterSchema,
  IDArraySchema,
  SearchSchema,
  SearchSchemaDefaults,
  SortSchema,
  URLSchema,
} from "./shared";
import { GroupSize, VenueType } from "./enums";

export const SearchEventsInput = z
  .object({
    ...SearchSchema,
    ...FilterSchema,
    ...SortSchema,
    bookmarked: z.boolean().optional(), // off, include, exclude
    favorites: z.boolean().optional(), // off, include, exclude
    groupSizes: z.array(GroupSize).optional(),
    venueTypes: z.array(VenueType).optional(),
    keywords: z.array(z.string()).optional(),
    servesAlcohol: z.boolean().optional(), // off, include, exclude
    servesFood: z.boolean().optional(), // off, include, exclude
    minimumAge: z.number().optional(), // off, include, exclude
    isFree: z.boolean().optional(), // off, include, exclude
    isChildFriendly: z.boolean().optional(), // off, include, exclude
    isHoliday: z.boolean().optional(), // off, include, exclude
  })
  .optional()
  .default(SearchSchemaDefaults);

export const TicketLinkInput = z.object({
  url: URLSchema,
});

export const CreateEventInput = z.object({
  // BASIC INFO
  name: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  description: z.string(),
  imageUrl: z.any(),

  // DATE / TIME
  timeDoor: z.date().min(new Date(), "Event must be in the future.").optional(),
  timeStart: z.date().min(new Date(), "Event must be in the future."),
  timeEnd: z.date().min(new Date(), "Event must be in the future.").optional(),

  // DETAILS
  isPublished: z.boolean(),
  isPrivate: z.boolean(),
  isFree: z.boolean(),
  servesAlcohol: z.boolean(),
  servesFood: z.boolean(),
  isChildFriendly: z.boolean(),
  isHoliday: z.boolean(),
  ageRestriction: z.boolean(),
  minimumAge: z.number().optional(),

  // REGISTRATION / TICKETS
  requiresRsvp: z.boolean(),
  rsvpLink: z.string().optional(),
  requiresTicket: z.boolean(),
  ticketLinks: z.array(TicketLinkInput).optional(),

  // PARTICIPANTS
  venueId: z.string(),
  stageId: z.string(),
  organizerId: z.string().optional(),
  musicianIds: IDArraySchema.optional(),
  bandIds: IDArraySchema.optional(),

  // TAGS
  genreIds: IDArraySchema.optional(),
  keywordIds: IDArraySchema.optional(),
});

export const UpdateEventInput = CreateEventInput.partial();

export const UpdateEventDateInput = z.object({}).optional();

export const UpdateEventParticipantInput = z.object({}).optional();

export const PublishEventInput = CreateEventInput.refine(
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

export const CreateEventTemplateInput = CreateEventInput.omit({
  name: true,
  ticketLinks: true,
})
  .partial()
  .extend({
    templateName: z.string().min(2),
    eventName: z.string().optional(),
  });
