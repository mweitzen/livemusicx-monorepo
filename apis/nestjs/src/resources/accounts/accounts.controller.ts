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
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('Accounts Base')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }

  @Get(':id/associates')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  getAccountAssociates(@Param('id') id: string) {
    return `Get associates for accout with id ${id}`;
  }

  @Get(':id/affiliates')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  getAccountAffiliates(@Param('id') id: string) {
    return `Get affiliates for account with id ${id}`;
  }

  @Post(':id/deactivate')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  deactivateAccount(@Param('id') id: string) {
    return `Deactive account with id ${id}`;
  }
}
