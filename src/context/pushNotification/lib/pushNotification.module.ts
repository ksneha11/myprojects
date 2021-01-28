/**
 *  FIXME: This file should not be in context folder
 * will be moved to module once a seperate module (library) is created for Push Notifications
 */
import { DeviceEventEmitter, NativeModules } from 'react-native';

export enum PushNotificationEvents {
    NOTIFICATION_OPENED = 'NOTIFICATION_OPENED',
    DEVICE_REGISTERED_WITH_PUSH_SERVICE = 'PUSH_REGISTRATION_SUCCESS',
}
// TODO, not sure about actual structure, may change
export interface PushNotificationEventData {
    values: {
        _h?: string;
        _m?: string;
        _mt?: string;
        _r?: string;
        _sid?: string;
        alert?: string;
        sound?: string;
        subtitle: string;
        title: string;
        type: string;
    };
}
const NativeModule = NativeModules.RNSMCPushNotification;

export class RNSMCPushNotification {

    public addEventListener(event: PushNotificationEvents, handler: (data: any) => void) {
        if (!event || !handler) {
            // do not register to listener
        }
        switch (event) {
            case PushNotificationEvents.NOTIFICATION_OPENED:
                DeviceEventEmitter.addListener(PushNotificationEvents.NOTIFICATION_OPENED, notifData => {
                    const data = JSON.parse(notifData.dataJSON);
                    handler(data);
                });
                break;
            case PushNotificationEvents.DEVICE_REGISTERED_WITH_PUSH_SERVICE:
                DeviceEventEmitter.addListener(
                    PushNotificationEvents.DEVICE_REGISTERED_WITH_PUSH_SERVICE,
                    notifData => {
                        const data = JSON.parse(notifData.dataJSON);
                        handler(data);
                    }
                );
                break;
            default:
                break;
        }
    }
    public async fetchDeviceId() {
        const deviceId: string = await NativeModule.deviceId();
        return deviceId;
    }
}
