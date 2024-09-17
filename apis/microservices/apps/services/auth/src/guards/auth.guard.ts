import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get request from HTTP context
    const request = context.switchToHttp().getRequest();

    // Get token from header
    const token = this.extractTokenFromHeader(request);
    if (!token)
      throw new UnauthorizedException(
        'You must provide a valid Bearer token with your request.',
      );

    // Verify token and attach payload to request
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'SECRET',
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid token provided.');
    }

    // Return can activate
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
