import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request as RequestType } from 'express';
import {
  Body,
  Post,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  InitiateVerificationDto,
  RegisterDto,
  ResetPasswordDto,
  UsernameLoginDto,
  ForgotPasswordDto,
  ConnectCredentialsDto,
} from './dto';
import { AccessToken } from './interfaces/access-token.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login
   *
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UsernameLoginDto })
  async login(@Request() req: RequestType): Promise<AccessToken> {
    return this.authService.login(req.user);
  }

  /**
   * Register
   *
   */
  @Post('register')
  @ApiCreatedResponse()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Refresh Token
   *
   */
  @Post('refresh')
  @ApiCreatedResponse()
  refreshToken(@Request() req: RequestType) {
    console.log(req.user);
    return `Refresh User Token`;
  }

  /**
   * Forgot Password
   *
   */
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  /**
   * Reset Password
   *
   */
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  /**
   * Send Verification
   *
   */
  @Post('send-verification')
  sendVerificationCode(
    @Body() initiateVerificationDto: InitiateVerificationDto,
  ) {
    return this.authService.initiateVerification(initiateVerificationDto);
  }

  /**
   * Connect Credentials
   *
   */
  @Post('connect')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  connectCredentials(@Body() connectCredentialsDto: ConnectCredentialsDto) {
    return this.authService.connectCredentials(connectCredentialsDto);
  }
}
