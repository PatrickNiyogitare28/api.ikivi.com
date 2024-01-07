/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoanEntity } from './loan.entity';
import { LoanService } from './loan.service';
import { ELoanStatus } from 'src/enums/ELoanStatus';

@ApiTags('Loans')
@ApiBearerAuth()
@Controller('loan')
export class LoanController {
  constructor(private loanService: LoanService) {}

  @ApiResponse({
    status: 200,
    description: 'Group loans',
    type: LoanEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'group', description: 'Group Id' })
  @Get('/group/:group')
  async groupHistory(@Param('group') group_id: string, @Req() req: any) {
    return await this.loanService.getGroupLoans(
      group_id,
      req.user.role,
      req.user.user_id,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Group loans',
    type: LoanEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'group', description: 'Group Id' })
  @ApiParam({
    name: 'loanStatus',
    description: 'Loan Status',
    type: 'enum',
    enum: ELoanStatus,
  })
  @Get('/group/:group/loan-status/:loanStatus')
  async groupHistoryByStatus(
    @Param('group') group_id: string,
    @Param('loanStatus') loan_status: ELoanStatus,
    @Req() req: any,
  ) {
    return await this.loanService.getGroupLoansByStatus(
      group_id,
      req.user.role,
      req.user.user_id,
      loan_status,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'User Group loans',
    type: LoanEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'group', description: 'Group Id' })
  @Get('/user-loans/group/:group')
  async getUserGroupLoan(@Param('group') group_id: string, @Req() req: any) {
    return await this.loanService.getUserGroupLoan(
      group_id,
      req.user.role,
      req.user.user_id,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'User Group loans',
    type: LoanEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'group', description: 'Group Id' })
  @ApiParam({
    name: 'loanStatus',
    description: 'Loan Status',
    type: 'enum',
    enum: ELoanStatus,
  })
  @Get('/user-loans/group/:group/loan-status/:loanStatus')
  async getUserGroupLoanStatus(
    @Param('group') group_id: string,
    @Param('loanStatus') loan_status: ELoanStatus,
    @Req() req: any,
  ) {
    return await this.loanService.getUserGroupLoanByStatus(
      group_id,
      req.user.role,
      req.user.user_id,
      loan_status,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Update Loan status',
    type: LoanEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({
    name: 'loanStatus',
    description: 'Loan Status',
    type: 'enum',
    enum: ELoanStatus,
  })
  @Put('/:id/new-loan-status/:loanStatus')
  async updateLoanStatus(
    @Param('id') loan_id: string,
    @Param('loanStatus') loan_status: ELoanStatus,
    @Req() req: any,
  ) {
    return await this.loanService.updateLoanStatus(
      loan_id,
      loan_status,
      req.user.role,
      req.user.user_id,
    );
  }
}
