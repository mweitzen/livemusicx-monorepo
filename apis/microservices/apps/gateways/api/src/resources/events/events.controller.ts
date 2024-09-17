import { FindAll, FindOne } from '@app/decorators';
import { Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestController } from '@app/decorators';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from '@app/data/dto';

@RestController({ path: 'events', version: '1' })
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @FindAll({ type: Event })
  findAll() {
    return this.eventsService.findAll();
  }

  @FindOne({ type: Event })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
