import { FupData, SecurityQuestion } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface FupAppStateActions extends AppStateActions {
    fup: {
        setMemberInfo: (memberInfo: Partial<FupData>) => void;
        setSecurityQuestion: (question: SecurityQuestion) => void;
        setUsername: (username: string) => void;
    };
}

export class FupReducers {
    public static setMemberInfo = (previousState: AppState, memberInfo: Partial<FupData>): Partial<AppState> => {
        return {
            fupData: {
                ...previousState.fupData,
                ...memberInfo,
            },
        };
    };

    public static setSecurityQuestion = (previousState: AppState, question: SecurityQuestion): Partial<AppState> => {
        return { fupData: { ...previousState.fupData, question } };
    };

    public static setUsername = (previousState: AppState, username: string): Partial<AppState> => {
        return { fupData: { ...previousState.fupData, username } };
    };
}
