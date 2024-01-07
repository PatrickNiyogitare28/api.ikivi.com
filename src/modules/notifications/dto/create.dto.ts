import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ENotificationType } from 'src/enums/ENotificationType';

export class AddNotificationDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  group: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(ENotificationType)
  type: ENotificationType;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  message: string;
}
