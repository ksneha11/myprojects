import { AppState } from '../models';

export enum MemberPreferenceEmailTypes {
    ACCOUNT = 'ACCOUNT',
    PHARMACY = 'PHARMACY',
}

export const getMemberPreferencesEmail = (type: MemberPreferenceEmailTypes, appState: AppState) => {
    if (type === MemberPreferenceEmailTypes.PHARMACY) {
        return (
            appState.memberPreferences.updatedPharmacyContactDetails &&
            appState.memberPreferences.updatedPharmacyContactDetails.emailAddress
        );
    } else if (type === MemberPreferenceEmailTypes.ACCOUNT) {
        return appState.memberPreferences.gbdSettings && appState.memberPreferences.gbdSettings.emailAddress;
    }
};
