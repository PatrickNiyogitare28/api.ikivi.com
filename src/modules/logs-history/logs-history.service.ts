import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogEntity } from '../logs/logs.entity';
import { Repository } from 'typeorm';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { EUserRole } from 'src/enums/EUserRole';

@Injectable()
export class LogsHistoryService {
  constructor(
    @InjectRepository(LogEntity)
    private logsEntity: Repository<LogEntity>,
    private groupService: GroupService,
    private groupMembersService: GroupMembersService,
  ) {}

  public async getGroupHistory(
    group_id: string,
    user_id: string,
    role: EUserRole,
  ) {
    const group = await this.groupService.findGroupById(group_id);
    if (!group) throw new NotFoundException('Group not found');

    const isGroupMember = await this.groupMembersService.findGroupMemberExists(
      user_id,
      group_id,
    );

    if (!isGroupMember && role !== EUserRole.SYSTEM_ADMIN)
      throw new BadRequestException('Access denied');

    const logs = await this.logsEntity.find({ where: { group_id } });
    return {
      data: logs,
    };
  }
}
