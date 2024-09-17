import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserPayload } from '../dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({} satisfies IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<UserPayload> {
    return this.authService.validatePassword(username, password);
  }
}
