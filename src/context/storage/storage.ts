import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';

export const saveToStorage = async (key: string, value: boolean | string): Promise<void> => {
    if (typeof value === 'boolean') {
        value = value ? 'true' : 'false';
    }
    try {
        return AsyncStorage.setItem(key, value);
    } catch (error) {
        throw new Error(`Unable to save ${key} to local storage.`);
    }
};

export const getFromStorage = async (key: string): Promise<boolean | string> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value === 'true' || value === 'false') {
            return value === 'true';
        }
        return value;
    } catch (error) {
        throw new Error(`Unable to retrieve ${key} from local storage.`);
    }
};

export const multiRemoveFromStorage = async (keys: string[]): Promise<void> => {
    try {
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        throw new Error(`Unable to remove ${keys} from local storage.`);
    }
};

export const saveToSecureStorage = async (key: string, value: string): Promise<void> => {
    const dummyPassword = ' '; // cannot be and empty string, fails in Android
    try {
        // the library has only credential storing api, so we are supplying dummy password
        // along with the key
        // https://github.com/oblador/react-native-keychain#setinternetcredentialsserver-username-password--accesscontrol-accessible-accessgroup-securitylevel-
        return await Keychain.setInternetCredentials(key, value, dummyPassword);
    } catch (error) {
        throw new Error(`Unable to save ${key} to Secure storage.`);
    }
};
export const getFromSecureStorage = async (key: string): Promise<string> => {
    try {
        const credentials: Keychain.UserCredentials = await Keychain.getInternetCredentials(key);
        const value = credentials && credentials.username;
        return value;
    } catch (error) {
        throw new Error(`Unable to retrieve ${key} from secured storage.`);
    }
};
export const deleteFromSecureStorage = async (key: string) => {
    try {
        await Keychain.resetInternetCredentials(key);
        return;
    } catch (error) {
        throw new Error(`Unable to remove ${key} from secured storage.`);
    }
};
