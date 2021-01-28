import { NavigationAction, NavigationHandler } from '../navigation';
import { PushNotificationEventData } from './lib/pushNotification.module';
import PushNotificationHandler from './lib/pushNotificationHandler';
// TODO : remove below comment post Push Refactoring
// This is specific to Atlas and will not be removed into
// Push library
export class PushNotificationNavigationHandler implements PushNotificationHandler {
    private navigationHanders: Array<{ navigateTo: NavigationAction; notificationType: string }>;
    constructor(private appNavigationHander: NavigationHandler) {}

    public addNavigationHandler(notificationType: string, navigateTo: NavigationAction) {
        this.navigationHanders = this.navigationHanders || [];
        this.navigationHanders.push({ notificationType, navigateTo });
    }

    public processNotification(notificationData: PushNotificationEventData) {
        this.navigationHanders.forEach(navigationHander => {
            if (notificationData.values.type === navigationHander.notificationType) {
                this.appNavigationHander.navigate(navigationHander.navigateTo);
            }
        });
    }
}
