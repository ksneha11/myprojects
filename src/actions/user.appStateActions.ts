import { AppState } from '../models';
import AppStateActions from '../models/appStateActions';

export default interface UserAppStateActions extends AppStateActions {
    userData: {
        changeUsername: (newUsername: string) => void;
        setPassword: (password: string) => void;
    };
}

export class UserReducers {
    public static changeUsername = (previousState: AppState, newUsername: string): Partial<AppState> => {
        return { userData: { ...previousState.userData, userName: newUsername } };
    };

    public static setPassword = (previousState: AppState, password: string): Partial<AppState> => {
        return { userData: { ...previousState.userData, password } };
    };
}
