import * as Keychain from 'react-native-keychain';
import {
    deleteFromSecureStorage,
    getFromSecureStorage,
    getFromStorage,
    saveToSecureStorage,
    saveToStorage,
} from './storage';

export const BIOMETRIC_DISABLED_INFO_SHOWN = 'BIOMETRIC_DISABLED_INFO_SHOWN';
export const BIOMETRIC_USERNAME = 'BIOMETRIC_USERNAME';
export const NOT_NOW_PRESSED_KEY = 'NOT_NOW_PRESSED';
export const USE_BIOMETRICS_PRESSED_KEY = 'USE_BIOMETRICS_PRESSED';
export const BIOMETRIC_SERVICE_NAME = 'for-biometric-login';
export const setNotNowPressed = async (biometricModalType: string): Promise<void> => {
    return saveToStorage(NOT_NOW_PRESSED_KEY, biometricModalType);
};

export const setUseBiometricsPressed = async (): Promise<void> => {
    return saveToStorage(USE_BIOMETRICS_PRESSED_KEY, 'true');
};

// TODO this is not actually being called anywhere
export const supressBiometricsDisabledModal = async (): Promise<void> => {
    return saveToStorage(BIOMETRIC_DISABLED_INFO_SHOWN, 'true');
};

export const isBiometricsDisabledModalSupressed = async (): Promise<boolean> => {
    return (await getFromStorage(BIOMETRIC_DISABLED_INFO_SHOWN)) != null;
};

export const getBiometricsOptedInPreference = (): Promise<string> => {
    return getFromStorage(USE_BIOMETRICS_PRESSED_KEY) as Promise<string>;
};

export const getBiometricsOptedOutPreference = (): Promise<string> => {
    return getFromStorage(NOT_NOW_PRESSED_KEY) as Promise<string>;
};

export const deleteBiometrics = async (): Promise<void> => {
    await resetSecureCredentials();
    await deleteFromSecureStorage(BIOMETRIC_USERNAME);
};

export const getBiometricCredentials = async (): Promise<{ password: string; username: string }> => {
    try {
        const credentials = await Keychain.getGenericPassword({
            authenticationPrompt: 'Authenticate to complete setup',
            service: BIOMETRIC_SERVICE_NAME,
        });
        return credentials && { username: credentials.username, password: credentials.password };
    } catch (error) {
        throw new Error(`Unable to fetch credentials `);
    }
};

export const getUsernameOptedInForBiometrics = async (): Promise<string> => {
    try {
        return await getFromSecureStorage(BIOMETRIC_USERNAME);
    } catch (error) {
        throw new Error(`Unable to fetch credentials `);
    }
};

export const resetSecureCredentials = async (): Promise<void> => {
    const service = BIOMETRIC_SERVICE_NAME;
    deleteFromSecureStorage(BIOMETRIC_USERNAME);
    await Keychain.resetGenericPassword({ service });
};

export const setBiometricCredentials = async (username: string, password: string, isIOS): Promise<void> => {
    try {
        // AccessControl is only for iOS
        let platformSpecificAccessControl = null;

        if (isIOS) {
            platformSpecificAccessControl = {
                accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
                accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
            };
        } else {
            // android
            const androidDeviceSecurityLevel = await Keychain.getSecurityLevel();
            platformSpecificAccessControl = {
                securityLevel: androidDeviceSecurityLevel,
            };
        }
        const accessControl: any = { service: BIOMETRIC_SERVICE_NAME, ...platformSpecificAccessControl };

        await Keychain.setGenericPassword(username, password, accessControl);
    } catch (error) {
        throw new Error(`Unable to save credentials securely`);
    }
};

export const setBiometricUsername = async (username: string): Promise<void> => {
    try {
        await saveToSecureStorage(BIOMETRIC_USERNAME, username);
    } catch (error) {
        throw new Error(`Unable to save credentials securely`);
    }
};
