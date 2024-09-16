import { ChildEntity, OneToMany } from 'typeorm';
import { User } from './base.entity';
import { UserRole } from '../../enums/user-role.enum';
import { MusicianAccount } from '../account/base/account.entity';

@ChildEntity(UserRole.PERFORMER)
export class PerformerUser extends User {
  @OneToMany(() => MusicianAccount, (account) => account.managedBy, {
    eager: true,
  })
  managedAccounts: MusicianAccount[];
}
