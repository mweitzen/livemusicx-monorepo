import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-oauth2';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      authorizationURL: '',
      clientID: '',
      clientSecret: '',
      tokenURL: '',
    } satisfies StrategyOptions);
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
