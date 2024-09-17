import { VenueType } from '../enums/venue-type.enum';
import type { Venue } from '../entities/account/venue.entity';

export const exampleVenue: Venue = {
  id: 'uuid',
  createdAt: new Date('2024-02-23'),
  lastUpdatedAt: new Date(),
  type: VenueType.VENUE,
  capacity: 0,
  servesAlcohol: false,
  servesFood: false,
  ageRestriction: false,
  requiresReservation: false,
  privateAccess: false,
  stages: [],
  affiliatedMusicians: [],
  affiliatedBands: [],
  affiliatedOrganizers: [],
  affiliatedVenues: [],
  isActive: false,
  deactivatedAt: undefined,
  name: '',
  canEmail: false,
  canText: false,
  canCall: false,
  version: 0,
  slug: '',
};
