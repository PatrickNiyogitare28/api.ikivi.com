import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateLoanDto {
    @ApiProperty({ required: true })
    @IsUUID()
    @IsNotEmpty()
    loan_request: string;
    
    @ApiProperty({ required: true })
    @IsUUID()
    @IsNotEmpty()
    updated_by: string;
}
