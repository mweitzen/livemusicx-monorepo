import { Injectable } from '@nestjs/common';
import { CreateLocationDto, UpdateLocationDto } from '@app/data/dto';

@Injectable()
export class LocationsService {
  create(createLocationDto: CreateLocationDto) {
    return 'This action adds a new location. Wont happen';
  }

  findAll() {
    return `This action returns all locations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
