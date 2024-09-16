import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { User, PerformerUser, PublicUser } from '@app/data/entities/user';

import { CreateUserDto, UpdateUserDto } from '@app/data/dto';
import { MESSAGE_BROKER } from '@app/constants';
import { UserRole } from '@app/data/enums';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MESSAGE_BROKER)
    private readonly messageBroker: ClientProxy,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(PublicUser)
    private publicUsersRepository: Repository<PublicUser>,

    @InjectRepository(PerformerUser)
    private performerUsersRepository: Repository<PerformerUser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create({
      ...createUserDto,
      role: UserRole.PERFORMER,
    });
    const user = await this.usersRepository.save(newUser);
    this.messageBroker.emit('user-created', user);
    delete user.password;
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findAllPublicUsers(): Promise<PublicUser[]> {
    return this.publicUsersRepository.find();
  }
  findAllPerformerUsers(): Promise<PerformerUser[]> {
    return this.performerUsersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    const result = await this.usersRepository.update(id, updateUserDto);
    if (result) return true;
    return false;
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }

  getPassword(username: string) {
    return this.usersRepository.findOne({
      where: { username },
      select: { id: true, password: true },
    });
  }
}
