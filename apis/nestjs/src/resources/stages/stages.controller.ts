import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@ApiTags('Stages')
@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Post()
  create(@Body() createStageDto: CreateStageDto) {
    return this.stagesService.create(createStageDto);
  }

  @Get()
  findAll() {
    return this.stagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStageDto: UpdateStageDto) {
    return this.stagesService.update(+id, updateStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stagesService.remove(+id);
  }

  @Get(':id/events')
  getStageEvents(@Param('id') id: string) {
    return `Get Stage ${id} events`;
  }

  @Get(':id/media')
  getStageMedia(@Param('id') id: string) {
    return `Get Stage ${id} media`;
  }

  @Get(':id/references')
  getStageReferences(@Param('id') id: string) {
    return `Get Stage ${id} references made in postss`;
  }

  @Post(':id/deactivate')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  deactivateStage(@Param('id') id: string) {
    return `Deactive stagw with id ${id}`;
  }
}
