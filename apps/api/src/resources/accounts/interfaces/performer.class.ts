import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export abstract class Performer {
  @Column()
  @ApiProperty()
  spotifyUrl?: string;

  @Column()
  @ApiProperty()
  bandcampUrl?: string;

  @Column()
  @ApiProperty()
  pressKitUrl?: string;
}
