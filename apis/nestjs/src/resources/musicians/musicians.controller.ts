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
import { MusiciansService } from './musicians.service';
import { CreateMusicianDto } from './dto/create-musician.dto';
import { UpdateMusicianDto } from './dto/update-musician.dto';

@ApiTags('Musicians')
@Controller('musicians')
export class MusiciansController {
  constructor(private readonly musiciansService: MusiciansService) {}

  @Post()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  create(@Body() createMusicianDto: CreateMusicianDto) {
    return this.musiciansService.create(createMusicianDto);
  }

  @Get()
  findAll() {
    return this.musiciansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musiciansService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateMusicianDto: UpdateMusicianDto,
  ) {
    return this.musiciansService.update(+id, updateMusicianDto);
  }

  @Get(':id/bands')
  getMusicianBands(@Param('id') id: string) {
    return `Get musicin ${id} bands`;
  }

  @Get(':id/events')
  getMusicianEvents(@Param('id') id: string) {
    return `Get Musician ${id} events`;
  }

  @Get(':id/networks')
  getMusicianNetworks(@Param('id') id: string) {
    return `Get Musician ${id} networks`;
  }

  @Get(':id/media')
  getMusicianMedia(@Param('id') id: string) {
    return `Get Musician ${id} media`;
  }

  @Get(':id/references')
  getMusicianReferences(@Param('id') id: string) {
    return `Get Musician ${id} references made in postss`;
  }

  @Get(':id/announcements')
  getMusicianAnnouncements(@Param('id') id: string) {
    return `Get Musician ${id} announcements`;
  }

  @Get(':id/broadcasts')
  getMusicianBroadcats(@Param('id') id: string) {
    return `Get Musician ${id} broadcasts`;
  }

  @Get(':id/bulletins')
  getMusicianBulletins(@Param('id') id: string) {
    return `Get Musician ${id} bulletins`;
  }
}
