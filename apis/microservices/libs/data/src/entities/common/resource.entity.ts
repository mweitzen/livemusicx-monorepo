import { EXAMPLE_UUID } from '../../examples/uuid.example';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class Resource {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for resource.',
    example: EXAMPLE_UUID,
  })
  id: string;

  @Column({ unique: true })
  @ApiProperty()
  slug: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Resource created at.',
    example: 'createdAt',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Resource last updated at.',
    example: 'lastUpdatedAt',
  })
  lastUpdatedAt: Date;
}

export abstract class VersionedResource extends Resource {
  @VersionColumn()
  @ApiProperty()
  version: number;
}
