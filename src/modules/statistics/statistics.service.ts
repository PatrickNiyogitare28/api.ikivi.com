import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from '../group/group.entity';
import { EUserRole } from 'src/enums/EUserRole';
import { GroupService } from '../group/group.service';
import { ContributionService } from '../contribution/contribution.service';
import { GroupMembersService } from '../group-members/group-members.service';

@Injectable()
export class StatisticsService {
    constructor(
        private readonly groupService: GroupService,
        private readonly contributionService: ContributionService,
        private readonly groupMemberService: GroupMembersService
    ){}

    public async getGroupStatistics(group_id: string, user_id: string, role: EUserRole){
        // should be a group member
        await this.groupMemberService.findGroupMemberExists(user_id, group_id, role);
       
        const groupMembers = await this.groupMemberService.listAllMembers(group_id);
        
    }
}
