import { getFromStorage, saveToStorage } from './storage';

const FIRST_LOAD_DONE = 'FIRST_LOAD_DONE';

export const setFirstLoadDone = (): void => {
    saveToStorage(FIRST_LOAD_DONE, true);
};

export const getFirstLoadDone = async () => {
    return getFromStorage(FIRST_LOAD_DONE);
};
