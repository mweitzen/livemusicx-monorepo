import { ChildEntity } from 'typeorm';
import { User } from './base.entity';
import { UserRole } from '../../enums/user-role.enum';

@ChildEntity(UserRole.ASSOCIATE)
export class AssociateUser extends User {}
