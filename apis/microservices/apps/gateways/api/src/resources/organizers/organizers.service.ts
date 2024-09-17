import { Injectable } from '@nestjs/common';
import { CreateOrganizerDto, UpdateOrganizerDto } from '@app/data/dto';

@Injectable()
export class OrganizersService {
  create(createOrganizerDto: CreateOrganizerDto) {
    return 'This action adds a new organizer';
  }

  findAll() {
    return `This action returns all organizers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizer`;
  }

  update(id: number, updateOrganizerDto: UpdateOrganizerDto) {
    return `This action updates a #${id} organizer`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizer`;
  }
}
