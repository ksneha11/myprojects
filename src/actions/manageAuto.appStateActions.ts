import { MedicalProfile, PrescriptionInfo } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface ManageAutoAppStateActions extends AppStateActions {
    manageAuto: {
        clearManageAutoEnrollmentData: () => void;
        isRenew: (isRenew: boolean) => void;
        setSelectedMedicalProfile: (medicalProfile: MedicalProfile) => void;
        setSelectedPrescription: (prescription: PrescriptionInfo) => void;
        updatePrescriptionPreferences: (autoParams: Partial<PrescriptionInfo>) => void;
    };
}

export class ManageAutoReducers {
    public static clearManageAutoEnrollmentData = (appState: AppState): Partial<AppState> => {
        return {
            manageAutoEnrollmentData: {
                selectedMedicalProfile: null,
                selectedPrescription: null,
            },
        };
    };

    public static isRenew = (previousState: AppState, isRenew: boolean): Partial<AppState> => {
        return { isRenew };
    };

    public static setSelectedMedicalProfile = (
        appState: AppState,
        selectedMedicalProfile: MedicalProfile
    ): Partial<AppState> => {
        return {
            manageAutoEnrollmentData: {
                ...appState.manageAutoEnrollmentData,
                selectedMedicalProfile,
            },
        };
    };

    public static setSelectedPrescription = (appState: AppState, selectedPrescription): Partial<AppState> => {
        return {
            manageAutoEnrollmentData: {
                ...appState.manageAutoEnrollmentData,
                selectedPrescription,
            },
        };
    };

    public static updatePrescriptionPreferences = (
        previousState: AppState,
        autoParams: Partial<PrescriptionInfo>
    ): Partial<AppState> => {
        const updatedPrescriptionList: PrescriptionInfo[] = previousState.actionablePrescriptions.map(rx => {
            if (rx.uniqueRxId === autoParams.uniqueRxId) {
                rx.autoPrescriptionPreferences = autoParams.autoPrescriptionPreferences;
            }
            return rx;
        });
        return {
            actionablePrescriptions: updatedPrescriptionList,
        };
    };
}
