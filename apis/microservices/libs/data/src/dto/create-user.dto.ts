import { ApiProperty } from '@nestjs/swagger';
import { exampleUser } from '../examples/user.example';

export class CreateUserDto {
  @ApiProperty({
    example: exampleUser.firstName,
    default: exampleUser.firstName,
    type: 'string',
  })
  firstName: string;

  @ApiProperty({ example: exampleUser.lastName })
  lastName: string;

  @ApiProperty({ example: exampleUser.username })
  username: string;

  @ApiProperty({ example: 'password' })
  password: string;
}
