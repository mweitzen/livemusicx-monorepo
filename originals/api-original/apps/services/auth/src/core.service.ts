import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { LoginType } from '@app/data/enums';
import { User } from '@app/data/entities/user';
import { CreateUserDto, RegisterDto, LoginDto } from '@app/data/dto';
import { MESSAGE_BROKER } from '@app/constants';

import { CredentialsService } from './services/credentials.service';
import { SessionsService } from './services/sessions.service';
import { AccountService } from './services/account.service';

@Injectable()
export class CoreAuthService {
  constructor(
    @Inject(MESSAGE_BROKER)
    private readonly messageBroker: ClientProxy,

    private readonly accountService: AccountService,
    private readonly credentialsService: CredentialsService,
    private readonly sessionsService: SessionsService,
    private readonly jwtService: JwtService,
  ) {}

  async test() {
    return this.accountService.test();
  }
  /**
   * METHOD - Login
   *
   *
   *
   */
  async login(loginDto: LoginDto) {
    switch (loginDto.type) {
      case LoginType.USERNAME:
        // Validate Login
        const credentials = await this.validate(
          loginDto.username,
          loginDto.password,
        );

        // Return User Credentials
        const user = await this.retrieveUser(credentials.id);

        // Sign JWT
        const payload = { sub: user.id, username: user.username };
        const access_token = await this.jwtService.signAsync(payload);

        // Return JWT, User
        return { access_token, user };
        break;
      case LoginType.EMAIL:
        break;
      case LoginType.GOOGLE:
        break;
      default:
        throw new UnauthorizedException();
    }
  }

  /**
   * METHOD - Register
   *
   *
   *
   */
  async register({ username, password, firstName, lastName }: RegisterDto) {
    const ob$ = this.messageBroker.send<User>(
      { cmd: 'get-user-by-username' },
      username,
    );

    const user = await firstValueFrom(ob$).catch((err) => console.log(err));
    if (user) throw new ConflictException('User already exists.');

    const hashedPassword = await this.hashPassword(password);

    return this.messageBroker.send<User, CreateUserDto>(
      { cmd: 'create-user' },
      {
        firstName,
        lastName,
        username,
        password: hashedPassword,
      },
    );
  }

  /**
   * PRIVATE METHOD - Access Token
   *
   *
   *
   */
  private generateAccessToken() {}

  /**
   * PRIVATE METHOD - Refresh Token
   *
   *
   *
   */
  private generateRefreshToken() {}

  /**
   * METHOD - Reset Password
   *
   *
   *
   */
  async resetPassword(username: string) {
    return `Update password for: ${username}`;
  }

  /**
   * METHOD - Validate Password
   *
   *
   *
   */
  async validate(username: string, password: string) {
    // Send message for user: id, password
    const ob$ = this.messageBroker.send<Pick<User, 'id' | 'password'>>(
      { cmd: 'get-user-password' },
      username,
    );

    // Check for user result
    const user = await firstValueFrom(ob$).catch((err) => console.log(err));
    if (!user) throw new UnauthorizedException('Username Invalid');

    // Validate password
    const validLogin = await bcrypt.compare(password, user.password);
    if (!validLogin) throw new UnauthorizedException('Password is incorrect.');

    // Return {id, password}
    return user;
  }

  /**
   * PRIVATE METHOD - Retrieve User
   *
   *
   *
   */
  private async retrieveUser(id: string) {
    const ob$ = this.messageBroker.send<User>({ cmd: 'get-user' }, id);

    const user = await firstValueFrom(ob$).catch((err) => console.log(err));
    if (!user) throw new NotFoundException('Error retrieving user');

    return user;
  }

  /**
   * PRIVATE METHOD - Hash Passowrd
   *
   *
   *
   */
  private hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
}
