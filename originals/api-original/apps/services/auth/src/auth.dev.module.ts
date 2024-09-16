import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CoreAuthService } from './core.service';
import { AuthController } from './auth.controller';
import { MESSAGE_BROKER } from '@app/constants';

import { AuthAccount, Credentials, UserSession } from '@app/data/entities/auth';
import { CredentialsService } from './services/credentials.service';
import { AccountService } from './services/account.service';
import { SessionsService } from './services/sessions.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthAccount, Credentials, UserSession]),
    ClientsModule.register([
      {
        name: MESSAGE_BROKER,
        transport: Transport.TCP,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: 'SECRET',
    }),
    PassportModule,
  ],
  providers: [
    LocalStrategy,
    CoreAuthService,
    AccountService,
    CredentialsService,
    SessionsService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
