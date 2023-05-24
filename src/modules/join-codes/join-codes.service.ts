import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JoinCodesEntity } from './join-codes.entity';
import { EStatus } from 'src/enums/EStatus';
import { EUserRole } from 'src/enums/EUserRole';
import { GroupService } from '../group/group.service';
import { generateRandomCode } from 'src/helpers/misc';

@Injectable()
export class JoinCodesService {
  constructor(
    @InjectRepository(JoinCodesEntity)
    private readonly joinCodesRepository: Repository<JoinCodesEntity>,
    private readonly groupService: GroupService

  ) {}

  public async createJoinCode(group_id: string, user_role: EUserRole, user_id: string) {
    const group = await this.groupService.findGroupById(group_id);
    if(!group) throw new NotFoundException("Group not found");
    if(group.group_owner.id !== user_id && user_role != EUserRole.SYSTEM_ADMIN) throw new BadRequestException("Access denied");
    const code = generateRandomCode();
    await this._disactiveCodes(group_id);
    const newCode = await this.joinCodesRepository.save({code, group: group_id});
    return {
        success: true,
        message: 'A new join code generated successfully',
        data: newCode
    }
  }

  async updateJoinCodeStatus(
    joinCodeId: string,
    status: EStatus,
    group_id: string,
    user_role: EUserRole,
    user_id: string,
  ): Promise<JoinCodesEntity> {
    const joinCode = await this.joinCodesRepository.findOne(joinCodeId);
    if (!joinCode) throw new NotFoundException('Join code not found');
    const group = await this.groupService.findGroupById(group_id);
    if (!group) throw new NotFoundException('Group not found');
    if (group.group_owner.id !== user_id && user_role !== EUserRole.SYSTEM_ADMIN)
      throw new BadRequestException('Access denied');
    joinCode.status = status;
    return await this.joinCodesRepository.save(joinCode);
  }

  async getActiveJoinCode(
    group_id: string,
    user_role: EUserRole,
    user_id: string,
  ): Promise<JoinCodesEntity> {
    const group = await this.groupService.findGroupById(group_id);
    if (!group) throw new NotFoundException('Group not found');
    if (group.group_owner.id !== user_id && user_role !== EUserRole.SYSTEM_ADMIN)
      throw new BadRequestException('Access denied');
    return await this.joinCodesRepository.findOne({
      where: { group: group_id, status: EStatus.ACTIVE },
    });
  }

  async getJoinCodesByGroup(
    group_id: string,
    user_role: EUserRole,
    user_id: string,
  ): Promise<JoinCodesEntity[]> {
    const group = await this.groupService.findGroupById(group_id);
    if (!group) throw new NotFoundException('Group not found');
    if (group.group_owner.id !== user_id && user_role !== EUserRole.SYSTEM_ADMIN)
      throw new BadRequestException('Access denied');
    return await this.joinCodesRepository.find({ where: { group: group_id } });
  }
  
  public async findActiveCode(code: string){
    try{
      const codeExists = await this.joinCodesRepository.findOne({where: {code, status: EStatus.ACTIVE}});
      if(!codeExists) return false;
      return codeExists;
    }
    catch(e){
      throw new InternalServerErrorException(e.message)
    }
  }


  private async _disactiveCodes(group_id: string) {
    await this.joinCodesRepository.update(
      { group: group_id },
      { status: EStatus.INACTIVE },
    );
  }

  public async getGroupByJoinCode(code: string){
    const codeExists = await this.joinCodesRepository.findOne({where: {id: code}});
    if(!codeExists) throw new BadRequestException("Join code not found "+code);
    const group = await this.groupService.findGroupById(codeExists.group);
    if(!group) throw new NotFoundException("Group not found");
    return group;
  }
  
}
