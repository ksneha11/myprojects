import { Languages } from 'atlas-services/src/models';
import { setSelectedLanguage } from '../context/storage/selectedLanguage.storage';
import { AppState, AppStateActions } from '../models';

export default interface LanguageAppStateActions extends AppStateActions {
    languages: {
        updateSelectedLanguage: (language: Languages) => void;
    };
}

export class LanguageReducers {
    public static updateSelectedLanguage = (previousState: AppState, language: Languages): Partial<AppState> => {
        setSelectedLanguage(language);
        return { selectedLanguage: language };
    };
}
