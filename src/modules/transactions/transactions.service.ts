/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ContributionService } from '../contribution/contribution.service';
import { PeriodicEarnService } from '../periodic-earn/periodic-earn.service';
import { LoanService } from '../loan/loan.service';
import { EUserRole } from 'src/enums/EUserRole';
import { ELoanStatus } from 'src/enums/ELoanStatus';
import { LoanRequestsService } from '../loan-requests/loan-requests.service';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';

@Injectable()
export class TransactionsService {
  constructor(
    private contributionService: ContributionService,
    private periodicEarnService: PeriodicEarnService,
    private loanService: LoanService,
    private loanRequestService: LoanRequestsService,
    private groupService: GroupService,
    private groupMembersService: GroupMembersService,
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

    const periodicEarnsResponse =
      await this.periodicEarnService.userEarnHistory(userId, groupId, role);
    const periodicEarns = periodicEarnsResponse.data;

    const paidLoansResponse = await this.loanService.getUserGroupLoanByStatus(
      groupId,
      role,
      userId,
      ELoanStatus.PAID,
    );
    const paidLoans = paidLoansResponse.data;

    const nonPaidLoansResponse =
      await this.loanService.getUserGroupLoanByStatus(
        groupId,
        role,
        userId,
        ELoanStatus.PAYMENT_PENDING,
      );
    const nonPaidLoans = nonPaidLoansResponse.data;

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
      .reduce((acc, curr: any) => acc + Number(curr.amount), 0);

    const totalCashIn = mergedArray
      .filter((item) => item.type === 'CASH_IN')
      .reduce((acc, curr: any) => acc + Number(curr.amount), 0);

    const result = {
      transactions: sortedDataList,
      totalCashOut,
      totalCashIn,
    };

    return result;
  }

  public async getGroupLoanHistory(
    group_id: string,
    role: EUserRole,
    user_id: string,
  ) {
    const group = await this.groupService.findGroupById(group_id);
    if (!group) throw new NotFoundException('Group not found');

    await this.groupMembersService.findGroupMemberExists(
      user_id,
      group.id,
      role,
    );

    // const loans = await this.loanService.getAllGroupLoans(group_id);

    // const loanRequests = await this.loanRequestService.getAllGroupLoanRequest(group_id);

    // return {
    //   success: true,
    //   loans,
    //   loanRequests
    // };

    const loans = (await this.loanService.getAllGroupLoans(group_id)).map(
      (loan) => ({
        ...loan,
        type: 'LOAN',
      }),
    );

    const loanRequests = (
      await this.loanRequestService.getAllGroupLoanRequest(group_id)
    ).map((request) => ({
      type: 'LOAN_REQUEST',
      loan_request: request,
    }));

    // Sort loan requests based on created_at in ascending order
    loanRequests.sort((a, b) => {
      const dateA = new Date(a.loan_request.created_at).getTime();
      const dateB = new Date(b.loan_request.created_at).getTime();
      return dateA - dateB;
    });

    const mergedArray = [...loans, ...loanRequests];

    const sortedDataList = mergedArray.sort((a, b) => {
      const dateA = new Date(a.loan_request.created_at).getTime();
      const dateB = new Date(b.loan_request.created_at).getTime();
      return dateB - dateA; // Compare in reverse order for descending sort
    });

    return {
      success: true,
      loan_history: sortedDataList,
    };
  }
}
