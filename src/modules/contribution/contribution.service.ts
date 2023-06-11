import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContributionEntity } from './contribution.entity';
import { Repository } from 'typeorm';
import { AddContributionDto } from './dto/add-contribution.dto';
import { EUserRole } from 'src/enums/EUserRole';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { EStatus } from 'src/enums/EStatus';
import { ContributionTermService } from '../contribution-term/contribution-term.service';

@Injectable()
export class ContributionService {
    constructor(@InjectRepository(ContributionEntity)
     private contributionRepository: Repository<ContributionEntity>,
     private groupService: GroupService,
     private groupMembersService: GroupMembersService,
     private contributionTermService: ContributionTermService,
    ){

    }

    public async add(dto: AddContributionDto, user_id: string, role: EUserRole){
        const contributionTerm = await this.contributionTermService._getContributionTermById(dto.contribution_term);
        const group = await this.groupService.getGroupById(contributionTerm.group);
        if(!group) throw new NotFoundException("Group not found");

        if(role !== EUserRole.SYSTEM_ADMIN && user_id != group.data.group_owner.id) throw new BadRequestException("Access denied");
        // check if the user exists in a group 
        await this.groupMembersService.findGroupMemberExists(dto.user, contributionTerm.group);
     
       const contribution = await this.contributionRepository.save({...dto, created_by: user_id, group: group.data.id});
       return {
        success: true,
        message: 'Contribution saved successfully',
        data: contribution
       }
    }

    public async listTransactions(group_id: string, user_id: string, role: EUserRole){
        console.log(user_id);
        console.log(role);
        const group = await this.groupService.getGroupById(group_id);
        if(!group) throw new NotFoundException("Group not found");
        const isGroupMember = await this.groupMembersService.findGroupMemberExists(user_id, group_id);
        if(role !== EUserRole.SYSTEM_ADMIN && user_id != group.data.group_owner.id && !isGroupMember) throw new BadRequestException("Access denied");
        
        const list = await this.contributionRepository.find({where: {group: group_id}});
        return {
            success: true,
            data: list
        }
    }

    public async getById(contribution_id: string, user_id: string, role: EUserRole){
        const contribution = await this.contributionRepository.findOne({where: {id: contribution_id}});
        if(!contribution) throw new NotFoundException("Contribution not found");

        const group = await this.groupService.getGroupById(contribution.group);
        if(!group) throw new NotFoundException("Group not found");
       const existsInGroup =  await this.groupMembersService.findGroupMemberExists(user_id, contribution.group);

        if(role !== EUserRole.SYSTEM_ADMIN && user_id != group.data.group_owner.id && !existsInGroup) throw new BadRequestException("Access denied");
        
        return {
            success: true,
            data: contribution
        }
    }

    public async editStatus(contribution_id: string, user_id: string, role: EUserRole, status: EStatus){
        const contribution = await this.contributionRepository.findOne({where: {id: contribution_id}});
        if(!contribution) throw new NotFoundException("Contribution not found");
        const group = await this.groupService.getGroupById(contribution.group);
        if(!group) throw new NotFoundException("Group not found");
        if(role !== EUserRole.SYSTEM_ADMIN && user_id != group.data.group_owner.id) throw new BadRequestException("Access denied");
        
        await this.groupMembersService.findGroupMemberExists(user_id, contribution.group);
        const newContribution = await this.contributionRepository.update(contribution_id, {status})
        return {
            success: true,
            message: 'Contribution updated successfully',
            data: newContribution
        }
    }


    public async getContributionInfo(group: string, user: string) {
        const groupExists = await this.groupService.findGroupById(group);
        if (!groupExists) throw new NotFoundException("Group not found");
      
        await this.groupMembersService.findGroupMemberExists(user, group);
      
        const groupContributions = await this.contributionRepository.find({ where: { group } });
      
        let totalGroupContribution = 0;
        for (const contribution of groupContributions) {
          totalGroupContribution += parseInt(contribution.amount.toString());
        }
      
        let myTotalContribution = 0;
        for (const contribution of groupContributions) {
          if (contribution.user === user) {
            myTotalContribution += parseInt(contribution.amount.toString());;
          }
        }
      
        const contributionRatio = myTotalContribution / totalGroupContribution;
        const myShare = contributionRatio * 100;
      
        return {
          totalGroupContribution,
          myTotalContribution,
          contributionRatio: contributionRatio.toFixed(1),
          myShare: myShare.toFixed(1)
        };
      }
      
    
      
}
