/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, HttpCode, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { ContributionEntity } from '../contribution/contribution.entity';

@Controller('transactions')
@ApiTags('Transactions')
@ApiBearerAuth()
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get('/group/:groupId')
  @ApiResponse({
    status: 201,
    description: 'Term crated successfully',
    type: ContributionEntity,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Not Found Error' })
  @HttpCode(201)
  async getUserTransactions(
    @Req() req: any,
    @Param('groupId') groupId: string,
  ): Promise<any> {
    return await this.transactionService.getPersonalGroupTransactions(
      req.user.user_id,
      groupId,
      req.user.role,
    );
  }
}
