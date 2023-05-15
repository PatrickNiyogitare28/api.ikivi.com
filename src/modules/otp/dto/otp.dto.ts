import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class OtpDTO {
  @ApiProperty({
    example: 13932,
    required: true,
  })
  @IsNotEmpty()
  code: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class codeDTO {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Length(6, 6)
  code: number;

  @ApiProperty({
    required: true,
  })
  user_id: string;
}
