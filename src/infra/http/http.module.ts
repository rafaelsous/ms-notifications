import { Module } from '@nestjs/common';

import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsControllers } from './controllers/notifications.controller';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsControllers],
  providers: [
    SendNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
    ReadNotification,
    UnreadNotification,
    CancelNotification,
  ],
})
export class HttpModule {}
