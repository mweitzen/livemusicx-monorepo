import { NotFoundException, applyDecorators } from '@nestjs/common';
import { Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiResponseMetadata,
} from '@nestjs/swagger';

interface FindOneOptions extends Omit<ApiResponseMetadata, 'isArray'> {
  path?: string;
}

export function FindOne({ path = ':id', ...apiMetadata }: FindOneOptions) {
  return applyDecorators(
    Get(path),
    ApiOkResponse(apiMetadata),
    ApiNotFoundResponse({ type: NotFoundException, description: 'Not Found.' }),
  );
}
