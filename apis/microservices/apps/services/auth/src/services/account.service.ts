import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthAccount } from '@app/data/entities/auth';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AuthAccount)
    private readonly authAccountRepository: Repository<AuthAccount>,
  ) {}

  async test() {
    return this.authAccountRepository.findOneBy({ id: 'id' });
  }
}
