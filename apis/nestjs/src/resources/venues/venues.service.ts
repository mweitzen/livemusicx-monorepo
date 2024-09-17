import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from '../../database';
import { FindAllQuery } from '../../common/dto/find-all-query.dto';

@Injectable()
export class VenuesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVenueDto: CreateVenueDto) {
    return 'This action adds a new venue';
  }

  findAll(findAllQuery: FindAllQuery) {
    return this.prisma.venue.findMany({
      skip: findAllQuery.skip,
      take: findAllQuery.take,
      where: findAllQuery.search
        ? {
            account: {
              name: {
                contains: findAllQuery.search,
                mode: 'insensitive',
              },
            },
          }
        : undefined,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} venue`;
  }

  update(id: number, updateVenueDto: UpdateVenueDto) {
    return `This action updates a #${id} venue`;
  }

  remove(id: number) {
    return `This action removes a #${id} venue`;
  }
}
