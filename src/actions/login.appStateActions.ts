import { AppState, AppStateActions } from '../models';

export default interface LoginAppStateActions extends AppStateActions {
    login: {
        isLoggedIn: (isLoggedIn: boolean) => void;
    };
}

export class LoginReducers {
    public static isLoggedIn = (appState: AppState, isLoggedIn: boolean): Partial<AppState> => {
        return {
            isLoggedIn,
        };
    };
}
