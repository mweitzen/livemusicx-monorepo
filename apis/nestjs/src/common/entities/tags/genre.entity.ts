import { Entity } from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Genre extends Tag {}
