import { PrescriberInfo } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface PrescriberAppStateActions extends AppStateActions {
    prescribers: {
        setApprovingPrescriber: (prescriber: PrescriberInfo) => void;
        setSearchedPrescribers: (prescribers: PrescriberInfo[]) => void;
    };
}

export class PrescriberReducers {
    public static setApprovingPrescriber = (
        previousState: AppState,
        selectedPrescriber: PrescriberInfo
    ): Partial<AppState> => {
        return {
            savingOpportunityPrescription: {
                ...previousState.savingOpportunityPrescription,
                prescriber: selectedPrescriber,
            },
        };
    };

    public static setSearchedPrescribers = (
        previousState: AppState,
        prescribers: PrescriberInfo[]
    ): Partial<AppState> => {
        return { prescribers };
    };
}
