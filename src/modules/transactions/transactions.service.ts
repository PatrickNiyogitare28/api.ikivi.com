/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import { ContributionService } from '../contribution/contribution.service';
import { PeriodicEarnService } from '../periodic-earn/periodic-earn.service';
import { LoanService } from '../loan/loan.service';
import { EUserRole } from 'src/enums/EUserRole';

@Injectable()
export class TransactionsService {
  constructor(
    private contributionService: ContributionService,
    private periodicEarn: PeriodicEarnService,
    private loanService: LoanService,
  ) {}

  public async getPersonalGroupTransactions(
    groupId: string,
    userId: string,
    role: EUserRole,
  ) {
    const contributions =
      await this.contributionService.getGroupUserContribution(
        userId,
        groupId,
        role,
      );
    return contributions;
  }
}
