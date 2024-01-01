/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import { ContributionService } from '../contribution/contribution.service';
import { PeriodicEarnService } from '../periodic-earn/periodic-earn.service';
import { LoanService } from '../loan/loan.service';
import { EUserRole } from 'src/enums/EUserRole';
import { ELoanStatus } from 'src/enums/ELoanStatus';

@Injectable()
export class TransactionsService {
  constructor(
    private contributionService: ContributionService,
    private periodicEarnService: PeriodicEarnService,
    private loanService: LoanService,
  ) {}

  public async getPersonalGroupTransactions(
    userId: string,
    groupId: string,
    role: EUserRole,
  ) {
    const contributions =
      await this.contributionService.getGroupUserContribution(
        userId,
        groupId,
        role,
      );

    const periodicEarnsResponse = await this.periodicEarnService.userEarnHistory(userId, groupId, role);
    const periodicEarns = periodicEarnsResponse.data;

    const paidLoansResponse = await this.loanService.getUserGroupLoanByStatus(groupId, role, userId, ELoanStatus.PAID);
    const paidLoans = paidLoansResponse.data;
    
    const nonPaidLoansResponse = await this.loanService.getUserGroupLoanByStatus(groupId, role, userId, ELoanStatus.PAYMENT_PENDING); 
    const nonPaidLoans = nonPaidLoansResponse.data;

    // const mergedArray = [
    //   ...contributions.map((item) => ({ ...item, type: 'CASH_OUT' })),
    //   ...periodicEarns.map((item) => ({ ...item, type: 'CASH_IN' })),
    //   ...paidLoans.map((item) => ({ ...item, type: 'PAID_LOAN' })),
    //   ...nonPaidLoans.map((item) => ({ ...item, type: 'NON_PAID_LOAN' })),
    // ];

    // // Sorting mergedArray based on created_at in ascending order
    // const sortedDataList = mergedArray.sort((a, b) => {
    //   const dateA = new Date(a.created_at).getTime();
    //   const dateB = new Date(b.created_at).getTime();
    //   return dateA - dateB;
    // });

    // return sortedDataList;

    const mergedArray = [
      ...contributions.map((item) => ({ ...item, type: 'CASH_OUT' })),
      ...periodicEarns.map((item) => ({ ...item, type: 'CASH_IN' })),
      ...paidLoans.map((item) => ({ ...item, type: 'PAID_LOAN' })),
      ...nonPaidLoans.map((item) => ({ ...item, type: 'NON_PAID_LOAN' })),
    ];

    // Sorting mergedArray based on created_at in ascending order
    const sortedDataList = mergedArray.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateA - dateB;
    });

    // Calculate total cash out and total cash in
    const totalCashOut = mergedArray
      .filter((item) => item.type === 'CASH_OUT')
      .reduce((acc, curr:any) => acc + Number(curr.amount), 0);

    const totalCashIn = mergedArray
      .filter((item) => item.type === 'CASH_IN')
      .reduce((acc, curr:any) => acc + Number(curr.amount), 0);

    const result = {
      transactions: sortedDataList,
      totalCashOut,
      totalCashIn,
    };

    return result;
  }
}
