import { getInitialAppState } from '../context/initialAppState';
import { AppState, AppStateActions } from '../models';

export default interface LogoutAppStateActions extends AppStateActions {
    logout: {
        clearAppState: noop;
    };
}

export class LogoutReducers {
    public static clearAppState = (appState: AppState): AppState => {
        const initialAppState: AppState = getInitialAppState(appState.selectedLanguage);
        return {
            ...initialAppState,
        };
    };
}
