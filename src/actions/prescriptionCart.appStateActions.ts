import { PrescriptionInfo, SpecialtyQuestion } from 'atlas-services/src/models';
import { CartReducers } from '.';
import { AppState } from '../models';
import { CartType } from './cart.appStateActions';

// not 100% sure why this isn't consolidated with cart actions directly
export class PrescriptionCartReducers extends CartReducers {
    constructor() {
        super(CartType.PRESCRIPTION_CART);
    }
    public loadPrescriptions = (
        appState: AppState,
        actionablePrescriptions: PrescriptionInfo[],
        nonActionablePrescriptions: PrescriptionInfo[]
    ) => {
        return { actionablePrescriptions, nonActionablePrescriptions };
    };

    public setSpecialtyQuestions = (appState: AppState, specialtyQuestions: SpecialtyQuestion[]): Partial<AppState> => {
        return {
            prescriptionCart: {
                ...appState.prescriptionCart,
                specialty: { ...appState.prescriptionCart.specialty, specialtyQuestions },
            },
        };
    };
}
