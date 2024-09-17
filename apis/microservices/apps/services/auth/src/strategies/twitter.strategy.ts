import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOption } from 'passport-twitter';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      callbackURL: '',
      consumerKey: '',
      consumerSecret: '',
    } satisfies IStrategyOption);
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
