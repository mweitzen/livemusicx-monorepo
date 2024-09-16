import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { CreateOrganizerDto, UpdateOrganizerDto } from '@app/data/dto';
import { RestController } from '@app/decorators';

@RestController({ path: 'organizers', version: '1' })
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizersService.remove(+id);
  }
}
