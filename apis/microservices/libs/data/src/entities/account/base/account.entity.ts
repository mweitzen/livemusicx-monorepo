import {
  Column,
  Entity,
  OneToOne,
  TableInheritance,
  ChildEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  // OneToMany,
  // ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { VersionedResource } from '../../common/resource.entity';
import { AccountType } from '../../../enums/account-type.enum';
import { Band } from '../band.entity';
import { Venue } from '../venue.entity';
import { Musician } from '../musician.entity';
import { Organizer } from '../organizer.entity';
import { Genre } from '../../tags/genre.entity';
import { OrganizerUser, PerformerUser, VenueUser } from '../../user';
// import { PublishedEvent } from '../../event';

@Entity()
@TableInheritance({ column: 'type' })
export class Account extends VersionedResource {
  /**
   * DISCRIMINATOR
   */
  @Column({
    type: 'enum',
    enum: AccountType,
  })
  type: AccountType;

  /**
   * METADATA
   */
  @Column({ default: true })
  @ApiProperty({ example: true })
  isActive: boolean;

  @Column()
  deactivatedAt: Date;

  /**
   * BASIC INFO
   */
  @Column()
  @ApiProperty({
    description: 'Account name.',
    example: 'Account',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'About account.',
    example: 'About',
  })
  about?: string;

  @Column()
  @ApiProperty({
    description: 'Account avatar url.',
    example: 'https://example.com/image.png',
  })
  avatarUrl?: string;

  @Column()
  @ApiProperty({
    description: 'Account thumbnail image url.',
    example: 'https://example.com/image.png',
  })
  imageUrl?: string;

  @ManyToMany(() => Genre, (genre) => genre.accounts)
  @JoinTable({ name: 'account_genres' })
  @ApiProperty()
  genres: Genre[];

  /**
   * SOCIAL ACCOUNTS
   */
  @Column()
  @ApiProperty()
  websiteUrl?: string;

  @Column()
  @ApiProperty()
  youtubeUrl?: string;

  @Column()
  @ApiProperty()
  facebookUrl?: string;

  @Column()
  @ApiProperty()
  twitterUrl?: string;

  @Column()
  @ApiProperty()
  instagramUrl?: string;

  /**
   * CONTACT
   */
  @Column()
  @ApiProperty()
  canEmail: boolean;

  @Column()
  @ApiProperty()
  canText: boolean;

  @Column()
  @ApiProperty()
  canCall: boolean;

  /**
   * AFFILIATES
   */

  // @ManyToMany(() => Band)
  // affiliatedMusicians: Musician[];

  // @ManyToMany(() => Band)
  // affiliatedBands: Band[];

  // @ManyToMany(() => Organizer)
  // affiliatedOrganizers: Organizer[];

  // @ManyToMany(() => Venue)
  // affiliatedVenues: Venue[];
}

@ChildEntity(AccountType.MUSICIAN)
export class MusicianAccount extends Account {
  @ManyToOne(() => PerformerUser, (user) => user.managedAccounts)
  managedBy: PerformerUser;

  @OneToOne(() => Musician, (musician) => musician.account, {
    eager: true,
  })
  @JoinColumn()
  musician: Musician;
}

@ChildEntity(AccountType.BAND)
export class BandAccount extends Account {
  @ManyToOne(() => PerformerUser, (user) => user.managedAccounts)
  managedBy: PerformerUser;

  @OneToOne(() => Band, (band) => band.account, {
    eager: true,
  })
  @JoinColumn()
  band: Band;
}

@ChildEntity(AccountType.VENUE)
export class VenueAccount extends Account {
  @ManyToOne(() => VenueUser, (user) => user.managedAccounts)
  managedBy: VenueUser;

  @OneToOne(() => Venue, (venue) => venue.account, {
    eager: true,
  })
  @JoinColumn()
  venue: Venue;
}

@ChildEntity(AccountType.ORGANIZER)
export class OrganizerAccount extends Account {
  @ManyToOne(() => OrganizerUser, (user) => user.managedAccounts)
  managedBy: OrganizerUser;

  @OneToOne(() => Organizer, (organizer) => organizer.account, {
    eager: true,
  })
  @JoinColumn()
  organizer: Organizer;
}
