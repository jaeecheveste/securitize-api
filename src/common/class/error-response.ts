import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponses {
  @ApiProperty({
    name: 'status_code',
  })
  statusCode: number;

  @ApiProperty({
    name: 'error',
  })
  error: string;

  @ApiProperty({
    name: 'message',
  })
  message: string;
}
