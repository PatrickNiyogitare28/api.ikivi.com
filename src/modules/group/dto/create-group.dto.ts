import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EGroupType } from "src/enums/EGroupType";

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
    group_owner: string;
}