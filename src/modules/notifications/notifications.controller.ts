/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { LogEntity } from '../logs/logs.entity';
import { ENotificationStatus } from 'src/enums/ENotificationStatus';
import { UpdateNotificationDto } from './dto/update.dto';

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

  @Put('/update-status')
  @ApiResponse({
    status: 200,
    description: 'Notifications updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async updateNotificationsStatus(
    @Req() req: any,
    @Body() payload: UpdateNotificationDto,
  ) {
    try {
      const result = await this.notificationService.updateNotificationsStatus(
        payload.notificationIds,
        req.user.user_id,
      );
      return result;
    } catch (error) {
      // Handle errors appropriately
      throw error;
    }
  }

  @Put('/update-status/notificationId/:notificationId/status/:status')
  @ApiResponse({
    status: 200,
    description: 'Notifications updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'notificationId', description: 'Notification Id' })
  @ApiParam({
    name: 'status',
    description: 'Notification status',
    type: 'enum',
    enum: ENotificationStatus,
  })
  async updateSingleNotification(
    @Req() req: any,
    @Param('notificationId') notificationId: string,
    @Param('status') status: ENotificationStatus,
  ) {
    try {
      const result = await this.notificationService.editNotificationStatus(
        notificationId,
        status,
        req.user.user_id,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Delete('/notificationId/:notificationId')
  @ApiResponse({
    status: 200,
    description: 'Notification deleted successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'notificationId', description: 'Notification Id' })
  async deleteNotification(
    @Req() req: any,
    @Param('notificationId') notificationId: string,
  ) {
    try {
      const result = await this.notificationService.deleteNotification(
        notificationId,
        req.user.user_id,
        req.user.role,
      );
      return result;
    } catch (error) {
      // Handle errors appropriately
      throw error;
    }
  }
}
