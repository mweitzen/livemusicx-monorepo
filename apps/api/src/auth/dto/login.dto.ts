import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { exampleAuth } from '../examples/auth.example';

export class UsernameLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: exampleAuth.username })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: exampleAuth.password })
  password: string;
}
