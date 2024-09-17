import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  TableInheritance,
  OneToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
  Relation,
} from 'typeorm';
import { exampleUser } from '../../examples/user.example';
import { UserRole } from '../../enums/user-role.enum';
import { AuthAccount } from '../auth/account.entity';
import { PublishedEvent } from '../event/published.entity';

@Entity()
@TableInheritance({ column: 'role' })
export class User {
  /**
   * DISCRIMINATOR
   */
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PUBLIC,
  })
  role: UserRole;

  /**
   * METADATA
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: exampleUser.id })
  id: string;

  @CreateDateColumn()
  @ApiProperty({ example: exampleUser.createdAt })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: exampleUser.lastUpdatedAt })
  lastUpdatedAt: Date;

  @Column({ default: true })
  @ApiProperty({ example: true })
  isActive: boolean;

  /**
   * AUTH
   */
  @OneToOne(() => AuthAccount, (account) => account.user, {
    cascade: true,
  })
  authAccount: AuthAccount;

  @Column({ unique: true })
  @ApiProperty({ example: exampleUser.username })
  username: string;

  @Column({ unique: true, nullable: true })
  @ApiProperty({ example: exampleUser.email })
  email: string;

  @Column({ select: false })
  password: string;

  /**
   * BASIC INFO
   */
  @Column()
  @ApiProperty({ example: exampleUser.firstName })
  firstName: string;

  @Column()
  @ApiProperty({ example: exampleUser.lastName })
  lastName: string;

  /**
   * EVENT AUDIENCE
   */
  @ManyToMany(() => PublishedEvent, (event) => event.bookmarkedBy)
  @JoinTable({ name: 'user_bookmarked_events' })
  bookmarkedEvents: Relation<PublishedEvent>[];

  @ManyToMany(() => PublishedEvent, (event) => event.registeredUsers)
  @JoinTable({ name: 'user_registered_events' })
  registeredEvents: Relation<PublishedEvent>[];

  /**
   * EVENTUALLY MOVE TO ADMIN
   */
  @OneToMany(() => PublishedEvent, (event) => event.lastUpdatedBy)
  eventEdits: Relation<PublishedEvent>[];

  @OneToMany(() => PublishedEvent, (event) => event.createdBy)
  createdEvents: Relation<PublishedEvent>[];

  @ManyToMany(() => PublishedEvent, (event) => event.admins)
  administratorOf: Relation<PublishedEvent>[];

  @ManyToMany(() => PublishedEvent, (event) => event.editors)
  editorOf: Relation<PublishedEvent>[];
}
