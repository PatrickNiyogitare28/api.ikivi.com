import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EUserRole } from 'src/enums/EUserRole';
import { ContributionService } from '../contribution/contribution.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupInfoEntity } from '../group-info/grouup-interests.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(GroupInfoEntity)
    private readonly groupInfoRepository: Repository<GroupInfoEntity>,
    private readonly contributionService: ContributionService,
    private readonly groupMemberService: GroupMembersService,
  ) {}

  public async getGroupStatistics(
    group_id: string,
    user_id: string,
    role: EUserRole,
  ) {
    // should be a group member
    await this.groupMemberService.findGroupMemberExists(
      user_id,
      group_id,
      role,
    );
    const groupMembers = await this.groupMemberService.listAllMembers(group_id);
    const groupInfo = await this.groupInfoRepository.findOne({
      where: { group: group_id },
    });
    const contributionsInfo =
      await this.contributionService.getContributionInfo(
        group_id,
        user_id,
        role,
      );
    const stats = {
      groupMembers,
      groupInfo,
      contributionsInfo,
    };
    return stats;
  }
}
