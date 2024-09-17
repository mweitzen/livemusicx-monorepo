import {
  Entity,
  Column,
  ManyToMany,
  OneToOne,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { MusicianAccount } from './base/account.entity';
import { Performer } from './base/performer.class';
import { Band } from './band.entity';
import { PublishedEvent } from '../event';

@Entity()
export class Musician extends Performer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => MusicianAccount, (account) => account.musician)
  @JoinTable()
  account: MusicianAccount;

  @ManyToMany(() => Band, (band) => band.members)
  @ApiProperty()
  bands: Band;

  @Column()
  instruments: string;

  @ManyToMany(() => PublishedEvent, (event) => event.musicians)
  events: PublishedEvent[];
}
