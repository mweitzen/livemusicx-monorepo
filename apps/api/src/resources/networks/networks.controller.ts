import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NetworksService } from './networks.service';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';

@ApiTags('Networks')
@Controller('networks')
export class NetworksController {
  constructor(private readonly networksService: NetworksService) {}

  @Post()
  create(@Body() createNetworkDto: CreateNetworkDto) {
    return this.networksService.create(createNetworkDto);
  }

  @Get()
  findAll() {
    return this.networksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.networksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNetworkDto: UpdateNetworkDto) {
    return this.networksService.update(+id, updateNetworkDto);
  }

  @Post(':id/join')
  joinNetwork(@Param('id') id: string) {
    return `Join Network ${id}.`;
  }

  @Post(':id/request')
  requestToJoinNetwork(@Param('id') id: string) {
    return `Request to Join Network ${id}.`;
  }

  @Post(':id/leave')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  leaveNetwork(@Param('id') id: string) {
    return `Leave network with id ${id}`;
  }

  @Post(':id/subscribe')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  subscribeToNetwork(@Param('id') id: string) {
    return `Subscribe to network with id ${id}`;
  }

  @Post(':id/unsubscribe')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  unsubscribeFromNetwork(@Param('id') id: string) {
    return `Subscribe to network with id ${id}`;
  }

  @Post(':id/deactivate')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  deactivateNetwork(@Param('id') id: string) {
    return `Deactive network with id ${id}`;
  }

  @Get(':id/parent')
  getNetworkParent(@Param('id') id: string) {
    return `Get Network ${id} parent.`;
  }

  @Get(':id/children')
  getNetworkChildren(@Param('id') id: string) {
    return `Get Network ${id} children.`;
  }

  @Get(':id/activity')
  getNetworkActivity(@Param('id') id: string) {
    return `Get Network ${id} activity (overview feed)`;
  }

  @Get(':id/events')
  getNetworkEvents(@Param('id') id: string) {
    return `Get Network ${id} events`;
  }

  @Get(':id/media')
  getNetworkMedia(@Param('id') id: string) {
    return `Get Network ${id} media`;
  }

  @Get(':id/announcements')
  getNetworkAnnouncements(@Param('id') id: string) {
    return `Get Network ${id} announcements`;
  }

  @Get(':id/broadcasts')
  getNetworkBroadcats(@Param('id') id: string) {
    return `Get Network ${id} broadcasts`;
  }

  @Get(':id/bulletins')
  getNetworkBulletins(@Param('id') id: string) {
    return `Get Network ${id} bulletins`;
  }

  @Get(':id/threads')
  getNetworkThreads(@Param('id') id: string) {
    return `Get Network ${id} threads`;
  }

  @Get(':networkId/threads/:threadId')
  findOneNetworkThread(
    @Param('networkId') networkId: string,
    @Param('threadId') threadId: string,
  ) {
    return `Find one Network ${networkId}, thread ${threadId}`;
  }
}
