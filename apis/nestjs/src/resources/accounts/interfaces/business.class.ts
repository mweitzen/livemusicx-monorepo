import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export abstract class Business {
  @Column()
  @ApiProperty()
  googleBusinessUrl?: string;

  @Column()
  @ApiProperty()
  yelpUrl?: string;
}
