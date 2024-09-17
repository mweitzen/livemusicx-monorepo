import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from '@app/data/dto';
import { PublishedEvent } from '@app/data/entities/event';
import { MESSAGE_BROKER } from '@app/constants';

@Injectable()
export class EventsService {
  constructor(
    @Inject(MESSAGE_BROKER)
    private readonly messageBroker: ClientProxy,

    @InjectRepository(PublishedEvent)
    private eventsRepository: Repository<PublishedEvent>,
  ) {}

  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAll(): Promise<PublishedEvent[]> {
    return this.eventsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
