import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupInfoEntity } from './grouup-interests.entity';
import { Repository } from 'typeorm';
import {
  AddOnGroupTotalCapitalDto,
  GroupOfferedPeriodicContributionDto,
  InitializeGroupInfoDto,
  LoanFullyPaidDto,
  loanOfferedDto,
} from './dto/group-info.dto';
import Decimal from 'decimal.js';

@Injectable()
export class GroupInfoService {
  constructor(
    @InjectRepository(GroupInfoEntity)
    private groupInfoRepository: Repository<GroupInfoEntity>,
  ) {}

  // Initialize group info
  public async initialGroupInfo(dto: InitializeGroupInfoDto) {
    const groupInfo = await this.groupInfoRepository.save(dto);
    return groupInfo;
  }

  // Add on group total capital.
  public async addOnGroupCapital(dto: AddOnGroupTotalCapitalDto) {
    const { group, updated_by, amount } = dto;

    const groupInfo = await this.groupInfoRepository.findOne({
      where: { group },
    });
    if (!groupInfo) {
      await this.initialGroupInfo({ group, updated_by });
      return this.addOnGroupCapital(dto);
    }
    // update saving the new total capital here
    const newCapital = groupInfo.total_capital.add(new Decimal(amount));
    const newAvailableAmount = groupInfo.available_amount.add(
      new Decimal(amount),
    );
    groupInfo.total_capital = newCapital;
    groupInfo.available_amount = newAvailableAmount;
    await this.groupInfoRepository.save(groupInfo);
    return groupInfo;
  }

  // Handle loan given
  public async groupOfferedLoan(dto: loanOfferedDto) {
    const { group, updated_by, loan_amount, amount_topay } = dto;
    const groupInfo = await this.groupInfoRepository.findOne({
      where: { group },
    });
    if (!groupInfo) {
      await this.initialGroupInfo({ group, updated_by });
      return this.groupOfferedLoan(dto);
    }

    const updatedGroupAvailableAmount =
      (groupInfo.available_amount as any) - loan_amount;
    const interest = amount_topay - loan_amount;
    const decimalInterest = new Decimal(interest);
    const newInterest = groupInfo.current_interest.add(decimalInterest);

    const updatedTotalLoans = groupInfo.total_loans + loan_amount;
    const updatedCurrentUnpaidLoan =
      groupInfo.current_unpaid_loan + loan_amount;

    groupInfo.available_amount = new Decimal(updatedGroupAvailableAmount);
    groupInfo.current_interest = newInterest;
    groupInfo.total_loans = updatedTotalLoans;
    groupInfo.current_unpaid_loan = updatedCurrentUnpaidLoan;

    await this.groupInfoRepository.save(groupInfo);
    return groupInfo;
  }

  // Loan paid
  public async groupLoanFullyPaid(dto: LoanFullyPaidDto) {
    const { group, updated_by, amount_paid, interest } = dto;
    const groupInfo = await this.groupInfoRepository.findOne({
      where: { group },
    });
    if (!groupInfo) {
      await this.initialGroupInfo({ group, updated_by });
      return this.groupLoanFullyPaid(dto);
    }

    // we need to update the capital with interest -> done
    // we need to update the total available amount -> done
    // we need to reduce the unpaid loans with amount paid -> done
    // we need to update interest not current interest -> done
    // ** think about what to do with total_loans -> done

    const newCapital = groupInfo.total_capital.add(new Decimal(interest));
    const newAvailableAmount = groupInfo.available_amount.add(
      amount_paid + interest,
    );
    const newUnpaidLoan = groupInfo.current_unpaid_loan.sub(amount_paid);
    const newInterest = groupInfo.available_interest.add(new Decimal(interest));

    groupInfo.total_capital = newCapital;
    groupInfo.available_amount = newAvailableAmount;
    groupInfo.current_unpaid_loan = newUnpaidLoan;
    groupInfo.available_interest = newInterest;

    await this.groupInfoRepository.save(groupInfo);
    return groupInfo;
  }

  // group offered contribution
  public async groupOfferedPeriodicContribution(
    dto: GroupOfferedPeriodicContributionDto,
  ) {
    const { group, amount, updated_by } = dto;
    const groupInfo = await this.groupInfoRepository.findOne({
      where: { group },
    });
    if (!groupInfo) {
      await this.initialGroupInfo({ group, updated_by });
      return this.groupOfferedPeriodicContribution(dto);
    }
    const newGroupAvailableAmount = groupInfo.available_amount.sub(
      new Decimal(amount),
    );
    groupInfo.available_amount = newGroupAvailableAmount;

    await this.groupInfoRepository.save(groupInfo);
    return groupInfo;
  }
}
