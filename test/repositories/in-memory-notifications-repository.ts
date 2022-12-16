import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    this.notifications[notificationIndex] = notification;
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    const count = this.notifications.filter(
      (item) => item.recipientId === recipientId,
    ).length;

    return count;
  }

  async findByRecipientId(recipientId: string): Promise<Notification[] | null> {
    const notifications = this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );

    return notifications;
  }
}
