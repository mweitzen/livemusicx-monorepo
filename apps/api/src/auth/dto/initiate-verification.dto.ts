import { IsNotEmpty, IsString } from 'class-validator';

export class InitiateVerificationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
