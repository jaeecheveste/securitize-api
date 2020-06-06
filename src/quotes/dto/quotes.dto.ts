import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class QuotesDTO {
  @ApiProperty({
    name: 'id',
  })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    name: 'name',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    name: 'circulatingSupply',
  })
  @IsNumber()
  readonly circulatingSupply: number;

  @ApiProperty({
    name: 'price',
  })
  @IsNumber()
  readonly price: number;
}
