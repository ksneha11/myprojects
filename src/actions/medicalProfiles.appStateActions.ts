import { MedicalProfile } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface MedicalProfileAppStateActions extends AppStateActions {
    medicalProfiles: {
        setMedicalProfiles: (medicalProfiles: MedicalProfile[]) => void;
    };
}

export class MedicalProfileReducers {
    public static setMedicalProfiles = (
        previousState: AppState,
        medicalProfiles: MedicalProfile[]
    ): Partial<AppState> => {
        return { medicalProfiles };
    };
}
