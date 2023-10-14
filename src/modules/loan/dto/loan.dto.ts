import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { CreateLogDto } from 'src/modules/logs/dto/log.dto';

export class CreateLoanDto {
  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  loan_request: string;

  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  updated_by: string;

  log?: CreateLogDto;

  @IsOptional()
  @IsUUID()
  group_id?: any;

  @IsOptional()
  loan_amount?: any;

  @IsOptional()
  amount_topay?: any;
}
