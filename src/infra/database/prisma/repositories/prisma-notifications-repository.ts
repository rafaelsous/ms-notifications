import { Injectable } from '@nestjs/common';

import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const prismaNotificationData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: prismaNotificationData,
    });
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      throw new NotificationNotFound();
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async save(notification: Notification): Promise<void> {
    const prismaNotificationData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: prismaNotificationData.id,
      },
      data: prismaNotificationData,
    });
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async findByRecipientId(recipientId: string): Promise<Notification[] | null> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    if (!notifications) {
      throw new NotificationNotFound();
    }

    return notifications.map(PrismaNotificationMapper.toDomain);
  }
}
