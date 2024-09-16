import { ChildEntity, OneToMany } from 'typeorm';
import { User } from './base.entity';
import { UserRole } from '../../enums/user-role.enum';
import { OrganizerAccount } from '../account/base/account.entity';

@ChildEntity(UserRole.ORGANIZER)
export class OrganizerUser extends User {
  @OneToMany(() => OrganizerAccount, (account) => account.managedBy)
  managedAccounts: OrganizerAccount[];
}
