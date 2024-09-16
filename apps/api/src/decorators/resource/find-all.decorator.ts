import { applyDecorators } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOkResponse, ApiResponseMetadata } from '@nestjs/swagger';

interface FindAllOptions extends Omit<ApiResponseMetadata, 'isArray'> {
  path?: string;
}

export function FindAll({ path = '', ...apiMetadata }: FindAllOptions) {
  return applyDecorators(
    Get(path),
    ApiOkResponse({ isArray: true, ...apiMetadata }),
  );
}
