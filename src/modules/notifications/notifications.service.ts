/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './notifications.entity';
import { Repository } from 'typeorm';
import { AddNotificationDto } from './dto/create.dto';
import { ENotificationStatus } from 'src/enums/ENotificationStatus';
import { UserEntity } from '../user/users.entity';
import { EUserRole } from 'src/enums/EUserRole';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}
  public async create(dto: AddNotificationDto) {
    const notification = await this.notificationRepository.save(dto);
    return notification;
  }

  public async getUserGroupNotifications(group: string, user: string) {
    return await this.notificationRepository.find({
      where: {
        group,
        user,
      },
      order: { created_at: 'DESC' },
    });
  }

  public async editNotificationStatus(
    notification_id: string,
    status: ENotificationStatus,
    user_id: string,
  ) {
    const notification = await this.notificationRepository.findOne({
      where: { id: notification_id },
    });
    if (!notification) throw new NotFoundException('Notification not found');
    if ((notification.user as unknown as UserEntity).id !== user_id)
      throw new BadRequestException('Access denied');

    const update = await this.notificationRepository.update(
      { id: notification_id },
      { status },
    );
    return {
      success: true,
      message: 'Notification updated successfully',
      data: update,
    };
  }

  public async updateNotificationsStatus(
    notification_ids: string[],
    user_id: string,
  ) {
    const notifications = await this.notificationRepository.findByIds(
      notification_ids,
    );

    if (!notifications || notifications.length === 0) {
      throw new NotFoundException('Notifications not found');
    }

    for (const notification of notifications) {
      if ((notification.user as unknown as UserEntity).id !== user_id) {
        throw new BadRequestException('Access denied');
      }
    }

    const updatePromises = notifications.map(async (notification) => {
      notification.status = ENotificationStatus.SEEN;
      return this.notificationRepository.save(notification);
    });

    const updatedNotifications = await Promise.all(updatePromises);

    return {
      success: true,
      message: 'Notifications updated successfully',
      data: updatedNotifications,
    };
  }

  public async deleteNotification(
    notificationId: string,
    userId: string,
    role: EUserRole,
  ) {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
    });
    if (!notification) throw new NotFoundException('Notification not found');
    if (
      (notification.user as unknown as UserEntity).id != userId &&
      role != EUserRole.SYSTEM_ADMIN
    )
      throw new BadRequestException('Access denied');
    try {
      await this.notificationRepository.delete({ id: notificationId });
      return {
        success: true,
        message: 'Notification deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
