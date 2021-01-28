import { OpportunityType, PrescriptionInfo, ShippingType } from 'atlas-services/src/models';
import { AppState } from '../models';
import AppStateActions from '../models/appStateActions';

export default interface SavingOpportunityAppStateActions extends AppStateActions {
    savingOpportunity: {
        setOptedOutPrescriptionId: (prescriptionId: PrescriptionInfo['id']) => void;
        setProcessedPrescription: (prescription: PrescriptionInfo) => void;
        setSelectedPrescription: (prescription: PrescriptionInfo) => void;
        setSelectedRetailPrescription: (prescriptions: PrescriptionInfo) => void;
        updateSelectedShippingType: (selectedShippingType: ShippingType) => void;
    };
}

export class SavingOpportunityReducers {
    public static setOptedOutPrescriptionId = (
        previousState: AppState,
        optedOutPrescriptionId: PrescriptionInfo['uniqueRxId']
    ): Partial<AppState> => {
        let nonActionablePrescriptions = previousState.nonActionablePrescriptions;
        if (optedOutPrescriptionId) {
            nonActionablePrescriptions = nonActionablePrescriptions.map(prescription => {
                if (optedOutPrescriptionId === prescription.uniqueRxId) {
                    prescription.opportunity.opportunityType = OpportunityType.NONE;
                }
                return prescription;
            });
        }
        return { nonActionablePrescriptions, optedOutPrescriptionId };
    };

    public static setProcessedPrescription = (
        previousState: AppState,
        processedPrescription: PrescriptionInfo
    ): Partial<AppState> => {
        return { processedPrescription };
    };

    public static setSelectedPrescription = (
        previousState: AppState,
        prescription: PrescriptionInfo
    ): Partial<AppState> => {
        return {
            savingOpportunityPrescription: prescription, // TODO: Remove this from top level structure.
        };
    };

    public static setSelectedRetailPrescription = (
        previousState: AppState,
        selectedRetailPrescription: PrescriptionInfo
    ): Partial<AppState> => {
        return { selectedRetailPrescription };
    };

    public static updateSelectedShippingType = (
        prevState: AppState,
        selectedShippingType: ShippingType
    ): Partial<AppState> => {
        return { selectedShippingType };
    };
}
