import {
  Entity,
  Column,
  ManyToMany,
  OneToOne,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BandAccount } from './base/account.entity';
import { Performer } from './base/performer.class';
import { Musician } from './musician.entity';
import { PublishedEvent } from '../event';

@Entity()
export class Band extends Performer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => BandAccount, (account) => account.band)
  @JoinTable()
  account: BandAccount;

  @ManyToMany(() => Musician, (musician) => musician.bands)
  @ApiProperty()
  members: Musician[];

  @Column()
  bandSpecific?: string;

  @ManyToMany(() => PublishedEvent, (event) => event.bands)
  events: PublishedEvent[];
}
