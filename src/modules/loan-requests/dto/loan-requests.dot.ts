import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateLoanRequestDto {
    @ApiProperty({ required: true })
    @IsInt()
    @IsNotEmpty()
    amount: number;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    interest_rate: any;
    
    @ApiProperty({ required: true })
    @IsUUID()
    @IsNotEmpty()
    user: string;
  
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    notes: string;

    @ApiProperty({ required: true })
    @IsUUID()
    @IsNotEmpty()
    group: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    request_status: string;
}
