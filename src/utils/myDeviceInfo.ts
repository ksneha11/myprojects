import DeviceFingerprint from 'atlas-services/src/models/deviceFingerprint';
import DeviceInfo from 'react-native-device-info';

export default class MyDeviceInfo {
    protected static deviceFingerprint: DeviceFingerprint;
    protected static ipAddress: string;
    protected static macAddress: string;

    public static getDeviceFingerprint = async (): Promise<DeviceFingerprint> => {
        if (!MyDeviceInfo.deviceFingerprint) {
            MyDeviceInfo.deviceFingerprint = {
                uaCPU: {
                    architecture: DeviceInfo.supportedAbis().toString(),
                },
                uaDevice: {
                    model: DeviceInfo.getModel(),
                    type: await DeviceInfo.getType(),
                    vendor: await DeviceInfo.getManufacturer(),
                },
                uaEngine: {
                    name: DeviceInfo.getUniqueId(),
                    version: '',
                },
                uaOS: {
                    name: await DeviceInfo.getBaseOs(),
                    version: DeviceInfo.getSystemVersion(),
                },
                uaString: DeviceInfo.getUniqueId(),
                uaTouchSupport: {
                    maxTouchPoints: 10,
                    touchEvent: false,
                    touchStart: false,
                },
            };
        }

        return MyDeviceInfo.deviceFingerprint;
    };

    public static getIPAddress = async (): Promise<string> => {
        if (!MyDeviceInfo.ipAddress) {
            try {
                const ipAddress = await DeviceInfo.getIpAddress();
                MyDeviceInfo.ipAddress = ipAddress;
            } catch (reason) {
                return Promise.reject(reason);
            }
        }
        return Promise.resolve(MyDeviceInfo.ipAddress);
    };
}
