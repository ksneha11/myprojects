import { deleteFromSecureStorage, getFromSecureStorage, saveToSecureStorage } from './storage';

const REMEMBERED_USERNAME_STORAGE_KEY = 'REMEMBERED_USERNAME';

export const setRememberedUsername = (username: string, deleteSaved: boolean): void => {
    if (deleteSaved) {
        removeRememberedUserName();
    } else {
        saveToSecureStorage(REMEMBERED_USERNAME_STORAGE_KEY, username);
    }
};

export const getRememberedUsername = (): Promise<string> => {
    return getFromSecureStorage(REMEMBERED_USERNAME_STORAGE_KEY) as Promise<string>;
};

export const removeRememberedUserName = () => {
    deleteFromSecureStorage(REMEMBERED_USERNAME_STORAGE_KEY);
};
