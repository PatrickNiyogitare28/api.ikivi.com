import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanEntity } from './loan.entity';
import { Repository } from 'typeorm';
import { CreateLoanDto } from './dto/loan.dto';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { EUserRole } from 'src/enums/EUserRole';
import { ELoanStatus } from 'src/enums/ELoanStatus';
import { GroupEntity } from '../group/group.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(LoanEntity)
    private readonly loanRepository: Repository<LoanEntity>,
    private readonly groupService: GroupService,
    private readonly groupMembersService: GroupMembersService
  ) {}

  public async create(newLoanDto: CreateLoanDto) {
    const loan = await this.loanRepository.save(newLoanDto as any);
    return loan;
  }

  public async getGroupLoans(group_id: string, role: EUserRole, user_id: string) {
    const group  = await this.groupService.findGroupById(group_id);
    if(!group) throw new NotFoundException("Group not found");

    const isGroupMember = await this.groupMembersService.findGroupMemberExists(user_id, group.id);
    if(!isGroupMember && role != EUserRole.SYSTEM_ADMIN && group.group_owner.id != user_id) throw new BadGatewayException("Access denied");

    const loans = await this.loanRepository.find({
      where: { loan_request: { group: group_id } }, relations: ['loan_request']
    });
    return {
      success: true,
      data: loans,
    };
  }

  public async getGroupLoansByStatus(group_id: string, role: EUserRole, user_id: string, loan_status: ELoanStatus) {
    const group  = await this.groupService.findGroupById(group_id);
    if(!group) throw new NotFoundException("Group not found");

    const isGroupMember = await this.groupMembersService.findGroupMemberExists(user_id, group.id);
    if(!isGroupMember && role != EUserRole.SYSTEM_ADMIN && group.group_owner.id != user_id) throw new BadGatewayException("Access denied");

    const loans = await this.loanRepository.find({
      where: { loan_request: { group: group_id }, loan_status  }, relations: ['loan_request']
    });
    return {
      success: true,
      data: loans,
    };
  }

  public async getUserGroupLoan(group_id: string, role: EUserRole, user_id: string) {
    const group  = await this.groupService.findGroupById(group_id);
    if(!group) throw new NotFoundException("Group not found");

    const isGroupMember = await this.groupMembersService.findGroupMemberExists(user_id, group.id);
    if(!isGroupMember && role != EUserRole.SYSTEM_ADMIN && group.group_owner.id != user_id) throw new BadGatewayException("Access denied");

    const loans = await this.loanRepository.find({
      where: { loan_request: { group: group_id, user: user_id } }, relations: ['loan_request']
    });
    return {
      success: true,
      data: loans,
    };
  }

  public async getUserGroupLoanByStatus(group_id: string, role: EUserRole, user_id: string, loan_status: ELoanStatus) {
    const group  = await this.groupService.findGroupById(group_id);
    if(!group) throw new NotFoundException("Group not found");

    const isGroupMember = await this.groupMembersService.findGroupMemberExists(user_id, group.id);
    if(!isGroupMember && role != EUserRole.SYSTEM_ADMIN && group.group_owner.id != user_id) throw new BadGatewayException("Access denied");

    const loans = await this.loanRepository.find({
      where: { loan_request: { group: group_id, user: user_id }, loan_status }, relations: ['loan_request']
    });
    return {
      success: true,
      data: loans,
    };
  }

  public async updateLoanStatus(loan_id: string, loan_status: ELoanStatus,role: EUserRole, user_id: string) {
    const loanExists = await this.loanRepository.findOne({where: {id: loan_id}});
    if(!loanExists) throw new NotFoundException("Loan not found");

    const group: GroupEntity  = await this.groupService.findGroupById((loanExists.loan_request.group as any).id);
    if(!group) throw new NotFoundException("Group not found");

    if(role != EUserRole.SYSTEM_ADMIN && group.group_owner.id != user_id) throw new BadGatewayException("Access denied");

    const newLoan = await this.loanRepository.update(loan_id, {loan_status})

    return {
      success: true,
      message: "Loan status updated successfully",
      data: newLoan
    };
  }
}
