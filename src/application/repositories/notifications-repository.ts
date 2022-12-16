import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countByRecipientId(recipientId: string): Promise<number>;
  abstract findByRecipientId(
    recipientId: string,
  ): Promise<Notification[] | null>;
}
