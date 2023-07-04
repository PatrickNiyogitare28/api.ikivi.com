import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanRequestsEntity } from './loan-requests.entity';
import { Repository } from 'typeorm';
import { CreateLoanRequestDto } from './dto/loan-requests.dot';
import { EUserRole } from 'src/enums/EUserRole';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { ERequestStatus } from 'src/enums/ERequestStatus';
import { LoanService } from '../loan/loan.service';

@Injectable()
export class LoanRequestsService {
    constructor(
        @InjectRepository(LoanRequestsEntity)
        private loanRequestRepository: Repository<LoanRequestsEntity>,
        private readonly groupService: GroupService,
        private readonly groupMembersService: GroupMembersService,
        private readonly loanService: LoanService
    ){}

    public async create(createDto: CreateLoanRequestDto, user_id: string, role: EUserRole){
        const group  = await this.groupService.findGroupById(createDto.group);
        if(!group) throw new NotFoundException("Group not found");

        const isGroupMember = await this.groupMembersService.findGroupMemberExists(user_id, group.id);
        if(!isGroupMember && role != EUserRole.SYSTEM_ADMIN && group.group_owner.id != user_id) throw new BadGatewayException("Access denied");

        const userIsMember = await this.groupMembersService.findGroupMemberExists(createDto.user, group.id);
        if(!userIsMember) throw new BadRequestException("User is not a member");


        const interest = createDto.amount * createDto.interest_rate as any;
        const loanRequest = await this.loanRequestRepository.save({...createDto, interest, created_by: user_id, request_status: createDto.request_status as ERequestStatus} as any)

        if(!loanRequest) throw new BadRequestException("Loan not created");
        let loan;
        if(createDto.request_status === ERequestStatus.APPROVED) loan = await this.loanService.create({loan_request: loanRequest.id, updated_by: user_id})

        const responsePayload = {
            success: true,
            message: 'Loan requested successfully',
            data: loanRequest
        }
    
        if(loan) responsePayload['loan'] = loan;
        return responsePayload;
    }

    public async updateLoanRequestStatus(request_id: string, new_request_status: ERequestStatus, user_id: string, role: EUserRole){
        const requestExists =  await this.loanRequestRepository.findOne({where: {id: request_id}});
        if(!requestExists) throw new BadRequestException("Loan request not found");

        const group  = await this.groupService.findGroupById((requestExists as any).group.id);
        if(!group) throw new NotFoundException("Group not found");

        const isGroupMember = await this.groupMembersService.findGroupMemberExists(user_id, group.id);
        if(!isGroupMember && role != EUserRole.SYSTEM_ADMIN && group.group_owner.id != user_id) throw new BadGatewayException("Access denied");

        const newRequest = await this.loanRequestRepository.update(request_id, {request_status: new_request_status});
        return {
            success: true,
            message: 'Request status updated successfully',
            data: newRequest
        }
    }

    public async getRequestById(request_id: string, user_id: string, role: EUserRole){
        const requestExists =  await this.loanRequestRepository.findOne({where: {id: request_id}});
        if(!requestExists) throw new BadRequestException("Loan request not found");

        const group  = await this.groupService.findGroupById(((requestExists as any).group.id as string));
        if(!group) throw new NotFoundException("Group not found");

        const isGroupMember = await this.groupMembersService.findGroupMemberExists(user_id, group.id);
        if(!isGroupMember && role != EUserRole.SYSTEM_ADMIN && group.group_owner.id != user_id) throw new BadGatewayException("Access denied");

        return {
            success: true,
            data: requestExists
        }
    }

    

    public async getRequestsByGroup(group_id: string, user_id: string, role: EUserRole){
        const group  = await this.groupService.findGroupById(group_id);
        if(!group) throw new NotFoundException("Group not found");

        const isGroupMember = await this.groupMembersService.findGroupMemberExists(user_id, group.id);
        if(!isGroupMember && role != EUserRole.SYSTEM_ADMIN && group.group_owner.id != user_id) throw new BadGatewayException("Access denied");

       const data = await this.loanRequestRepository.find({where: {group: group.id}});
       return {
        success: true,
        data
       }
    }

    public async getRequestsByGroupAndStatus(group_id: string, request_status: ERequestStatus, user_id: string, role: EUserRole){
        const group  = await this.groupService.findGroupById(group_id);
        if(!group) throw new NotFoundException("Group not found");

        const isGroupMember = await this.groupMembersService.findGroupMemberExists(user_id, group.id);
        if(!isGroupMember && role != EUserRole.SYSTEM_ADMIN && group.group_owner.id != user_id) throw new BadGatewayException("Access denied");
       const data = await this.loanRequestRepository.find({where: {group: group.id, request_status}});
       return {
        success: true,
        data
       }
    }

    public async getUserLoanRequests(group_id: string, user_id: string, role: EUserRole){
        const group  = await this.groupService.findGroupById(group_id);
        if(!group) throw new NotFoundException("Group not found");

        const isGroupMember = await this.groupMembersService.findGroupMemberExists(user_id, group.id);
        if(!isGroupMember && role != EUserRole.SYSTEM_ADMIN && group.group_owner.id != user_id) throw new BadGatewayException("Access denied");

       const data = await this.loanRequestRepository.find({where: {group: group.id, user: user_id}});
       return {
        success: true,
        data
       }
    }

}
