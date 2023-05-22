import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateGroupMetadataDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  user_id_photo_url: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  user_id_with_self_url: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsUrl()
  supporting_document_url?: string;

  group: string;
}
