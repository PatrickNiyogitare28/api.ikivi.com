import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GroupService } from './group.service';
import {
  CreateGroupDto,
  EditGroupStatusDto,
  UpdatedGroupDto,
} from './dto/group.dto';
import { GroupEntity } from './group.entity';

@ApiTags('Groups')
@Controller('groups')
@ApiBearerAuth()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'Group registered successfully',
    type: GroupEntity,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async register(
    @Body() newGroupDto: CreateGroupDto,
    @Req() req: any,
  ): Promise<any> {
    return await this.groupService.register(newGroupDto, req.user.user_id);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Group found', type: GroupEntity })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async getGroupById(@Param('id') id: string): Promise<any> {
    return await this.groupService.getGroupById(id);
  }

  @Get('owner/:ownerId')
  @ApiParam({ name: 'ownerId', description: 'Owner ID' })
  @ApiResponse({
    status: 200,
    description: 'Groups found',
    type: [GroupEntity],
  })
  async getGroupsByOwner(@Param('ownerId') ownerId: string): Promise<any> {
    return await this.groupService.getGroupsByOwner(ownerId);
  }

  @Put(':id/status')
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiBody({ type: EditGroupStatusDto })
  @ApiResponse({ status: 200, description: 'Group status updated' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async updateGroupStatus(
    @Param('id') id: string,
    @Body() newStatusDto: EditGroupStatusDto,
  ): Promise<any> {
    return await this.groupService.updateGroupStatus(id, newStatusDto.status);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiBody({ type: CreateGroupDto })
  @ApiResponse({
    status: 200,
    description: 'Group data updated',
    type: GroupEntity,
  })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async updateGroupData(
    @Param('id') id: string,
    @Body() newData: UpdatedGroupDto,
    @Req() req: any,
  ): Promise<any> {
    return await this.groupService.updateGroupData(
      id,
      newData,
      req.user.role,
      req.user.user_id,
    );
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiBody({ type: CreateGroupDto })
  @ApiResponse({
    status: 200,
    description: 'Group data delete',
    type: GroupEntity,
  })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async deleteGroup(@Param('id') id: string, @Req() req: any): Promise<any> {
    return await this.groupService.deleteGroup(
      id,
      req.user.role,
      req.user.user_id,
    );
  }

  @Patch(':id/verify')
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({
    status: 200,
    description: 'Group data delete',
    type: GroupEntity,
  })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async verifyGroup(@Param('id') id: string): Promise<any> {
    return await this.groupService.verifyGroup(id);
  }

  @Patch(':id/unverify')
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({
    status: 200,
    description: 'Group data delete',
    type: GroupEntity,
  })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async unverify(@Param('id') id: string): Promise<any> {
    return await this.groupService.unverify(id);
  }
}
