import { Column, JoinColumn, ManyToMany, ManyToOne, Relation } from 'typeorm';
import { User } from '../user/base.entity';
// import { UserOwnedResource } from './user-owned';
import { VersionedResource } from '../common';

export class BaseEvent extends VersionedResource {
  // @ManyToOne('User', (account: User) => account.createdEvents)
  createdBy: Relation<User>;

  // @ManyToOne('User', (account: User) => account.eventEdits)
  lastUpdatedBy: Relation<User>;

  /**
   * BASIC INFO
   */
  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  imageUrl?: string;

  /**
   * DATE TIME INFO
   */
  @Column()
  timeDoor?: Date;

  @Column()
  timeStart: Date;

  @Column()
  timeEnd?: Date;

  /**
   * EVENT DETAILS
   */
  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: true })
  isFree: boolean;

  @Column({ default: false })
  isChildFriendly: boolean;

  @Column({ default: false })
  isHoliday: boolean;

  @Column({ default: false })
  ageRestriction: boolean;

  @Column()
  minimumAge?: number;

  @Column({ default: false })
  servesAlcohol: boolean;

  @Column({ default: false })
  servesFood: boolean;

  @Column({ default: false })
  requiresRegistration: boolean;

  @Column()
  registrationLink?: string;

  @Column({ default: false })
  requiresTicket: boolean;
}
