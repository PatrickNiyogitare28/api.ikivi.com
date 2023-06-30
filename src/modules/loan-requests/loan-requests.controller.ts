import { Body, Controller, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { LoanRequestsService } from './loan-requests.service';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoanRequestsEntity } from './loan-requests.entity';
import { CreateLoanRequestDto } from './dto/loan-requests.dot';
import { ERequestStatus } from 'src/enums/ERequestStatus';

@ApiTags('Loan Requests')
@ApiBearerAuth()
@Controller('loan-requests')
export class LoanRequestsController {
    constructor(
        private readonly loanRequestService: LoanRequestsService
    ){}

    @ApiResponse({
        status: 201,
        description: 'Request made successfully',
        type: LoanRequestsEntity,
      })
      @ApiResponse({ status: 400, description: 'Bad request' })
      @ApiResponse({ status: 500, description: 'Internal Server Error' })
      @Post('/')
      @HttpCode(201)
      async create(
        @Body() dto: CreateLoanRequestDto, 
        @Req() req: any) {
        return await this.loanRequestService.create(
          dto,
          req.user.user_id,
          req.user.role
        );
      }

      @ApiResponse({
        status: 200,
        description: 'Request updated successfully',
        type: LoanRequestsEntity,
      })
      @ApiResponse({ status: 400, description: 'Bad request' })
      @ApiResponse({ status: 500, description: 'Internal Server Error' })
      @ApiParam({name: 'id', description: 'Loan request id'},)
      @ApiParam({name: 'requestStatus', type: 'enum', description: 'request status', enum: ERequestStatus})
      @Put('/:id/request-status/:requestStatus')
      @HttpCode(200)
      async updateStatus(
        @Param('id') request_id: string,
        @Param('requestStatus') request_status: ERequestStatus,
        @Req() req: any) {
        return await this.loanRequestService.updateLoanRequestStatus(
         request_id, request_status, req.user.user_id, req.user.role
        );
      }

      @ApiResponse({
        status: 200,
        description: 'Request fetched successfully',
        type: LoanRequestsEntity,
      })
      @ApiResponse({ status: 400, description: 'Bad request' })
      @ApiResponse({ status: 500, description: 'Internal Server Error' })
      @ApiParam({name: 'id', description: 'Loan request id'},)
      @Get('/:id')
      async getRequestById(
        @Param('id') request_id: string,
        @Req() req: any) {
        return await this.loanRequestService.getRequestById(
         request_id, req.user.user_id, req.user.role
        );
      }

      @ApiResponse({
        status: 200,
        description: 'Request fetched successfully',
        type: LoanRequestsEntity,
      })
      @ApiResponse({ status: 400, description: 'Bad request' })
      @ApiResponse({ status: 500, description: 'Internal Server Error' })
      @ApiParam({name: 'group', description: 'Group id'},)
      @Get('/group/:group')
      async getRequestByGroup(
        @Param('group') group_id: string,
        @Req() req: any) {
        return await this.loanRequestService.getRequestsByGroup(
         group_id, req.user.user_id, req.user.role
        );
      }

      @ApiResponse({
        status: 200,
        description: 'Request fetched successfully',
        type: LoanRequestsEntity,
      })
      @ApiResponse({ status: 400, description: 'Bad request' })
      @ApiResponse({ status: 500, description: 'Internal Server Error' })
      @ApiParam({name: 'group', description: 'Group id'},)
      @ApiParam({name: 'requestStatus', description: 'Request status', type: 'enum', enum: ERequestStatus},)
      @Get('/group/:group/request-status/:requestStatus')
      async getRequestByGroupAndStatus(
        @Param('group') group_id: string,
        @Param('requestStatus') request_status: ERequestStatus,
        @Req() req: any) {
        return await this.loanRequestService.getRequestsByGroupAndStatus(
         group_id, request_status, req.user.user_id, req.user.role
        );
      }


      @ApiResponse({
        status: 200,
        description: 'Request fetched successfully',
        type: LoanRequestsEntity,
      })
      @ApiResponse({ status: 400, description: 'Bad request' })
      @ApiResponse({ status: 500, description: 'Internal Server Error' })
      @ApiParam({name: 'group', description: 'Group id'},)
      @Get('/user-group-loans/group/:group')
      async getUserLoanRequest(
        @Param('group') group_id: string,
        @Req() req: any) {
        return await this.loanRequestService.getUserLoanRequests(
         group_id, req.user.user_id, req.user.role
        );
      }

    
}
