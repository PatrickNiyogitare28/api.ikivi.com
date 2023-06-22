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
import { EStatus } from 'src/enums/EStatus';
import { PeriodicEarnService } from './periodic-earn.service';
import { PeriodicEarnEntity } from './periodic-earn.entity';
import { AddPeriodicEarnDto } from './dto/periodic-earn.dto';

@Controller('periodic-earn')
@ApiTags('Periodic Earn')
@ApiBearerAuth()
export class PeriodicEarnController {
  constructor(private periodicEarnService: PeriodicEarnService) {}

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'Earn saved successfully',
    type: PeriodicEarnEntity,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Not Found Error' })
  @HttpCode(201)
  async register(
    @Body() dto: AddPeriodicEarnDto,
    @Req() req: any,
  ): Promise<any> {
    return await this.periodicEarnService.add(
      dto,
      req.user.user_id,
      req.user.role,
    );
  }

  @Get('/group/:groupId')
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched periodic earn list',
    type: PeriodicEarnEntity,
  })
  @ApiParam({ name: 'groupId', description: 'Group id' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Not Found Error' })
  async listEarns(
    @Req() req: any,
    @Param('groupId') group_id: string,
  ): Promise<any> {
    return await this.periodicEarnService.listTransactions(
      group_id,
      req.user.user_id,
      req.user.role,
    );
  }

  @Get('/:periodicEarnId')
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched periodicEarns list',
    type: PeriodicEarnEntity,
  })
  @ApiParam({ name: 'periodicEarnId', description: 'periodicEarn id' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Not Found Error' })
  async getPeriodicEarnById(
    @Req() req: any,
    @Param('periodicEarnId') periodicEarn_id: string,
  ): Promise<any> {
    return await this.periodicEarnService.getById(
      periodicEarn_id,
      req.user.user_id,
      req.user.role,
    );
  }

  @Put('/:periodicEarnId/:status')
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched periodicEarns list',
    type: PeriodicEarnEntity,
  })
  @ApiParam({ name: 'periodicEarnId', description: 'periodicEarn id' })
  @ApiParam({
    name: 'status',
    description: 'periodicEarn status',
    type: 'enum',
    enum: EStatus,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Not Found Error' })
  async editStatus(
    @Req() req: any,
    @Param('periodicEarnId') periodicEarn_id: string,
    @Param('status') status: EStatus,
  ): Promise<any> {
    return await this.periodicEarnService.editStatus(
      periodicEarn_id,
      req.user.user_id,
      req.user.role,
      status,
    );
  }

  @Get('/user-membership/group/:groupId')
  @ApiParam({ name: 'groupId' })
  @ApiResponse({
    status: 200,
    description: 'Earn history fetched',
    type: PeriodicEarnEntity,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getUserHistory(
    @Req() req: any,
    @Param('groupId') group_id: string,
  ): Promise<any> {
    return await this.periodicEarnService.userEarnHistory(
      req.user.user_id,
      group_id,
    );
  }
}
