import { z } from "zod";

import { EventInputSchemaBase } from "./shared";
import { GetDetailsInputSchema, NoInputSchema } from "../shared";

import {
  SearchSchemaBase,
  defaultPaginationValues,
  groupSizes,
} from "../shared";
import { VenueType } from "../accounts/venues";

export const GetEventsQuickViewInputSchema = NoInputSchema;
export const EventCountOutputSchema = z.number().nullable();

export const GetEventDetailsInputSchema = GetDetailsInputSchema;

export const GetUpcomingEventsInputSchema = SearchSchemaBase.extend({
  bookmarked: z.boolean().optional(), // off, include, exclude
  groupSizes: z.array(groupSizes).optional(),
  venueTypes: z.array(VenueType).optional(),
  servesAlcohol: z.boolean().optional(), // off, include, exclude
  servesFood: z.boolean().optional(), // off, include, exclude
  minimumAge: z.number().optional(), // off, include, exclude
  isFree: z.boolean().optional(), // off, include, exclude
  isChildFriendly: z.boolean().optional(), // off, include, exclude
  isHoliday: z.boolean().optional(), // off, include, exclude
})
  .optional()
  .default(defaultPaginationValues);

export const PublishEventInputSchema = EventInputSchemaBase.refine(
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
