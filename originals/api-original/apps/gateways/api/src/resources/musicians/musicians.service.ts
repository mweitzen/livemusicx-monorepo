import { Injectable } from '@nestjs/common';
import { CreateMusicianDto, UpdateMusicianDto } from '@app/data/dto';

@Injectable()
export class MusiciansService {
  create(createMusicianDto: CreateMusicianDto) {
    return 'This action adds a new musician';
  }

  findAll() {
    return `This action returns all musicians`;
  }

  findOne(id: number) {
    return `This action returns a #${id} musician`;
  }

  update(id: number, updateMusicianDto: UpdateMusicianDto) {
    return `This action updates a #${id} musician`;
  }

  remove(id: number) {
    return `This action removes a #${id} musician`;
  }
}
