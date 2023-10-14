import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EUserRole } from 'src/enums/EUserRole';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { EStatus } from 'src/enums/EStatus';
import { ContributionTermService } from '../contribution-term/contribution-term.service';
import { PeriodicEarnEntity } from './periodic-earn.entity';
import { AddPeriodicEarnDto } from './dto/periodic-earn.dto';
import { UserService } from '../user/user.service';
import { CreateLogDto } from '../logs/dto/log.dto';
import { EActionType } from 'src/enums/EActionTypes';
import { LogsService } from '../logs/logs.service';
import { GroupInfoService } from '../group-info/group-info.service';

@Injectable()
export class PeriodicEarnService {
  constructor(
    @InjectRepository(PeriodicEarnEntity)
    private periodicEarnRepository: Repository<PeriodicEarnEntity>,
    private groupService: GroupService,
    private groupMembersService: GroupMembersService,
    private contributionTermService: ContributionTermService,
    private userService: UserService,
    private logsService: LogsService,
    private groupInfoService: GroupInfoService
  ) {}

  public async add(dto: AddPeriodicEarnDto, user_id: string, role: EUserRole) {
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
      group.data.id,
      role
    );

    const periodicEarn = await this.periodicEarnRepository.save({
      ...dto,
      created_by: user_id,
      group: group.data.id,
    });
    const userInfo = await this.userService.findUser({ id: dto.user });
    const newLog: CreateLogDto = {
      group_id: group.data.id,
      message:
        dto?.notes ||
        `${userInfo.first_name} ${userInfo.last_name} received periodic earn`,
      action: EActionType.RECEIVED_PERIODIC_EARN,
      actor_id: user_id,
      data: {
        user: userInfo,
        periodicEarn,
        contributionTerm,
      },
    };
    await this.logsService.saveLog(newLog);
    await this.groupInfoService.groupOfferedPeriodicContribution({
      group: group.data.id,
      updated_by: user_id,
      amount: dto.amount
    })
    return {
      success: true,
      message: 'Periodic earn saved successfully',
      data: periodicEarn,
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
      role
    );
    if (
      role !== EUserRole.SYSTEM_ADMIN &&
      user_id != group.data.group_owner.id &&
      !isGroupMember
    )
      throw new BadRequestException('Access denied');

    const list = await this.periodicEarnRepository.find({
      where: { group: group_id },
    });
    return {
      success: true,
      data: list,
    };
  }

  public async getById(
    periodic_earn_id: string,
    user_id: string,
    role: EUserRole,
  ) {
    const periodicEarn = await this.periodicEarnRepository.findOne({
      where: { id: periodic_earn_id },
    });
    if (!periodicEarn) throw new NotFoundException('Periodic earn not found');

    const group = await this.groupService.getGroupById(periodicEarn.group);
    if (!group) throw new NotFoundException('Group not found');
    const existsInGroup = await this.groupMembersService.findGroupMemberExists(
      user_id,
      periodicEarn.group,
      role
    );

    if (
      role !== EUserRole.SYSTEM_ADMIN &&
      user_id != group.data.group_owner.id &&
      !existsInGroup
    )
      throw new BadRequestException('Access denied');

    return {
      success: true,
      data: periodicEarn,
    };
  }

  public async editStatus(
    periodic_earn_id: string,
    user_id: string,
    role: EUserRole,
    status: EStatus,
  ) {
    const periodicEarn = await this.periodicEarnRepository.findOne({
      where: { id: periodic_earn_id },
    });
    if (!periodicEarn) throw new NotFoundException('Periodic earn not found');
    const group = await this.groupService.getGroupById(periodicEarn.group);
    if (!group) throw new NotFoundException('Group not found');
    if (role !== EUserRole.SYSTEM_ADMIN && user_id != group.data.group_owner.id)
      throw new BadRequestException('Access denied');

    await this.groupMembersService.findGroupMemberExists(
      user_id,
      periodicEarn.group,
      role
    );
    const newPeriodicEarn = await this.periodicEarnRepository.update(
      periodic_earn_id,
      { status },
    );
    return {
      success: true,
      message: 'Periodic earn updated successfully',
      data: newPeriodicEarn,
    };
  }

  public async userEarnHistory(user_id: string, group_id: string, role: EUserRole) {
    const userExistsInGroup =
      await this.groupMembersService.findGroupMemberExists(user_id, group_id, role);
    if (!userExistsInGroup) throw new BadRequestException('Access denied');
    const history = await this.periodicEarnRepository.find({
      where: { user: user_id, group: group_id },
    });
    return {
      success: true,
      data: history,
    };
  }
}
