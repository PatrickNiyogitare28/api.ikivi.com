import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContributionEntity } from './contribution.entity';
import { Repository } from 'typeorm';
import { AddContributionDto } from './dto/add-contribution.dto';
import { EUserRole } from 'src/enums/EUserRole';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { EStatus } from 'src/enums/EStatus';
import { ContributionTermService } from '../contribution-term/contribution-term.service';
import { LogsService } from '../logs/logs.service';
import { LogEntity } from '../logs/logs.entity';
import { CreateLogDto } from '../logs/dto/log.dto';
import { EActionType } from 'src/enums/EActionTypes';
import { UserService } from '../user/user.service';
import { GroupInfoService } from '../group-info/group-info.service';
import { UserEntity } from '../user/users.entity';

@Injectable()
export class ContributionService {
  constructor(
    @InjectRepository(ContributionEntity)
    private contributionRepository: Repository<ContributionEntity>,
    private groupService: GroupService,
    private groupMembersService: GroupMembersService,
    private contributionTermService: ContributionTermService,
    private logsService: LogsService,
    private userService: UserService,
    private groupInfoService: GroupInfoService,
  ) {}

  public async add(dto: AddContributionDto, user_id: string, role: EUserRole) {
    const contributionTerm =
      await this.contributionTermService._getContributionTermById(
        dto.contribution_term,
      );
    const group = await this.groupService.getGroupById(
      (contributionTerm.group as any).id,
    );
    if (!group) throw new NotFoundException('Group not found');

    if (role !== EUserRole.SYSTEM_ADMIN && user_id != group.data.group_owner.id)
      throw new BadRequestException('Access denied');
    // check if the user exists in a group

    await this.groupMembersService.findGroupMemberExists(
      dto.user,
      (contributionTerm.group as any).id,
      role,
    );

    const contribution = await this.contributionRepository.save({
      ...dto,
      created_by: user_id,
      group: (contributionTerm.group as any).id,
    });

    const userInfo = await this.userService.findUser({ id: dto.user });
    const log: CreateLogDto = {
      group_id: (contributionTerm.group as any).id,
      message: `${userInfo.first_name} ${userInfo.last_name} sent contribution`,
      action: EActionType.PERIODIC_CONTRIBUTION_TRANSACTION_SUCCESS,
      actor_id: user_id,
      data: contribution,
    };
    await this.logsService.saveLog(log);
    await this.groupInfoService.addOnGroupCapital({
      group: group.data.id,
      updated_by: user_id,
      amount: dto.amount,
    });
    return {
      success: true,
      message: 'Contribution saved successfully',
      data: contribution,
    };
  }

  public async listTransactions(
    group_id: string,
    user_id: string,
    role: EUserRole,
  ) {
    const group = await this.groupService.getGroupById(group_id);
    if (!group) throw new NotFoundException('Group not found');
    const isGroupMember = await this.groupMembersService.findGroupMemberExists(
      user_id,
      group_id,
      role,
    );
    if (
      role !== EUserRole.SYSTEM_ADMIN &&
      user_id != group.data.group_owner.id &&
      !isGroupMember
    )
      throw new BadRequestException('Access denied');

    const list = await this.contributionRepository.find({
      where: { group: group_id },
    });
    return {
      success: true,
      data: list,
    };
  }

  public async getById(
    contribution_id: string,
    user_id: string,
    role: EUserRole,
  ) {
    const contribution = await this.contributionRepository.findOne({
      where: { id: contribution_id },
    });
    if (!contribution) throw new NotFoundException('Contribution not found');

    const group = await this.groupService.getGroupById(contribution.group);
    if (!group) throw new NotFoundException('Group not found');
    const existsInGroup = await this.groupMembersService.findGroupMemberExists(
      user_id,
      contribution.group,
      role,
    );

    if (
      role !== EUserRole.SYSTEM_ADMIN &&
      user_id != group.data.group_owner.id &&
      !existsInGroup
    )
      throw new BadRequestException('Access denied');

    return {
      success: true,
      data: contribution,
    };
  }

  public async editStatus(
    contribution_id: string,
    user_id: string,
    role: EUserRole,
    status: EStatus,
  ) {
    const contribution = await this.contributionRepository.findOne({
      where: { id: contribution_id },
    });
    if (!contribution) throw new NotFoundException('Contribution not found');
    const group = await this.groupService.getGroupById(contribution.group);
    if (!group) throw new NotFoundException('Group not found');
    if (role !== EUserRole.SYSTEM_ADMIN && user_id != group.data.group_owner.id)
      throw new BadRequestException('Access denied');

    await this.groupMembersService.findGroupMemberExists(
      user_id,
      contribution.group,
      role,
    );
    const newContribution = await this.contributionRepository.update(
      contribution_id,
      { status },
    );
    return {
      success: true,
      message: 'Contribution updated successfully',
      data: newContribution,
    };
  }

  public async getContributionInfo(
    group: string,
    user: string,
    role: EUserRole,
  ) {
    const groupExists = await this.groupService.findGroupById(group);
    if (!groupExists) throw new NotFoundException('Group not found');

    await this.groupMembersService.findGroupMemberExists(user, group, role);

    const groupContributions = await this.contributionRepository.find({
      where: { group },
    });

    let totalGroupContribution = 0;
    for (const contribution of groupContributions) {
      totalGroupContribution += parseInt(contribution.amount.toString());
    }

    let myTotalContribution = 0;
    for (const contribution of groupContributions) {
      if ((contribution.user as any as UserEntity).id == user) {
        myTotalContribution += parseInt(contribution.amount.toString());
      }
    }

    const contributionRatio = myTotalContribution / totalGroupContribution;
    const myShare = contributionRatio * 100;

    return {
      totalGroupContribution,
      myTotalContribution,
      contributionRatio: contributionRatio.toFixed(1),
      myShare: myShare.toFixed(1),
    };
  }
}
