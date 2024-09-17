import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '../../database';

import { CreateUserDto, UpdateUserDto } from './dto';
import { Prisma } from '@prisma/client';

import { MESSAGE_BROKER } from '../../constants';
import { UserPayload } from '../../auth/dto';

@Injectable()
export class UsersService {
  private readonly BASE_USER_SELECT = {
    isActive: true,
    id: true,
    role: true,
    email: true,
    username: true,
    password: false,
    avatarUrl: true,
    createdAt: true,
    lastUpdatedAt: true,
    userVerified: true,
    firstName: true,
    lastName: true,
  } satisfies Prisma.UserSelect;

  /**
   * Constructor
   *
   */
  constructor(
    @Inject(MESSAGE_BROKER)
    private readonly messageBroker: ClientProxy,

    private readonly prisma: PrismaService,
  ) {}

  /**
   * Create
   *
   */
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
      select: this.BASE_USER_SELECT,
    });

    this.messageBroker.emit('user-created', user);

    return user;
  }

  /**
   * Find All
   *
   */
  findAll() {
    return this.prisma.user.findMany({
      select: this.BASE_USER_SELECT,
    });
  }

  /**
   * Find All Public User
   *
   */
  findAllPublic() {
    return this.prisma.user.findMany({
      where: { role: 'PUBLIC' },
      select: this.BASE_USER_SELECT,
    });
  }

  /**
   * Find One
   *
   */
  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: { id },
      select: this.BASE_USER_SELECT,
    });
  }

  /**
   * Find One By Username
   *
   */
  findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      select: this.BASE_USER_SELECT,
    });
  }

  /**
   * Update User
   *
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    const result = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: this.BASE_USER_SELECT,
    });
    if (result) return true;
    return false;
  }

  /**
   * Remove User
   *
   */
  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  /**
   * Get User Password
   *
   */
  getPassword(username: string) {
    return this.prisma.user.findFirst({
      where: { username },
      select: { id: true, username: true, password: true, role: true },
    });
  }

  /**
   * Get User Password
   *
   */
  getAccounts(userPayload: UserPayload) {
    return userPayload;
    // return this.prisma.user.findUnique({
    //   where: { id: userPayload.id },
    //   select: { managedAccounts: true },
    // });
  }
}
