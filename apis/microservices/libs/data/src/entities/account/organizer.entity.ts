import {
  Entity,
  Column,
  OneToOne,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { OrganizerAccount } from './base/account.entity';
import { Business } from './base/business.class';
import { PublishedEvent } from '../event';

@Entity()
export class Organizer extends Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => OrganizerAccount, (account) => account.organizer)
  @JoinTable()
  account: OrganizerAccount;

  @Column()
  @ApiProperty()
  experienceSummary?: string;

  @Column()
  @ApiProperty()
  services: string;

  @ManyToMany(() => PublishedEvent, (event) => event.organizer)
  events: PublishedEvent[];
}
