import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';

import { BaseEvent } from './base.entity';
import { EventStatus } from '../../enums/event-status.enum';
import { EventKeyword } from '../tags/event-keyword.entity';
import { User } from '../user/base.entity';
import { Genre } from '../tags/genre.entity';
import { Band } from '../account/band.entity';
import { Venue } from '../account/venue.entity';
import { Stage } from '../account/stage.entity';
import { Musician } from '../account/musician.entity';
import { Organizer } from '../account/organizer.entity';

@Entity()
export class PublishedEvent extends BaseEvent {
  /**
   * PRIVILEGES
   */
  // @ManyToMany(() => User, (user) => user.administratorOf)
  // @JoinTable()
  admins: User[];

  // @ManyToMany(() => User, (user) => user.editorOf)
  // @JoinTable()
  editors: User[];

  /**
   * PUBLISHED SPECIFIC
   */
  @Column({ type: 'enum', enum: EventStatus, default: EventStatus.UNSCHEDULED })
  status: EventStatus;

  @Column()
  timeStartPrevious?: Date;

  ticketLinks?: string[];

  /**
   * TAGS
   */
  @ManyToMany(() => Genre, (genre) => genre.publishedEvents)
  @JoinTable({ name: 'published_event_genres' })
  genres: Genre[];

  @ManyToMany(() => EventKeyword, (keyword) => keyword.publishedEvents)
  @JoinTable({ name: 'published_event_keywords' })
  keywords: EventKeyword[];

  /**
   * EVENT LOCATION
   */
  @ManyToOne(() => Venue, (venue) => venue.events)
  venue: Venue;

  @ManyToOne(() => Stage, (stage) => stage.events)
  stage: Stage;

  /**
   * EVENT PARTICIPANTS
   */
  @ManyToMany(() => Musician, (musician) => musician.events)
  @JoinTable({ name: 'published_event_musicians' })
  musicians: Musician[];

  @ManyToMany(() => Band, (band) => band.events)
  @JoinTable({ name: 'published_event_bands' })
  bands: Band[];

  @ManyToOne(() => Organizer, (organizer) => organizer.events)
  organizer?: Organizer;

  /**
   * EVENT AUDIENCE
   */
  // @ManyToMany(() => User, (user) => user.bookmarkedEvents)
  bookmarkedBy: User[];

  // @ManyToMany(() => User, (user) => user.registeredEvents)
  @JoinTable()
  registeredUsers: User[];
}
