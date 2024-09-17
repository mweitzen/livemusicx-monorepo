import { PartialType } from '@nestjs/swagger';
import { CreateMusicianDto } from './create-musician.dto';

export class UpdateMusicianDto extends PartialType(CreateMusicianDto) {}
