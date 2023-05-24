import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinRequestsEntity } from './join-request.entity';
import { Repository } from 'typeorm';
import { NewJoinRequestDto } from './dto/join-request.dto';
import { JoinCodesService } from '../join-codes/join-codes.service';
import { ERequestStatus } from 'src/enums/ERequestStatus';
import { EUserRole } from 'src/enums/EUserRole';
import { GroupService } from '../group/group.service';

@Injectable()
export class JoinRequestsService {
  constructor(
    @InjectRepository(JoinRequestsEntity)
    private joinRequestRepository: Repository<JoinRequestsEntity>,
    private joinCodesService: JoinCodesService,
    private groupService: GroupService,
  ) {}

  public async requestGroupJoin(
    newJoinRequest: NewJoinRequestDto,
    user_id: string,
  ) {
    const codeExists = await this.joinCodesService.findActiveCode(
      newJoinRequest.code,
    );
    if (!codeExists)
      throw new BadRequestException('Code not found or not activated');
    const requestExists = await this._findRequestByUserId(
      user_id,
      codeExists.id,
    );
    if (requestExists?.status == ERequestStatus.APPROVED)
      throw new BadRequestException('You are already a member');
    if (requestExists?.status == ERequestStatus.PENDING)
      throw new BadRequestException('You already requested to join this group');
    if (requestExists?.status == ERequestStatus.REJECTED)
      throw new BadRequestException('You request was rejected');
    try {
      const request = await this.joinRequestRepository.save({
        join_code: codeExists.id,
        user: user_id,
        group: codeExists.group,
      });
      return {
        success: true,
        message: `You successfully requested to join group`,
        data: request,
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  public async updateStatus(
    request_id: string,
    status: ERequestStatus,
    user_role: EUserRole,
    user_id: string,
  ) {
    const requestExists = await this.joinRequestRepository.findOne({
      where: { id: request_id },
    });
    if (!requestExists) throw new BadRequestException('Join request not found');
    const group = await this.groupService.getGroupById(requestExists.group);
    if (!group) throw new BadRequestException('Group not found');
    if (
      group.data.group_owner.id != user_id &&
      user_role != EUserRole.SYSTEM_ADMIN
    )
      throw new BadRequestException('Access denied');
    await this.joinRequestRepository.update(request_id, { status });
    // if(status == ERequestStatus.APPROVED) approveJoinRequest();
    return {
      success: true,
      message: `Request  ${status.toLocaleLowerCase()} successfully`,
    };
  }

  public async listRequests(user_id: string) {
    return await this.joinRequestRepository.find({ where: { user: user_id } });
  }

  public async getRequestsByGroup(
    group_id: string,
    role: EUserRole,
    user_id: string,
  ) {
    const group = await this.groupService.findGroupById(group_id);
    if (!group) throw new BadRequestException('Group not found');
    if (group.group_owner.id != user_id && role != EUserRole.SYSTEM_ADMIN)
      throw new BadRequestException('Access denied');
    const requests = await this.joinRequestRepository.find({
      where: { group: group_id },
    });
    return requests;
  }

  public async getRequestsByGroupAndStatus(
    group_id: string,
    status: ERequestStatus,
    role: EUserRole,
    user_id: string,
  ) {
    const group = await this.groupService.findGroupById(group_id);
    if (!group) throw new BadRequestException('Group not found');
    if (group.group_owner.id != user_id && role != EUserRole.SYSTEM_ADMIN)
      throw new BadRequestException('Access denied');
    const requests = await this.joinRequestRepository.find({
      where: { group: group_id, status },
    });
    return requests;
  }

  public async cancelRequest(
    request_id: string,
    role: EUserRole,
    user_id: string,
  ) {
    const request = await this.joinRequestRepository.findOne({
      where: { id: request_id },
    });
    if (!request) throw new BadRequestException('Request was not found');
    if (request.user !== user_id && role != EUserRole.SYSTEM_ADMIN)
      throw new BadRequestException('Access denied');
    await this.joinRequestRepository.update(request_id, {
      status: ERequestStatus.CANCELED,
    });
    return {
      success: true,
      message: 'Join request canceled successfully',
    };
  }

  public async _findRequestByUserId(user_id: string, join_code: string) {
    try {
      const exists = await this.joinRequestRepository.findOne({
        where: { user: user_id, join_code },
      });
      return exists;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
