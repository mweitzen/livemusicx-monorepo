import { Injectable } from '@nestjs/common';
import { CreateNetworkDto, UpdateNetworkDto } from '@app/data/dto';

@Injectable()
export class NetworksService {
  create(createNetworkDto: CreateNetworkDto) {
    return 'This action adds a new network';
  }

  findAll() {
    return `This action returns all networks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} network`;
  }

  update(id: number, updateNetworkDto: UpdateNetworkDto) {
    return `This action updates a #${id} network`;
  }

  remove(id: number) {
    return `This action removes a #${id} network`;
  }
}
