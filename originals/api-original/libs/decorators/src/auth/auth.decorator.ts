import {
  SetMetadata,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'apps/services/auth/src/guards/auth.guard';
import { UserRole } from '@app/data/enums/user-role.enum';
// import { BaseUserRole } from 'apps/api/src/auth/roles/roles.enum';
// import { AuthGuard } from 'apps/api/src/auth/guards/auth.guard';

interface AuthOptions {
  roles?: UserRole[];
}

export function Auth(options?: AuthOptions) {
  return applyDecorators(
    SetMetadata('roles', options?.roles || null),
    UseGuards(AuthGuard),
    ApiBearerAuth('Access Token'),
    ApiUnauthorizedResponse({
      type: UnauthorizedException,
      description: 'Unauthorized',
    }),
  );
}
