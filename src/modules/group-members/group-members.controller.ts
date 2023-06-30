import { Controller, Delete, Get, Param, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GroupMembersService } from './group-members.service';
import { GroupMembersEntity } from './group-members.entity';

@ApiTags('Group member')
@ApiBearerAuth()
@Controller('group-members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Get('/group/:group/all')
  @ApiParam({ name: 'group', description: 'Group ID' })
  @ApiResponse({
    status: 200,
    description: 'Group found',
    type: GroupMembersEntity,
  })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async getGroupById(
    @Param('group') group_id: string,
    @Req() req: any,
  ): Promise<any> {
    return await this.groupMembersService.getGroupMembers(
      group_id,
      req.user.role,
      req.user.user_id,
    );
  }

  @Delete('/group/:group/member/:member')
  @ApiParam({ name: 'group', description: 'Group ID' })
  @ApiParam({ name: 'member', description: 'Group member ID' })
  @ApiResponse({
    status: 200,
    description: 'Group found',
    type: GroupMembersEntity,
  })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async removeFromGroup(
    @Param('group') group_id: string,
    @Param('member') member_id: string,
    @Req() req: any,
  ): Promise<any> {
    return await this.groupMembersService.removeFromGroup(
      group_id,
      member_id,
      req.user.role,
      req.user.user_id,
    );
  }

  @Get('/user-membership')
  @ApiResponse({
    status: 200,
    description: 'List memberships',
    type: GroupMembersEntity,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getMemberships(@Req() req: any): Promise<any> {
    return await this.groupMembersService.getUserMemberships(req.user.user_id);
  }
}
