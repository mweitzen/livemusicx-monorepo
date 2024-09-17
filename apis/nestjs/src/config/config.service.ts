import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PORT } from './enums/port.enum';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  getPort(port: keyof typeof PORT): number {
    return this.configService.get(`${PORT[port]}_PORT`);
  }

  getDatabaseUri(): string {
    return this.configService.get('DATABASE_URI');
  }

  getJwtSecret(): string {
    return this.configService.get('JWT_SECRET');
  }
}
