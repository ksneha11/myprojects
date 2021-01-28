import { AppState } from '../models';

export enum MemberPreferenceVoiceNumberTypes {
    ACCOUNT = 'ACCOUNT',
    PHARMACY = 'PHARMACY',
}

export const getMemberPreferencesVoiceNumber = (type: MemberPreferenceVoiceNumberTypes, appState: AppState) => {
    if (type === MemberPreferenceVoiceNumberTypes.PHARMACY) {
        return (
            appState.memberPreferences.updatedPharmacyContactDetails &&
            appState.memberPreferences.updatedPharmacyContactDetails.phoneNumber
        );
    } else if (type === MemberPreferenceVoiceNumberTypes.ACCOUNT) {
        return appState.memberPreferences?.gbdSettings && appState.memberPreferences?.gbdSettings?.phoneNumber;
    }
};
