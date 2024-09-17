import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // CreateDateColumn,
  // UpdateDateColumn,
  // OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Contact {
  /**
   * METADATA
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'id' })
  id: string;

  /**
   * CONTACT DETAILS
   */
  @Column()
  @ApiProperty()
  phone?: string;

  @Column()
  @ApiProperty()
  textNumber?: string;

  /**
   * CONTACT PREFERENCES
   */
  @Column()
  @ApiProperty()
  availableByText: boolean;

  @Column()
  @ApiProperty()
  availableByPhone: boolean;

  @Column()
  @ApiProperty()
  availableByEmail: boolean;
}
