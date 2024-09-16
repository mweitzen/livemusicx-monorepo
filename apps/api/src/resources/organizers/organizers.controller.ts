import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';

@ApiTags('Organizers')
@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizersService: OrganizersService) {}

  @Post()
  create(@Body() createOrganizerDto: CreateOrganizerDto) {
    return this.organizersService.create(createOrganizerDto);
  }

  @Get()
  findAll() {
    return this.organizersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizerDto: UpdateOrganizerDto,
  ) {
    return this.organizersService.update(+id, updateOrganizerDto);
  }

  @Get(':id/events')
  getOrganizerEvents(@Param('id') id: string) {
    return `Get Organizer ${id} events`;
  }

  @Get(':id/networks')
  getOrganizerNetworks(@Param('id') id: string) {
    return `Get Organizer ${id} networks`;
  }

  @Get(':id/media')
  getOrganizerMedia(@Param('id') id: string) {
    return `Get Organizer ${id} media`;
  }

  @Get(':id/references')
  getOrganizerReferences(@Param('id') id: string) {
    return `Get Organizer ${id} references made in postss`;
  }

  @Get(':id/announcements')
  getOrganizerAnnouncements(@Param('id') id: string) {
    return `Get Organizer ${id} announcements`;
  }

  @Get(':id/broadcasts')
  getOrganizerBroadcats(@Param('id') id: string) {
    return `Get Organizer ${id} broadcasts`;
  }

  @Get(':id/bulletins')
  getOrganizerBulletins(@Param('id') id: string) {
    return `Get Organizer ${id} bulletins`;
  }
}
