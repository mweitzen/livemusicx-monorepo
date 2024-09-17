import { AppConfigService } from '@app/config/config.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

import { UserPayload } from '../dto';
import { JWT } from '../interfaces/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecret(),
    });
  }

  async validate(payload: JWT): Promise<UserPayload> {
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}
