import { Column, Entity, ManyToOne } from 'typeorm';
import { AuthAccount } from './account.entity';
import { AuthMetadata } from './common.entity';

@Entity()
export class UserSession extends AuthMetadata {
  @ManyToOne(() => AuthAccount, (account) => account.sessions)
  account: AuthAccount;

  @Column({ unique: true })
  sessionToken: string;

  @Column()
  expiresAt: Date;
}
