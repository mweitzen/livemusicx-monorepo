import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { VersionedResource } from '../common/resource.entity';
import { User } from '../user/base.entity';

export class Content extends VersionedResource {
  @Column()
  @ApiProperty({
    description: 'Content title.',
    example: 'Content',
  })
  title: string;

  // @ManyToOne(()=>User,user.createdContent)
  // @ApiProperty({
  //   description: 'Content author.',
  //   example: 'Author',
  // })
  author: User;
}
