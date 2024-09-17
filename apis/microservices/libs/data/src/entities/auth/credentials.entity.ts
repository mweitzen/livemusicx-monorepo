import { Column, Entity, ManyToOne } from 'typeorm';
import { AuthAccount } from './account.entity';
import { AuthMetadata } from './common.entity';

export enum CredentialsType {
  USERNAME = 'USERNAME',
  EMAIL = 'EMAIL',
  OIDC = 'OIDC',
  OAUTH = 'OAUTH',
}

export enum CredentialsProvider {
  PASSWORD = 'PASSWORD',
  GOOGLE = 'GOOGLE',
}

export enum TokenType {
  BEARER = 'BEARER',
}

@Entity()
export class Credentials extends AuthMetadata {
  /**
   * USER INFO
   */
  @ManyToOne(() => AuthAccount, (user) => user.credentials, {
    orphanedRowAction: 'delete',
  })
  account: AuthAccount;

  /**
   * JWT
   */
  @Column({ type: 'enum', enum: CredentialsType })
  type: CredentialsType;

  @Column()
  accessToken?: string;

  @Column()
  expiresAt?: number;

  @Column()
  refreshToken?: string;

  @Column()
  refreshTokenExpiresIn?: number;

  @Column({ type: 'enum', enum: TokenType })
  tokenType?: string;

  @Column()
  scope?: string;

  @Column()
  idToken?: string;

  @Column()
  sessionState?: string;

  /**
   * TODO: Abstract these to below classes
   */
  @Column({ unique: true })
  username?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column()
  password?: string;

  @Column({ type: 'enum', enum: CredentialsProvider })
  provider: CredentialsProvider;

  @Column()
  providerAccountId: string;

  @Column()
  oauthTokenSecret?: string;

  @Column()
  oauthToken?: string;
}

export class PasswordCredentials extends Credentials {
  @Column({ unique: true })
  username?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column()
  password?: string;
}

export class OAuthCredentials extends Credentials {
  @Column({ type: 'enum', enum: CredentialsProvider })
  provider: CredentialsProvider;

  @Column()
  providerAccountId: string;

  @Column()
  oauthTokenSecret?: string;

  @Column()
  oauthToken?: string;
}
