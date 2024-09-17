import { NotFoundException, applyDecorators } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiResponseMetadata,
} from '@nestjs/swagger';

interface PatchOptions extends Omit<ApiResponseMetadata, 'isArray'> {
  path?: string;
}

export function Update({ path = ':id', ...apiMetadata }: PatchOptions) {
  return applyDecorators(
    Patch(path),
    ApiOkResponse(apiMetadata),
    ApiNotFoundResponse({ type: NotFoundException, description: 'Not Found.' }),
  );
}
