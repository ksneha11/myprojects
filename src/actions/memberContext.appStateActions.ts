import { MemberContext, MemberInfo } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface MemberContextAppStateActions extends AppStateActions {
    memberContext: {
        setMemberContext: (memberContext: MemberContext) => Promise<void>;
        setMemberInfo: (memberInfo: MemberInfo) => Promise<void>;
    };
}

export class MemberContextReducers {
    public static setMemberContext = (previousState: AppState, memberContext: MemberContext): Partial<AppState> => {
        return { memberContext };
    };

    public static setMemberInfo = (previousState: AppState, memberInfo: MemberInfo): Partial<AppState> => {
        return { memberContext: { ...previousState.memberContext, memberInfo } };
    };
}
