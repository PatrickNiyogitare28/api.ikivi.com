/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMembersEntity } from './group-members.entity';
import { Repository } from 'typeorm';
import { CreateGroupMemberDto } from './dto/group-members.dto';
import { EUserRole } from 'src/enums/EUserRole';
import { GroupService } from '../group/group.service';
import { EStatus } from 'src/enums/EStatus';
import { LogsService } from '../logs/logs.service';
import { CreateLogDto } from '../logs/dto/log.dto';
import { UserService } from '../user/user.service';
import { EActionType } from 'src/enums/EActionTypes';
import { ENotificationType } from 'src/enums/ENotificationType';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class GroupMembersService {
  constructor(
    @InjectRepository(GroupMembersEntity)
    private groupMembersRepository: Repository<GroupMembersEntity>,
    private groupService: GroupService,
    private logsService: LogsService,
    private userService: UserService,
    private notificationService: NotificationsService,
  ) {}

  public async addMember(createGroupMemberDto: CreateGroupMemberDto) {
    try {
      const existsInGroup = await this.groupMembersRepository.findOne({
        where: {
          group: createGroupMemberDto.group,
          user: createGroupMemberDto.user,
        },
      });
      if (existsInGroup)
        throw new BadRequestException('Member already exists in group');
      const membership = await this.groupMembersRepository.save(
        createGroupMemberDto,
      );
      const userInfo = await this.userService.findUser({
        id: createGroupMemberDto.user,
      });
      const newLogDto: CreateLogDto = {
        group_id: createGroupMemberDto.group,
        message: `${userInfo.first_name} ${userInfo.last_name} Joined group`,
        action: EActionType.JOINED_GROUP,
        data: membership,
      };
      await this.logsService.saveLog(newLogDto);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new InternalServerErrorException(e.message);
    }
  }

  public async getGroupMembers(
    group_id: string,
    role: EUserRole,
    user_id: string,
  ) {
    const group = await this.groupService.findGroupById(group_id);
    if (!group) throw new NotFoundException('Group not found');
    const existsInGroup = await this.groupMembersRepository.findOne({
      where: { group: group_id, user: user_id },
    });
    if (
      !existsInGroup &&
      role !== EUserRole.SYSTEM_ADMIN &&
      group.group_owner.id !== user_id
    )
      throw new BadRequestException('Access denied');
    const members = await this.groupMembersRepository.find({
      where: { group: group_id },
    });
    return {
      success: true,
      data: members,
    };
  }

  public async removeFromGroup(
    group_id: string,
    member_id: string,
    role: EUserRole,
    user_id: string,
  ) {
    const group = await this.groupService.findGroupById(group_id);
    if (!group) throw new NotFoundException('Group not found');
    if (group.group_owner.id != user_id && role != EUserRole.SYSTEM_ADMIN)
      throw new BadRequestException('Access denied');
    const isMember = await this.groupMembersRepository.findOne({
      where: { group: group_id, user: member_id },
    });
    if (!isMember) throw new NotFoundException('User not found in this group');
    await this.groupMembersRepository.delete(isMember.id);

    const userInfo = await this.userService.findUser({ id: isMember.user });
    const newLogDto: CreateLogDto = {
      group_id: group_id,
      message: `${userInfo.first_name} ${userInfo.last_name} removed from group`,
      action: EActionType.JOINED_GROUP,
      data: isMember,
    };
    await this.logsService.saveLog(newLogDto);

    return {
      success: true,
      message: 'Member deleted successfully',
    };
  }

  public async findGroupMemberExists(
    user_id: string,
    group_id: string,
    role: EUserRole,
  ) {
    const exists = await this.groupMembersRepository.findOne({
      where: { user: user_id, group: group_id, membership: EStatus.ACTIVE },
    });
    const group = await this.groupService.findGroupById(group_id);
    if (
      !exists &&
      group.group_owner.id !== user_id &&
      role != EUserRole.SYSTEM_ADMIN
    )
      throw new NotFoundException('User not a member of the group');
    return exists ? exists : true;
  }

  public async getUserMemberships(user_id: string) {
    const memberships = await this.groupMembersRepository.find({
      where: { user: user_id },
    });
    return {
      success: true,
      data: memberships,
    };
  }

  public async listAllMembers(group: string) {
    const members = await this.groupMembersRepository.find({
      where: { group: group },
    });
    return members;
  }

  public async broadCastNotification(
    group: string,
    message: string,
    notificationType: ENotificationType,
  ) {
    const groupMembers = await this.groupMembersRepository.find({
      where: { group },
    });

    groupMembers.forEach(async (member) => {
      const notification = {
        group,
        user: member.id,
        type: notificationType,
        message,
      };
      await this.notificationService.create(notification);
    });
  }
}
