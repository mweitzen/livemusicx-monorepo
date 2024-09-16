import { ManyToMany } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Musician } from '../account/musician.entity';
import { Band } from '../account/band.entity';
import { Venue } from '../account/venue.entity';
import { Organizer } from '../account/organizer.entity';
import { Stage } from '../account/stage.entity';
import { PublishedEvent } from './published.entity';
import { EventKeyword } from '../tags/event-keyword.entity';
import { Genre } from '../tags/genre.entity';

export class EventDraft extends PartialType(
  OmitType(PublishedEvent, [
    'bookmarkedBy',
    'registeredUsers',
    'status',
    'timeStartPrevious',
  ]),
) {
  /**
   * TAGS
   */
  @ManyToMany(() => Genre, (genre) => genre.eventDrafts)
  genres: Genre[];

  @ManyToMany(() => EventKeyword, (keyword) => keyword.eventDrafts)
  keywords: EventKeyword[];

  /**
   * EVENT LOCATION
   */
  // @ManyToOne(() => Venue)
  venue?: Venue;

  // @ManyToOne(() => Stage)
  stage?: Stage;

  /**
   * EVENT PARTICIPANTS
   */
  // @ManyToMany(() => Musician)
  musicians: Musician[];

  // @ManyToMany(() => Band)
  bands: Band[];

  // @ManyToOne(() => Organizer)
  organizer?: Organizer;
}
