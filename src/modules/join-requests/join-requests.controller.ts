import { Body, Controller, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoinRequestsService } from './join-requests.service';
import { JoinRequestsEntity } from './join-request.entity';
import { NewJoinRequestDto } from './dto/join-request.dto';
import { ERequestStatus } from 'src/enums/ERequestStatus';


@ApiTags('Join Requests')
@ApiBearerAuth()
@Controller('join-requests')
@Controller('join-requests')
export class JoinRequestsController {
    constructor(private readonly joinRequestsService: JoinRequestsService){}
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
      async create(
        @Body() joinRequestDto: NewJoinRequestDto,
        @Req() req: any,
      ) {
        return  await this.joinRequestsService.requestGroupJoin(
         joinRequestDto, req.user.user_id
        );
      }

    @ApiResponse({status: 200, description: 'Successfully fetched requests'})
    @Get('/')
    async list(
        @Req() req: any,
    ){
        return this.joinRequestsService.listRequests(req.user.user_id);
    }

    @ApiResponse({status: 200, description: "Request status updated"})
    @Put('/:id/status/:status')
    async updateStatus(
        @Param('id') id: string,
        @Param('status') status: ERequestStatus,
        @Req() req: any
    ){
        return this.joinRequestsService.updateStatus(id, status, req.user.role, req.user.user_id);
    }
}
