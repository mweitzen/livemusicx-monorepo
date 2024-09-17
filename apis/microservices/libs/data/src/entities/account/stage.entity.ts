import { Column, Entity, ManyToOne } from 'typeorm';
import { PhysicalSpace } from '../../interfaces/physical-space.interface';
import { VersionedResource } from '../common/resource.entity';
import { StageType } from '../../enums';
import { Venue } from './venue.entity';
import { PublishedEvent } from '../event';

@Entity()
export class Stage extends VersionedResource implements PhysicalSpace {
  @Column()
  capacity: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: StageType, default: StageType.AREA })
  type: StageType;

  @Column()
  imageUrl: string;

  @Column()
  description: string;

  @ManyToOne(() => Venue, (venue) => venue.stages)
  venue: Venue;

  @ManyToOne(() => PublishedEvent, (event) => event.stage)
  events: PublishedEvent[];
}
