import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoinRequestsService } from './join-requests.service';
import { JoinRequestsEntity } from './join-request.entity';
import { NewJoinRequestDto } from './dto/join-request.dto';
import { ERequestStatus } from 'src/enums/ERequestStatus';

@ApiTags('Join Requests')
@ApiBearerAuth()
@Controller('join-requests')
export class JoinRequestsController {
  constructor(private readonly joinRequestsService: JoinRequestsService) {}
  @ApiResponse({
    status: 201,
    description: 'Request made successfully',
    type: JoinRequestsEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Join code not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('/')
  @HttpCode(201)
  async create(@Body() joinRequestDto: NewJoinRequestDto, @Req() req: any) {
    return await this.joinRequestsService.requestGroupJoin(
      joinRequestDto,
      req.user.user_id,
    );
  }

  @ApiResponse({ status: 200, description: 'Successfully fetched requests' })
  @Get('/')
  async list(@Req() req: any) {
    return this.joinRequestsService.listRequests(req.user.user_id);
  }

  @ApiResponse({ status: 200, description: 'Successfully fetched requests' })
  @ApiParam({ name: 'group', description: 'Group id' })
  @Get('/group/:group')
  async getByGroup(@Req() req: any, @Param('group') group_id: string) {
    return this.joinRequestsService.getRequestsByGroup(
      group_id,
      req.user.role,
      req.user.user_id,
    );
  }

  @ApiResponse({ status: 200, description: 'Successfully fetched requests' })
  @ApiParam({ name: 'group', description: 'Group id' })
  @ApiParam({
    name: 'status',
    description: 'Status',
    type: 'enum',
    enum: ERequestStatus,
  })
  @Get('/group/:group/status/:status')
  async getByGroupAndStatus(
    @Req() req: any,
    @Param('group') group_id: string,
    @Param('status') status: ERequestStatus,
  ) {
    return this.joinRequestsService.getRequestsByGroupAndStatus(
      group_id,
      status,
      req.user.role,
      req.user.user_id,
    );
  }

  @ApiResponse({ status: 200, description: 'Request status updated' })
  @ApiParam({ name: 'id', description: 'Join request id' })
  @ApiParam({
    name: 'status',
    description: 'Status',
    type: 'enum',
    enum: ERequestStatus,
  })
  @Put('/:id/status/:status')
  async updateStatus(
    @Param('id') id: string,
    @Param('status') status: ERequestStatus,
    @Req() req: any,
  ) {
    return this.joinRequestsService.updateStatus(
      id,
      status,
      req.user.role,
      req.user.user_id,
    );
  }

  @ApiResponse({ status: 200, description: 'Request status updated' })
  @ApiParam({ name: 'id', description: 'Group id' })
  @Put('/:id/cancel')
  async cancelRequest(@Param('id') id: string, @Req() req: any) {
    return this.joinRequestsService.cancelRequest(
      id,
      req.user.role,
      req.user.user_id,
    );
  }
}
