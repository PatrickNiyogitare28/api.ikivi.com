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

@Injectable()
export class GroupMembersService {
  constructor(
    @InjectRepository(GroupMembersEntity)
    private groupMembersRepository: Repository<GroupMembersEntity>,
    private groupService: GroupService,
  ) {}

  public async addMember(createGroupMemberDto: CreateGroupMemberDto) {
    console.log('created member ....');
    console.log(createGroupMemberDto);
    try {
      const existsInGroup = await this.groupMembersRepository.findOne({
        where: {
          group: createGroupMemberDto.group,
          user: createGroupMemberDto.user,
        },
      });
      console.log(existsInGroup);
      if (existsInGroup)
        throw new BadRequestException('Member already exists in group');
      await this.groupMembersRepository.save(createGroupMemberDto);
    } catch (e) {
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
    return {
      success: true,
      message: 'Member deleted successfully',
    };
  }

  public async findGroupMemberExists(user_id: string, group_id: string) {
    const exists = await this.groupMembersRepository.findOne({
      where: { user: user_id, group: group_id, membership: EStatus.ACTIVE },
    });
    if (!exists) throw new NotFoundException('User not a member of the group');
    return exists;
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
}
