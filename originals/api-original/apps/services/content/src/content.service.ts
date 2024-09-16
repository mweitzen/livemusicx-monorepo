import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentService {
  getHello(): string {
    return 'Hello World!';
  }
}
