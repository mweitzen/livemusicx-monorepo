import { Injectable } from '@nestjs/common';
import { CreateVenueDto, UpdateVenueDto } from '@app/data/dto';

@Injectable()
export class VenuesService {
  create(createVenueDto: CreateVenueDto) {
    console.log(createVenueDto);
    return 'This action adds a new venue';
  }

  findAll() {
    return `This action returns all venues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venue`;
  }

  update(id: number, updateVenueDto: UpdateVenueDto) {
    console.log(updateVenueDto);
    return `This action updates a #${id} venue`;
  }

  remove(id: number) {
    return `This action removes a #${id} venue`;
  }
}
