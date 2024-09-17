import { MessagePattern } from '@nestjs/microservices';
import { Body, Patch, Param, Delete, Post, Request } from '@nestjs/common';
import { Auth, RestController, FindAll, FindOne } from '@app/decorators';
import { UsersService } from './users.service';
import {
  PerformerUser,
  PublicUser,
  User,
  VenueUser,
  OrganizerUser,
  AssociateUser,
} from '@app/data/entities/user';
import { CreateUserDto, UpdateUserDto } from '@app/data/dto';

@RestController({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get Current User
   *
   */
  @Auth()
  @Post('me')
  getCurrentUser(@Request() req) {
    return req.user;
  }

  /**
   * Find All Users (EVENTUALLY INTERNAL)
   *
   * No need for users to ever need to request info about other users publicly
   *
   */
  @FindAll({
    type: User,
    description: 'Returns the users that match the query.',
  })
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Find One User
   *
   */
  @FindAll({
    path: 'public',
    type: PublicUser,
    description: 'Returns the user with by id.',
  })
  findPublicUsers() {
    return this.usersService.findAllPublicUsers();
  }
  @FindAll({
    path: 'performer',
    type: PerformerUser,
    description: 'Returns the user with by id.',
  })
  findPerformerUsers() {
    return this.usersService.findAllPerformerUsers();
  }

  @FindAll({
    path: 'venue',
    type: VenueUser,
    description: 'Returns the user with by id.',
  })
  findVenueUsers() {
    return this.usersService.findAll();
  }

  @FindAll({
    path: 'organizer',
    type: OrganizerUser,
    description: 'Returns the user with by id.',
  })
  findOrganizerUsers() {
    return this.usersService.findAll();
  }

  @FindAll({
    path: 'associate',
    type: AssociateUser,
    description: 'Returns the user with by id.',
  })
  findAssociateUsers() {
    return this.usersService.findAll();
  }

  /**
   * Find One User
   *
   */
  @FindOne({
    type: User,
    description: 'Returns the user with by id.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Update User
   *
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Remove User
   *
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  /**
   * Create User (INTERNAL)
   *
   */
  @MessagePattern({ cmd: 'create-user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Find One User (INTERNAL)
   *
   */
  @MessagePattern({ cmd: 'get-user' })
  findOneEvent(@Body() data: string) {
    return this.usersService.findOne(data);
  }

  /**
   * Find One User By Username (INTERNAL)
   *
   */
  @MessagePattern({ cmd: 'get-user-by-username' })
  findOneByUsername(@Body() username: string) {
    return this.usersService.findOneByUsername(username);
  }

  /**
   * Get User Password (INTERNAL)
   *
   */
  @MessagePattern({ cmd: 'get-user-password' })
  getUserPassword(@Body() username: string) {
    return this.usersService.getPassword(username);
  }
}
