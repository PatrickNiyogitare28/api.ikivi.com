import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EGroupType } from "src/enums/EGroupType";
import { EStatus } from "src/enums/EStatus";

export class CreateGroupDto {
    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({enum: EGroupType, required: true})
    @IsString()
    @IsNotEmpty()
    @IsEnum(EGroupType)
    type: EGroupType

    @IsString()
    @IsOptional()
    group_owner: string;
}

export class UpdatedGroupDto {
    @ApiProperty({required: true})
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({required: true})
    @IsString()
    @IsOptional()
    location: string;

    @ApiProperty({enum: EGroupType, required: true})
    @IsString()
    @IsOptional()
    @IsEnum(EGroupType)
    type: EGroupType
}

export class EditGroupStatusDto {
    @ApiProperty({required: true})
    @IsEnum(EStatus)
    @IsNotEmpty()
    status: EStatus
}