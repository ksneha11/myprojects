import { PushNotificationEvents, RNSMCPushNotification } from './pushNotification.module';
import PushNotificationHandler from './pushNotificationHandler';
export default class PushNotificationManager {

    private static instance: PushNotificationManager;
    private deviceId: string;
    private inited = false;
    private pushNativeModule: RNSMCPushNotification;
    public static getInstance() {
        if (!PushNotificationManager.instance) {
            PushNotificationManager.instance = new PushNotificationManager();
            PushNotificationManager.instance.init();
        }
        return PushNotificationManager.instance;
    }

    public addNotificationOpenedListener(handler: PushNotificationHandler) {
        if (this.checkInited()) {
            this.pushNativeModule.addEventListener(
                PushNotificationEvents.NOTIFICATION_OPENED,
                handler.processNotification
            );
        }
    }
    public async getDeviceId() {
        if (this.checkInited()) {
            const deviceId: string = await this.pushNativeModule.fetchDeviceId();
            return deviceId;
        }
    }
    private checkInited() {
        if (!this.inited) {
            throw new Error('Push Manager was not inited. Please init before calling any other APIs');
            return false;
        }
        return true;
    }
    private init() {
        this.pushNativeModule = new RNSMCPushNotification();
        this.pushNativeModule.fetchDeviceId().then(deviceId => this.deviceId);
        this.inited = true;
        return this;
    }
}
