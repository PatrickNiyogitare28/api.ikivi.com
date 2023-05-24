import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NewJoinRequestDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  code: string;
}