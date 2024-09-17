import { ApiProperty } from '@nestjs/swagger';
import { LoginType } from '../../enums';
import { exampleUser } from '../../examples/user.example';

interface LoginBase {
  type: LoginType;
}

abstract class PasswordLogin {
  @ApiProperty({ example: 'password' })
  password: string;
}

export class UsernameLoginDto extends PasswordLogin implements LoginBase {
  @ApiProperty({ example: LoginType.USERNAME })
  type: LoginType.USERNAME;

  @ApiProperty({ example: exampleUser.username })
  username: string;
}

export class EmailLoginDto extends PasswordLogin {
  @ApiProperty({ example: LoginType.EMAIL })
  type: LoginType.EMAIL;

  @ApiProperty({ example: exampleUser.username })
  email: string;
}

export class GoogleLoginDto implements LoginBase {
  @ApiProperty({ example: LoginType.GOOGLE })
  type: LoginType.GOOGLE;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  clientSecret: string;
}

export type LoginDto = UsernameLoginDto | EmailLoginDto | GoogleLoginDto;
