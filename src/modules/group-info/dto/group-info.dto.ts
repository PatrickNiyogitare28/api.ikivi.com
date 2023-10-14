import { IsNotEmpty, IsUUID, IsInt } from "class-validator";

export class InitializeGroupInfoDto {
    @IsUUID()
    @IsNotEmpty()
    group: string;

    @IsUUID()
    @IsNotEmpty()
    updated_by: string;
}

export class AddOnGroupTotalCapitalDto {
    @IsUUID()
    @IsNotEmpty()
    group: string;

    @IsUUID()
    @IsNotEmpty()
    updated_by: string;

    @IsInt()
    @IsNotEmpty()
    amount: number;
}

export class loanOfferedDto {
    @IsUUID()
    @IsNotEmpty()
    group: string;

    @IsUUID()
    @IsNotEmpty()
    updated_by: string;

    @IsNotEmpty()
    loan_amount: any;

    @IsNotEmpty()
    amount_topay: any;
}

export class LoanFullyPaidDto{
    @IsUUID()
    @IsNotEmpty()
    group: string;

    @IsUUID()
    @IsNotEmpty()
    updated_by: string;

    @IsNotEmpty()
    amount_paid: any;

    @IsNotEmpty()
    interest: any;
}

export class GroupOfferedPeriodicContributionDto{
    @IsUUID()
    @IsNotEmpty()
    group: string;

    @IsNotEmpty()
    amount: any;

    @IsUUID()
    @IsNotEmpty()
    updated_by: string;
}


