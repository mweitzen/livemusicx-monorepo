// import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToMany } from 'typeorm';
import { PublishedEvent } from '../event/published.entity';
import { EventTemplate } from '../event/template.entity';
import { EventDraft } from '../event/draft.entity';
import { Account } from '../account/base/account.entity';
import { Tag } from '../common/tag.entity';

@Entity()
export class Genre extends Tag {
  @ManyToMany(() => Account, (account) => account.genres)
  accounts: Account[];

  @ManyToMany(() => PublishedEvent, (event) => event.genres)
  publishedEvents: PublishedEvent[];

  // @ManyToMany(() => EventDraft, (event) => event.genres)
  eventDrafts: EventDraft[];

  // @ManyToMany(() => EventTemplate, (event) => event.genres)
  eventTemplates: EventTemplate[];

  media: string[];
}
