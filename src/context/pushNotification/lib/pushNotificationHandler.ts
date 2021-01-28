import { PushNotificationEventData } from './pushNotification.module';

export default interface PushNotificationHandler {
    processNotification(notificationType: PushNotificationEventData): void;
}
