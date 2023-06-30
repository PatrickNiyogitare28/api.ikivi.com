import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContributionTermEntity } from './contribution-term.entity';
import { Repository } from 'typeorm';
import { CreateContributionTermDto } from './dto/contribution-term.dto';
import { EUserRole } from 'src/enums/EUserRole';
import { GroupService } from '../group/group.service';
import { EStatus } from 'src/enums/EStatus';
import { GroupMembersService } from '../group-members/group-members.service';

@Injectable()
export class ContributionTermService {
  constructor(
    @InjectRepository(ContributionTermEntity)
    private readonly contributionTermRepository: Repository<ContributionTermEntity>,
    private readonly groupService: GroupService,
    private readonly groupMembersService: GroupMembersService,
  ) {}

  public async openContributionTerm(
    createTermDto: CreateContributionTermDto,
    role: EUserRole,
    user_id: string,
  ) {
    const { group } = createTermDto;
    const groupExists = await this.groupService.findGroupById(group);
    if (!groupExists) throw new NotFoundException('Group not found');
    const isGroupMember = await this.groupMembersService.findGroupMemberExists(
      user_id,
      group,
    );

    if (
      role !== EUserRole.SYSTEM_ADMIN &&
      groupExists.group_owner.id != user_id &&
      !isGroupMember
    )
      throw new BadRequestException('Access denied to perform this action');
    await this._disableOtherTerms(group);
    const term = await this.contributionTermRepository.save(createTermDto);
    return {
      success: true,
      data: term,
    };
  }

  public async getContributionTerms(
    group_id: string,
    role: EUserRole,
    user_id: string,
  ) {
    const groupExists = await this.groupService.findGroupById(group_id);
    if (!groupExists) throw new NotFoundException('Group not found');
    const isGroupMember = await this.groupMembersService.findGroupMemberExists(
      user_id,
      group_id,
    );
    if (
      role !== EUserRole.SYSTEM_ADMIN &&
      groupExists.group_owner.id != user_id &&
      !isGroupMember
    )
      throw new BadRequestException('Access denied to perform this action');
    const terms = await this.contributionTermRepository.find({
      where: { group: group_id },
    });
    return terms;
  }

  public async getActiveContributionTerm(
    group_id: string,
    role: EUserRole,
    user_id: string,
  ) {
    const groupExists = await this.groupService.findGroupById(group_id);
    if (!groupExists) throw new NotFoundException('Group not found');
    const isGroupMember = await this.groupMembersService.findGroupMemberExists(
      user_id,
      group_id,
    );
    if (
      role !== EUserRole.SYSTEM_ADMIN &&
      groupExists.group_owner.id != user_id &&
      !isGroupMember
    )
      throw new BadRequestException('Access denied to perform this action');
    const term = await this.contributionTermRepository.findOne({
      where: { group: group_id, status: EStatus.ACTIVE },
    });
    if (!term) return { success: true, message: 'No active group term found' };
    return term;
  }

  public async inactiveContributionTerm(
    term_id: string,
    role: EUserRole,
    user_id: string,
  ) {
    const term = await this.contributionTermRepository.findOne({
      where: { id: term_id },
    });
    if (!term) throw new NotFoundException('Contribution term not found');
    const groupExists = await this.groupService.findGroupById(term.group);
    if (!groupExists) throw new NotFoundException('Group not found');
    if (
      role !== EUserRole.SYSTEM_ADMIN &&
      groupExists.group_owner.id != user_id
    )
      throw new BadRequestException('Access denied to perform this action');
    term.status = EStatus.INACTIVE;
    await this.contributionTermRepository.save(term);
    return {
      success: true,
      message: 'Contribution term has been set to INACTIVE',
    };
  }

  public async _getContributionTermById(id: string) {
    try {
      const contribution = await this.contributionTermRepository.findOne({
        where: { id, status: EStatus.ACTIVE },
      });
      if (!contribution) throw new NotFoundException('Contribution not found');
      return contribution;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  public async _disableOtherTerms(group_id: string) {
    await this.contributionTermRepository.update(
      { group: group_id },
      { status: EStatus.INACTIVE },
    );
  }
}
