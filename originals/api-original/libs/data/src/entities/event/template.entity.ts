import { Entity, Column, ManyToMany, ManyToOne } from 'typeorm';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { Band } from '../account/band.entity';

import { Organizer } from '../account/organizer.entity';

import { Genre } from '../tags/genre.entity';
import { EventKeyword } from '../tags/event-keyword.entity';
import { BaseEvent } from './base.entity';
import { Musician, Stage, Venue } from '../account';

@Entity()
export class EventTemplate extends PartialType(BaseEvent) {
  /**
   * TAGS
   */
  @ManyToMany(() => Genre, (genre) => genre.eventTemplates)
  genres: Genre[];

  @ManyToMany(() => EventKeyword, (keyword) => keyword.eventTemplates)
  keywords: EventKeyword[];

  /**
   * TEMPLATE SPECIFIC
   */
  @Column()
  @ApiProperty()
  templateName: string;

  @Column()
  @ApiProperty()
  templateDescription?: string;

  @Column()
  @ApiProperty({ description: 'Duration of event in minutes.' })
  duration?: number;

  /**
   * EVENT LOCATION
   */
  @ManyToOne(() => Venue)
  venue?: Venue;

  @ManyToOne(() => Stage)
  stage?: Stage;

  /**
   * EVENT PARTICIPANTS
   */
  @ManyToMany(() => Musician)
  musicians: Musician[];

  @ManyToMany(() => Band)
  bands: Band[];

  @ManyToOne(() => Organizer)
  organizer?: Organizer;
}
