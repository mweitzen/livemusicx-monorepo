import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { CoreAuthService } from '../core.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: CoreAuthService) {
    super({} satisfies IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<any> {
    return this.authService.validate(username, password);
  }
}
