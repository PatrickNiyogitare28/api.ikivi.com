import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsJSON, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { EActionType } from "src/enums/EActionTypes";

export class CreateLogDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    group_id: string;
    
    @IsString()
    @IsNotEmpty()
    message: string;
    
   @IsEnum(EActionType)
   @IsNotEmpty()
   action: EActionType;

   @IsString()
   @IsOptional()
   actor_id?: string;

   @IsJSON()
   @IsOptional()
   data?: any;
}
