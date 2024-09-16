import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';

import { VenueAccount } from './base/account.entity';
import { Business } from './base/business.class';
import { Stage } from './stage.entity';
import { VenueType } from '../../enums/venue-type.enum';
import { PhysicalSpace } from '../../interfaces/physical-space.interface';
import { VenueKeyword } from '../tags/venue-keyword.entity';
import { PublishedEvent } from '../event';

@Entity()
export class Venue extends Business implements PhysicalSpace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => VenueAccount, (account) => account.venue)
  @JoinTable()
  account: VenueAccount;

  @OneToMany(() => Stage, (stage) => stage.venue)
  stages: Stage[];

  @ManyToMany(() => VenueKeyword, (keyword) => keyword.venues)
  @JoinTable({ name: 'tagged_venue_keywords' })
  keywords: VenueKeyword[];

  /**
   * VENUE DETAILS
   */
  @Column({
    type: 'enum',
    enum: VenueType,
    default: VenueType.VENUE,
  })
  type: VenueType;

  @Column()
  capacity: number;

  @Column()
  servesAlcohol: boolean;

  @Column()
  servesFood: boolean;

  @Column()
  ageRestriction: boolean;

  @Column()
  minimumAge?: number;

  @Column()
  requiresReservation: boolean;

  @Column()
  reservationLink?: string;

  @Column()
  privateAccess: boolean;

  @OneToMany(() => PublishedEvent, (event) => event.venue)
  events: PublishedEvent[];
}

// **Venue Schema:**

// * **name (string):** Name of the venue.
// * **description (string, optional):** Brief description of the venue's atmosphere and offerings.
// * **images (array of strings):** URLs or file paths for multiple venue images.
// * **location (object):**
//     * **address (string):** Full address of the venue.
//     * **city (string):** City where the venue is located.
//     * **state (string):** State where the venue is located.
//     * **zipCode (string):** Zip code of the venue.
//     * **latitude (number):** Geographical latitude coordinate.
//     * **longitude (number):** Geographical longitude coordinate.
// * **contact (object, optional):**
//     * **phone (string):** Phone number of the venue.
//     * **website (string):** Website URL of the venue.
// * **socialMedia (object, optional):**
//     * **facebook (string):** Link to the venue's Facebook page.
//     * **twitter (string):** Link to the venue's Twitter page.
//     * **instagram (string):** Link to the venue's Instagram page.
// * **capacity (integer):** Maximum occupancy of the venue.
// * **typicalShowLength (integer, optional):** Average duration of events at the venue.
// * **parking (string, optional):** Description of parking options (e.g., valet, lot, street parking).
// * **publicTransportation (string, optional):** Description of public transportation access near the venue.
// * **paymentMethods (array of strings):** Accepted payment methods (e.g., credit card, cash).
// * **accessibility (object, optional):**
//     * **accessibleParking (boolean):** Indicates availability of accessible parking.
//     * **restroomAccessibility (boolean):** Indicates availability of accessible restrooms.
//     * **otherAccessibilityFeatures (string, optional):** Text field for listing additional accessibility features.
// * **dressCode (string, optional):** Description of the typical dress code.
// * **amenities (array of strings, optional):** Amenities offered by the venue (e.g., Wi-Fi, outdoor seating).
// * **ageRestriction (boolean):** Indicates if there's an age restriction for entry.
// * **minimumAge (integer, optional):** Minimum age requirement for entry (if applicable).
// * **coverCharge (object, optional):**
//     * **enabled (boolean):** Indicates if cover charge applies.
//     * **amount (number, optional):**  Amount of the cover charge (if applicable).
//     * **frequency (string, optional):** Frequency of cover charge (e.g., daily, specific nights).
// * **drinkMinimum (object, optional):**
//     * **enabled (boolean):** Indicates if drink minimum applies.
//     * **amount (number, optional):**  Amount of the drink minimum (if applicable).
// * **ticketing (object, optional):**
//     * **enabled (boolean):** Indicates if the venue uses ticketing for events.
//     * **link (string, optional):** Link to the venue's ticketing platform (if applicable).
// * **backline (object, optional):**
//     * **drums (array of strings, optional):** List of available drum kits or components.
//     * **guitars (array of strings, optional):** List of available guitars or amplifiers.
//     * **basses (array of strings, optional):** List of available bass guitars or amplifiers.
//     * **keyboards (array of strings, optional):** List of available keyboards or synthesizers.
//     * **other (string, optional):** Text field for listing any other backline equipment.
// * **paSystem (object, optional):**
//     * **description (string, optional):** Description of the PA system (e.g., size, capacity).
//     * **monitors (string, optional):** Description of available stage monitors.
//     * **mics (array of strings, optional):** List of available microphones.
