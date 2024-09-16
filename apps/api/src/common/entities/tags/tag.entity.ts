import { Column, PrimaryColumn } from 'typeorm';

export abstract class Tag {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ unique: true })
  displayName: string;

  @Column()
  description?: string;
}
