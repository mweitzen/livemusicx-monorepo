import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { exampleAuth } from '../examples/auth.example';

export class ConnectCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: exampleAuth.username })
  id: string;
}
