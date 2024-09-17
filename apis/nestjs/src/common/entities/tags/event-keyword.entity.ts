import { Entity } from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class EventKeyword extends Tag {}
