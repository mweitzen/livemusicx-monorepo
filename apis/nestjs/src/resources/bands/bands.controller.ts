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
import { BandsService } from './bands.service';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';

@ApiTags('Bands')
@Controller('bands')
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Post()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  createBand(@Body() createBandDto: CreateBandDto) {
    return this.bandsService.create(createBandDto);
  }

  @Get()
  findAllBands() {
    return this.bandsService.findAll();
  }

  @Get(':id')
  findOneBand(@Param('id') id: string) {
    return this.bandsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  updateBand(@Param('id') id: string, @Body() updateBandDto: UpdateBandDto) {
    return this.bandsService.update(+id, updateBandDto);
  }

  @Get(':id/members')
  getBandMembers(@Param('id') id: string) {
    return `Get band ${id} members`;
  }

  @Get(':id/events')
  getBandEvents(@Param('id') id: string) {
    return `Get band ${id} events`;
  }

  @Get(':id/networks')
  getBandNetworks(@Param('id') id: string) {
    return `Get band ${id} networks`;
  }

  @Get(':id/media')
  getBandMedia(@Param('id') id: string) {
    return `Get band ${id} media`;
  }

  @Get(':id/references')
  getBandReferences(@Param('id') id: string) {
    return `Get band ${id} references made in postss`;
  }

  @Get(':id/announcements')
  getBandAnnouncements(@Param('id') id: string) {
    return `Get band ${id} announcements`;
  }

  @Get(':id/broadcasts')
  getBandBroadcats(@Param('id') id: string) {
    return `Get band ${id} broadcasts`;
  }

  @Get(':id/bulletins')
  getBandBulletins(@Param('id') id: string) {
    return `Get band ${id} bulletins`;
  }
}
