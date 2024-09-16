import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppConfigService } from '@app/config/config.service';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { MESSAGE_BROKER } from '@app/constants';

@Module({
  imports: [
    /**
     * Auth Modules
     */
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: AppConfigService) => ({
        global: true,
        secret: configService.getJwtSecret(),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [AppConfigService],
    }),

    /**
     * Messaging Module
     */
    ClientsModule.register([
      {
        name: MESSAGE_BROKER,
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    /**
     * Passport Strategies
     */
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
