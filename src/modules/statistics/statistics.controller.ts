import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { LoanEntity } from '../loan/loan.entity';

@ApiTags('Statistics')
@Controller('statistics')
@ApiBearerAuth()
export class StatisticsController {
    constructor(private statsService: StatisticsService){ }

    @ApiResponse({
        status: 200,
        description: 'Group Statistics',
        type: LoanEntity,
      })
      @ApiResponse({ status: 400, description: 'Bad request' })
      @ApiResponse({ status: 500, description: 'Internal Server Error' })
      @ApiParam({ name: 'group', description: 'Group Id' })
      @Get('/group/:group')
      async groupStats(
        @Param('group') group_id: string, 
        @Req() req: any
        ) {
        return await this.statsService.getGroupStatistics(
          group_id,
          req.user.user_id,
          req.user.role,
        );
      }    
}
