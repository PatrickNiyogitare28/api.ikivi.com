import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateGroupMetadataDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  user_id_photo_url: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  user_selfie_with_id_url: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsUrl()
  supporting_document_url?: string;

  group: string;
}

export class UpdateGroupMetadataDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  @IsUrl()
  user_id_photo_url: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  @IsUrl()
  user_selfie_with_id_url: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsUrl()
  supporting_document_url?: string;
}
