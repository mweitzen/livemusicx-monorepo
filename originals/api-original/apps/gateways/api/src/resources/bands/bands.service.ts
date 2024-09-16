import { Injectable } from '@nestjs/common';
import { CreateBandDto, UpdateBandDto } from '@app/data/dto';

@Injectable()
export class BandsService {
  create(createBandDto: CreateBandDto) {
    return 'This action adds a new band';
  }

  findAll() {
    return `This action returns all bands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} band`;
  }

  update(id: number, updateBandDto: UpdateBandDto) {
    return `This action updates a #${id} band`;
  }

  remove(id: number) {
    return `This action removes a #${id} band`;
  }
}
