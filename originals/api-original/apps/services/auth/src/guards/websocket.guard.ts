import {
  CanActivate,
  ExecutionContext,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { Socket } from 'socket.io';
import { Handshake } from 'socket.io/dist/socket';

@Injectable()
export class WebsocketGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(context.getType());
    // Get connection to Web Socket service
    // const socket = context.switchToWs().getClient<Socket>();

    // Get token from header
    // const token = await this.extractTokenFromHandshake(socket.handshake);
    // console.log('token');
    // console.log(token);

    // if (!token)
    //   throw new UnauthorizedException(
    //     'You must provide a valid Bearer token with your request.',
    //   );

    // // Verify token and attach payload to request
    // try {
    //   const payload = await this.jwtService.verifyAsync(token, {
    //     secret: 'SECRET',
    //   });
    //   // 💡 We're assigning the payload to the request object here
    //   // so that we can access it in our route handlers
    //   // request['user'] = payload;
    // } catch {
    //   throw new UnauthorizedException('Invalid token provided.');
    // }

    // Return can activate
    return true;
  }

  private async extractTokenFromHandshake(handshake: Handshake) {
    console.log('handshake headers');
    console.log(handshake.headers);
    return handshake.auth.token;
  }
}
