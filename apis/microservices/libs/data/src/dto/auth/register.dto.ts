import { ApiProperty } from '@nestjs/swagger';
import { exampleUser } from '@app/data/examples/user.example';

export class RegisterDto {
  @ApiProperty({ example: exampleUser.firstName })
  firstName: string;

  @ApiProperty({ example: exampleUser.lastName })
  lastName: string;

  @ApiProperty({ example: exampleUser.username })
  username: string;

  @ApiProperty({ example: 'password' })
  password: string;
}
