import { ApiProperty } from '@nestjs/swagger';

export class CreateResponse {
  @ApiProperty({
    name: 'description',
  })
  id: string;
}
