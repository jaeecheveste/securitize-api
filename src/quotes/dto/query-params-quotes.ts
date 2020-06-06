import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryParamsQuotesDto {
  @ApiProperty({
    name: 'startPage',
  })
  @IsOptional()
  @IsString()
  startPage: string;

  @ApiProperty({
    name: 'limit',
  })
  @IsOptional()
  @IsString()
  limit: string;
}
