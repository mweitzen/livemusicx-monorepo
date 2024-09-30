import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import {
  Inject,
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE_BROKER } from '~/constants';

import { User } from '@prisma/client';
import { CreateUserDto } from '~/resources/users/dto';
import { AccessToken } from './interfaces/access-token.interface';
import {
  ConnectCredentialsDto,
  ForgotPasswordDto,
  InitiateVerificationDto,
  RegisterDto,
  ResetPasswordDto,
  UserPayload,
} from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MESSAGE_BROKER)
    private readonly messageBroker: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Login
   *
   */
  async login(user: UserPayload): Promise<AccessToken> {
    return this.generateAccessToken(user);
  }

  /**
   * Register
   *
   */
  async register({ password, ...registerDto }: RegisterDto) {
    // Retrieve User credentials from user service
    /* TODO: Remove communication between user service */
    const ob$ = this.messageBroker.send<User>(
      { cmd: 'get-user-by-username' },
      registerDto.username,
    );

    // Check if user exists or not
    const user = await firstValueFrom(ob$).catch((err) => console.log(err));
    if (user) throw new ConflictException('User already exists.');

    // Hash password for safer storage
    const hashedPassword = await this.hashPassword(password);

    // Ask User Service to create new user
    return this.messageBroker.send<User, CreateUserDto>(
      { cmd: 'create-user' },
      {
        ...registerDto,
        password: hashedPassword,
      },
    );
  }

  /**
   * Forgot Password
   *
   */
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return `Initiate forgotten password for: ${forgotPasswordDto.username}`;
  }

  /**
   * Reset Password
   *
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return `Update password for: ${resetPasswordDto.username}`;
  }

  /**
   * Validate Password
   *
   */
  async validatePassword(username: string, password: string) {
    // Send message for user: id, password
    /* TODO: Remove */
    const ob$ = this.messageBroker.send<UserPayload>(
      { cmd: 'get-user-password' },
      username,
    );

    // Check for user result
    const user = await firstValueFrom(ob$).catch((err) => console.log(err));
    if (!user) throw new UnauthorizedException('Username Invalid');

    // Validate password
    const validLogin = await bcrypt.compare(password, user.password);
    if (!validLogin) throw new UnauthorizedException('Password is incorrect.');

    delete user.password;

    return user;
  }

  /**
   * Initate Verification Flow
   *
   */
  async initiateVerification(initiateVerificationDto: InitiateVerificationDto) {
    return `Initiate verification flow for user id: ${initiateVerificationDto.userId}`;
  }

  /**
   * Connect Credentials
   *
   */
  async connectCredentials(connectCredentialsDto: ConnectCredentialsDto) {
    return `Initiate verification flow for user id: ${connectCredentialsDto.id}`;
  }

  /**
   * PRIVATE - Hash Passowrd
   *
   */
  private hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
  /**
   * PRIVATE - Generate Access Token
   *
   */
  private generateAccessToken(user: UserPayload) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * PRIVATE - Generate Refresh Token
   *
   */
  private generateRefreshToken() {}
}
