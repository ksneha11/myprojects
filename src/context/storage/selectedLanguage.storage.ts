import { Languages } from 'atlas-services/src/models';
import { getFromStorage, saveToStorage } from './storage';

const SELECTED_LANGUAGE_KEY = 'selectedLanguage';

export const setSelectedLanguage = (language: Languages): void => {
    saveToStorage(SELECTED_LANGUAGE_KEY, language);
};

export const getSelectedLanguage = (): Promise<Languages> => {
    return getFromStorage(SELECTED_LANGUAGE_KEY) as Promise<Languages>;
};
