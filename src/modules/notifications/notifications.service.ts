/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './notifications.entity';
import { Repository } from 'typeorm';
import { AddNotificationDto } from './dto/create.dto';
import { ENotificationStatus } from 'src/enums/ENotificationStatus';

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
    });
  }
}
