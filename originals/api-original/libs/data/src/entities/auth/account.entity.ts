import {
  Column,
  Entity,
  Relation,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Credentials } from './credentials.entity';
import { AuthMetadata } from './common.entity';
import { UserSession } from './session.entity';
import { User } from '../user/base.entity';
import { UserRole } from '../../enums/user-role.enum';

@Entity()
export class AuthAccount extends AuthMetadata {
  @OneToOne(() => User, (user) => user.authAccount)
  @JoinColumn()
  user: Relation<User>;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PUBLIC,
  })
  role: UserRole;

  @OneToMany(() => Credentials, (credentials) => credentials.account)
  credentials: Relation<Credentials>[];

  @OneToMany(() => UserSession, (session) => session.account)
  sessions: Relation<UserSession>[];
}
