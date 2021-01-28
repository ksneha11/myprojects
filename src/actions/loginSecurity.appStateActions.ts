import { AppState, AppStateActions } from '../models';

export default interface LoginSecurityAppStateActions extends AppStateActions {
    loginSecurity: {
        isBiometricLogin: (isBiometricLogin: boolean) => void;
    };
}

export class LoginSecurityReducers {
    public static isBiometricLogin = (appState: AppState, isBiometricLogin: boolean): Partial<AppState> => {
        return {
            isBiometricLogin,
        };
    };
}
