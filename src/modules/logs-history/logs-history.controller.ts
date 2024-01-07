/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogsHistoryService } from './logs-history.service';
import { LogEntity } from '../logs/logs.entity';

@Controller('logs-history')
@ApiTags('Logs history')
@ApiBearerAuth()
export class LogsHistoryController {
  constructor(private logsHistoryService: LogsHistoryService) {}

  @ApiResponse({
    status: 200,
    description: 'Logs fetched successfully',
    type: LogEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'Group id' })
  @Get('/group/:id')
  async getGroupLogsHistory(@Param('id') group_id: string, @Req() req: any) {
    return await this.logsHistoryService.getGroupHistory(
      group_id,
      req.user.user_id,
      req.user.role,
    );
  }
}
