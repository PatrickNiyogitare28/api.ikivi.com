import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateNotificationDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsArray()
  notificationIds: string[];
}
