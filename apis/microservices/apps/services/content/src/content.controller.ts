import { Controller, Get } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  getHello(): string {
    return this.contentService.getHello();
  }
}
