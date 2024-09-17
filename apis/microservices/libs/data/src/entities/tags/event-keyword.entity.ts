import { Entity, ManyToMany } from 'typeorm';
import { PublishedEvent } from '../event/published.entity';
import { EventTemplate } from '../event/template.entity';
import { EventDraft } from '../event/draft.entity';
import { Tag } from '../common/tag.entity';

@Entity()
export class EventKeyword extends Tag {
  @ManyToMany(() => PublishedEvent, (event) => event.keywords)
  publishedEvents: PublishedEvent[];

  // @ManyToMany(() => EventDraft, (event) => event.keywords)
  eventDrafts: EventDraft[];

  // @ManyToMany(() => EventTemplate, (event) => event.keywords)
  eventTemplates: EventTemplate[];
}
