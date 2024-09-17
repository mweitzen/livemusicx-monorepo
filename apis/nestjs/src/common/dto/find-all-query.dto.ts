import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FindAllQuery {
  @IsOptional()
  @IsNumberString()
  take?: number;

  @IsOptional()
  @IsNumberString()
  skip?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
