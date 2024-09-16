import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MessagePattern } from '@nestjs/microservices';
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Request as RequestType } from 'express';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Find All Users (EVENTUALLY INTERNAL)
   *
   * No need for users to ever need to request info about other users publicly
   *
   */
  @Get('all')
  @ApiOperation({ deprecated: true })
  findAllUsers() {
    return this.usersService.findAll();
  }

  /**
   * Remove User
   *
   */
  @Delete()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ deprecated: true })
  removeUser(@Request() req: RequestType) {
    return this.usersService.remove(req.user.id);
  }

  /**
   * Get Current User
   *
   */
  @Get()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Request() req: RequestType) {
    return req.user;
  }

  /**
   * Update User
   *
   */
  @Patch()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Request() req: RequestType,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  /**
   * Current User Accounts
   *
   */
  @Get('accounts')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  getUserAccounts(@Request() req: RequestType) {
    return this.usersService.getAccounts(req.user);
  }

  /**
   * Current User Events
   *
   */
  @Get('events')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  getUserEvents(@Request() req: RequestType) {
    return this.usersService.getAccounts(req.user);
  }

  /**
   * Current User Posts
   *
   */
  @Get('posts')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  getCurrentUserPosts(@Request() req: RequestType) {
    return `Get current user ${req.user.id} posts`;
  }

  /**
   * Current User Comments
   *
   */
  @Get('comments')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  getCurrentUserComments(@Request() req: RequestType) {
    return `Get current user ${req.user.id} comments`;
  }

  /**
   * Invite User
   *
   */
  @Post('invite')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  inviteUser(@Request() req: RequestType) {
    return `Invite a user. Initiated by: ${req.user.username}`;
  }

  /**
   * Verify User
   *
   */
  @Post('verify')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  verifyUser(@Request() req: RequestType) {
    return `Verify user: ${req.user.username}`;
  }

  /**
   * Upgrade User
   *
   */
  @Post('upgrade')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  upgradeUser(@Request() req: RequestType) {
    return `Upgrade user: ${req.user}`;
  }

  /**
   * Deactivate User
   *
   */
  @Post('deactivate')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  deactivateUser() {}

  /**
   * Find One User
   *
   */
  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Send friend request
   *
   */
  @Post(':id/request')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  sendFriendRequest(@Request() req: RequestType, @Param('id') id: string) {
    return `Request from user ${req.user.id} to ${id}`;
  }

  /**
   * Get Messages Between Users
   *
   */
  @Get(':id/messages')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  getMessagesBetweenUsers(
    @Request() req: RequestType,
    @Param('id') id: string,
  ) {
    return `Get messages between user ${req.user.id} and ${id}`;
  }

  /**
   * Send a message to a user
   *
   */
  @Post(':id/messages')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  sendMessageToUser(@Request() req: RequestType, @Param('id') id: string) {
    return `Send a message from user ${req.user.id} to ${id}`;
  }

  /**
   * Get Messages Between Users
   *
   */
  @Get(':id/posts')
  getUserPosts(@Param('id') id: string) {
    return `Get posts made by user ${id}`;
  }

  /**
   * Get User Registered Events
   *
   */
  @Get(':id/registered-events')
  getUserRegisteredEvents(@Param('id') id: string) {
    return `Get user ${id} registered events`;
  }

  /**
   * Create User (INTERNAL)
   *
   */
  @MessagePattern({ cmd: 'create-user' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Find One User (INTERNAL)
   *
   */
  @MessagePattern({ cmd: 'get-user' })
  findOneUserInternal(@Body() data: string) {
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
