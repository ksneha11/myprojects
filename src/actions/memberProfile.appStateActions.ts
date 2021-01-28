import { MemberProfile } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface MemberProfileAppStateActions extends AppStateActions {
    memberProfile: {
        setMemberProfile: (memberProfile: MemberProfile) => void;
        setMemberTOUConsentStatus: (memberUid: string, consentStatus: boolean) => void;
    };
}

export class MemberProfileReducers {
    public static setMemberProfile = (previousState: AppState, memberProfile: MemberProfile): Partial<AppState> => {
        return { memberProfile };
    };

    public static setMemberTOUConsentStatus = (
        previousState: AppState,
        memberUid: string,
        consentStatus: boolean
    ): Partial<AppState> => {
        const membersTOUStatus = previousState.membersTOUStatus;

        const memberIndex = membersTOUStatus.findIndex(item => {
            return item.memberUid === memberUid;
        });

        if (memberIndex === -1) {
            membersTOUStatus.push({
                consentStatus,
                memberUid,
            });
        } else {
            membersTOUStatus[memberIndex].consentStatus = consentStatus;
        }

        return { membersTOUStatus };
    };
}
