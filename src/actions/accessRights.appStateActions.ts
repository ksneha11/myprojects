import { FamilyAccessInformation } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface AccessRightsAppStateActions extends AppStateActions {
    accessRights: {
        setMyFamilyAccessRights: (myFamilyAccessRights: FamilyAccessInformation) => void;
    };
}

export class AccessRightsReducers {
    public static setMyFamilyAccessRights = (
        previousState: AppState,
        myFamilyAccessRights: FamilyAccessInformation
    ): Partial<AppState> => {
        return { myFamilyAccessRights };
    };
}
