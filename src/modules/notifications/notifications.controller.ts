/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { LogEntity } from '../logs/logs.entity';

@Controller('notifications')
@ApiTags('Notifications')
@ApiBearerAuth()
export class NotificationsController {
  constructor(private notificationService: NotificationsService) {}

  @ApiResponse({
    status: 200,
    description: 'Logs fetched successfully',
    type: LogEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'Group id' })
  @Get('/group/:id')
  async getUserNotifications(@Param('id') group_id: string, @Req() req: any) {
    return await this.notificationService.getUserGroupNotifications(
      group_id,
      req.user.user_id,
    );
  }
}
