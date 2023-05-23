import { Controller, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { JoinCodesService } from './join-codes.service';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoinCodesEntity } from './join-codes.entity';
import { EStatus } from 'src/enums/EStatus';

@ApiTags('Join Codes')
@ApiBearerAuth()
@Controller('join-codes')
export class JoinCodesController {
    constructor(
        private joinCodesService: JoinCodesService
    ){}

    @ApiResponse({
        status: 201,
        description: 'Code generated successfully',
        type: JoinCodesEntity,
      })
      @ApiResponse({ status: 400, description: 'Bad request' })
      @ApiResponse({ status: 404, description: 'Group not found' })
      @ApiResponse({ status: 500, description: 'Internal Server Error' })
      @ApiParam({ name: 'id', description: 'Group id' })
      @Post('/group/:id')
      @HttpCode(201)
      async create(
        @Req() req: any,
        @Param('id') group_id: string,
      ) {
        return this.joinCodesService.createJoinCode(
          group_id, req.user.role, req.user.user_id
        );
      }

      @ApiResponse({
        status: 201,
        description: 'Code status updated successfully',
        type: JoinCodesEntity,
      })
      @ApiResponse({ status: 400, description: 'Bad request' })
      @ApiResponse({ status: 404, description: 'Group not found' })
      @ApiResponse({ status: 500, description: 'Internal Server Error' })
      @ApiParam({ name: 'id', description: 'Group id' })
      @Put('/group/:joinCodeId/:status/group/:groupId')
      @HttpCode(201)
      async update(
        @Req() req: any,
        @Param('joinCodeId') joinCodeId: string,
        @Param('status') status: EStatus,
        @Param('groupId') groupId: string,
      ) {
        return this.joinCodesService.updateJoinCodeStatus(
         joinCodeId, status, groupId, req.user.role ,req.user.user_id
        );
      }

      @ApiResponse({
        status: 200,
      })
      @Get('/group/:groupId')
      async getActiveCode(
        @Param('groupId') groupId: string,
        @Req() req: any
      ){
        return this.joinCodesService.getActiveJoinCode(
         groupId, req.user.role, req.user.user_id
        )
      }

      @ApiResponse({
        status: 200,
      })
      @Get('/code/group/:groupId')
      async getJoinCodesByGroup(
        @Param('groupId') groupId: string,
        @Req() req: any
      ){
        return this.joinCodesService.getJoinCodesByGroup(
         groupId, req.user.role, req.user.user_id
        )
      }
}
