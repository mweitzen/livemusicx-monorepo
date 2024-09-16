import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestController } from '@app/decorators';
import { MusiciansService } from './musicians.service';
import { CreateMusicianDto, UpdateMusicianDto } from '@app/data/dto';

@RestController({ path: 'musicians', version: '1' })
export class MusiciansController {
  constructor(private readonly musiciansService: MusiciansService) {}

  @Post()
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
  update(
    @Param('id') id: string,
    @Body() updateMusicianDto: UpdateMusicianDto,
  ) {
    return this.musiciansService.update(+id, updateMusicianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musiciansService.remove(+id);
  }
}
