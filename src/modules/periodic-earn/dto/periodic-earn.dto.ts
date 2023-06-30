import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddPeriodicEarnDto {
  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  contribution_term: string;

  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  user: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  notes: string;
}
