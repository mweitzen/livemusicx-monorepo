import { ChildEntity, OneToMany } from 'typeorm';
import { User } from './base.entity';
import { UserRole } from '../../enums/user-role.enum';
import { VenueAccount } from '../account/base/account.entity';

@ChildEntity(UserRole.VENUE)
export class VenueUser extends User {
  @OneToMany(() => VenueAccount, (account) => account.managedBy)
  managedAccounts: VenueAccount[];
}
