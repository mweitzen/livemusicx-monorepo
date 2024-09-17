import { Injectable } from '@nestjs/common';

@Injectable()
export class ExternalAuthService {
  constructor() {}

  async verifyExternalLogin(
    externalProvider: string,
    externalAccessToken: string,
  ) {
    return { id: 'id', externalProvider, externalAccessToken };
  }
}
