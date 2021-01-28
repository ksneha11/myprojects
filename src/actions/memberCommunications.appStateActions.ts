import { Preferences } from 'atlas-services/src/models/memberPreferences';
import { AppState, AppStateActions } from '../models';

export default interface MemberCommunicationsAppStateActions extends AppStateActions {
    memberCommunications: {
        setMemberCommercialEmail: (memberCommericalEmail: string) => void;
        setMemberCommercialText: (memberCommercialText: string) => void;
        setMemberCommercialVoice: (memberCommercialVoice: string) => void;
        setMemberPreferences: (memberPreferences: Preferences) => void;
    };
}

export class MemberCommunicationsReducers {
    public static setMemberCommercialEmail = (prevState: AppState, newMemberEmail: string): Partial<AppState> => {
        prevState.memberPreferences.updatedPharmacyContactDetails.emailAddress = newMemberEmail;
        return prevState;
    };

    public static setMemberCommercialText = (prevState: AppState, newMemberTextNumber: string): Partial<AppState> => {
        prevState.memberPreferences.updatedPharmacyContactDetails.smsNumber = newMemberTextNumber;
        // TODO: Change these to an enum when we have agg services setup
        prevState.memberPreferences.updatedPharmacyContactDetails.smsRegistrationStatus = newMemberTextNumber
            ? 'ENROLLED'
            : 'NOT ENROLLED';
        return prevState;
    };

    public static setMemberCommercialVoice = (prevState: AppState, newMemberVoiceNumber: string): Partial<AppState> => {
        prevState.memberPreferences.updatedPharmacyContactDetails.phoneNumber = newMemberVoiceNumber;
        return prevState;
    };

    public static setMemberPreferences = (
        prevState: AppState,
        newMemberPreferences: Preferences
    ): Partial<AppState> => {
        prevState.memberPreferences = newMemberPreferences;
        return prevState;
    };
}
