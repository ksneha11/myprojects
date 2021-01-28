import { PharmacyInfo } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface PharmacyAppStateActionse extends AppStateActions {
    pharmacies: {
        setDefaultPharmacy: (defaultPharmacy: PharmacyInfo) => void;
        setFilteredPharmacies: (filteredPharmacies: PharmacyInfo[]) => void;
        setPharmacies: (pharmacies: PharmacyInfo[]) => void;
        setSelectedPharmacy: (selectedPharmacy: PharmacyInfo) => void;
    };
}

export class PharmacyReducers {
    public static setDefaultPharmacy = (previousState: AppState, defaultPharmacy: PharmacyInfo): Partial<AppState> => {
        return { defaultPharmacy };
    };

    public static setFilteredPharmacies = (
        previousState: AppState,
        filteredPharmacies: PharmacyInfo[]
    ): Partial<AppState> => {
        return { filteredPharmacies };
    };

    public static setPharmacies = (previousState: AppState, pharmacies: PharmacyInfo[]): Partial<AppState> => {
        return { pharmacies };
    };

    public static setSelectedPharmacies = (
        previousState: AppState,
        selectedPharmacy: PharmacyInfo
    ): Partial<AppState> => {
        return { selectedPharmacy };
    };
}
