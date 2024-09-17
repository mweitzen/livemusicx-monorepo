import { Entity } from 'typeorm';
import { Tag } from './tag.entity';
// import { Venue } from '../account';

@Entity()
export class VenueKeyword extends Tag {
  // @ManyToMany(() => Venue, (venue) => venue.keywords)
  // venues: Venue[];
}
