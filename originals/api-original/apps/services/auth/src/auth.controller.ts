import {
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RestController } from '@app/decorators';
import { CoreAuthService } from './core.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto, RegisterDto, UsernameLoginDto } from '@app/data/dto';
import { User } from '@app/data/entities/user';

@RestController('')
export class AuthController {
  constructor(private readonly authService: CoreAuthService) {}

  /**
   * Login
   *
   */
  @Post('login')
  @ApiOkResponse({
    type: User,
  })
  @ApiUnauthorizedResponse({
    description: 'Provided password was incorrect.',
    type: UnauthorizedException,
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: UsernameLoginDto,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Register
   *
   */
  @Post('register')
  @ApiCreatedResponse({ type: User })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Forgot Password
   *
   */
  @UseGuards(AuthGuard)
  @Post('forgot-password')
  @ApiBearerAuth('Access Token')
  forgotPassword(@Request() req) {
    return req.user;
  }

  /**
   * Reset Password
   *
   */
  @UseGuards(AuthGuard)
  @Post('reset-password')
  @ApiBearerAuth('Access Token')
  resetPassword(@Request() req) {
    return req.user;
  }
}
