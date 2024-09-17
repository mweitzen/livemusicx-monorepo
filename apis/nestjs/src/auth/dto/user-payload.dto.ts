import { UserRole } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UserPayload {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @IsOptional()
  password?: string;
}
