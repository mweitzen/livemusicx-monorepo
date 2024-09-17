import { UserRole } from '@prisma/client';
import {
  IsEnum,
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  // IsStrongPassword,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { exampleAuth } from '../examples/auth.example';

export class RegisterDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: exampleAuth.firstName })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: exampleAuth.lastName })
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: exampleAuth.email })
  email?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: exampleAuth.username })
  username: string;

  @IsNotEmpty()
  @IsString()
  // @IsStrongPassword()
  @ApiProperty({ example: exampleAuth.password })
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  @ApiProperty({ example: exampleAuth.role })
  role: UserRole;
}
