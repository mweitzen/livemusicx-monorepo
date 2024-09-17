import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { FindAllQuery } from '../../common/dto/find-all-query.dto';

@ApiTags('Venues')
@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venuesService.create(createVenueDto);
  }

  @Get()
  @ApiQuery({ name: 'take', type: 'number', example: 10, required: false })
  @ApiQuery({ name: 'skip', type: 'number', example: 0, required: false })
  @ApiQuery({
    name: 'search',
    type: 'string',
    example: 'steak',
    required: false,
  })
  findAllVenues(@Query() findAllQuery: FindAllQuery) {
    return this.venuesService.findAll(findAllQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venuesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venuesService.update(+id, updateVenueDto);
  }

  @Get(':id/stages')
  getVenueStages(@Param('id') id: string) {
    return this.venuesService.remove(+id);
  }

  @Post(':id/stages')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  addStage(@Param('id') id: string) {
    return this.venuesService.remove(+id);
  }

  @Get(':id/events')
  getVenueEvents(@Param('id') id: string) {
    return `Get Venue ${id} events`;
  }

  @Get(':id/networks')
  getVenueNetworks(@Param('id') id: string) {
    return `Get Venue ${id} networks`;
  }

  @Get(':id/media')
  getVenueMedia(@Param('id') id: string) {
    return `Get Venue ${id} media`;
  }

  @Get(':id/references')
  getVenueReferences(@Param('id') id: string) {
    return `Get Venue ${id} references made in postss`;
  }

  @Get(':id/announcements')
  getVenueAnnouncements(@Param('id') id: string) {
    return `Get Venue ${id} announcements`;
  }

  @Get(':id/broadcasts')
  getVenueBroadcats(@Param('id') id: string) {
    return `Get Venue ${id} broadcasts`;
  }

  @Get(':id/bulletins')
  getVenueBulletins(@Param('id') id: string) {
    return `Get Venue ${id} bulletins`;
  }
}
