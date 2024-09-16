import { Entity, ManyToMany } from 'typeorm';
import { Tag } from '../common/tag.entity';
import { Venue } from '../account';

@Entity()
export class VenueKeyword extends Tag {
  @ManyToMany(() => Venue, (venue) => venue.keywords)
  venues: Venue[];
}
