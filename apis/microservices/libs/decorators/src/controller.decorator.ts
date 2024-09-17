import { applyDecorators, Controller, ControllerOptions } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function RestController(options: string | ControllerOptions) {
  let path: string;
  if (typeof options === 'string') {
    path = options;
  } else if (typeof options.path === 'object') {
    path = options.path[0];
  } else {
    path = options.path;
  }
  return applyDecorators(
    ApiTags(path),
    Controller(options as ControllerOptions),
  );
}
