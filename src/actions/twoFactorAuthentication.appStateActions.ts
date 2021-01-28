import { TwoFactorAuthenticationContactInfo } from 'atlas-services/src/models';
import { AppState } from '../models';
import AppStateActions from '../models/appStateActions';

export default interface TwoFactorAuthenticationAppStateActions extends AppStateActions {
    twoFactorAuthenticationData: {
        clearTwoFactorData: () => Promise<void>;
        setContactInfo: (contactInfo: TwoFactorAuthenticationContactInfo[], memberUid?: string) => Promise<void>;
        setSelectedContactInfo: (contactInfos: TwoFactorAuthenticationContactInfo) => Promise<void>;
        setUsernamePassword: (username: string, password: string) => Promise<void>;
    };
}

export class TwoFactorAuthenticationReducers {
    public static clearTwoFactorData = (appState: AppState) => {
        return { twoFactorAuthenticationData: { contactInfo: [] } };
    };

    public static setContactInfo = (
        appState: AppState,
        contactInfo: TwoFactorAuthenticationContactInfo[],
        memberUid?: string
    ): Partial<AppState> => {
        return { twoFactorAuthenticationData: { ...appState.twoFactorAuthenticationData, contactInfo, memberUid } };
    };

    public static setSelectedContactInfo = (
        appState: AppState,
        contactInfo: TwoFactorAuthenticationContactInfo
    ): Partial<AppState> => {
        return {
            twoFactorAuthenticationData: { ...appState.twoFactorAuthenticationData, selectedContactInfo: contactInfo },
        };
    };

    public static setUsernamePassword = (appState: AppState, username: string, password: string): Partial<AppState> => {
        return { twoFactorAuthenticationData: { ...appState.twoFactorAuthenticationData, username, password } };
    };
}
