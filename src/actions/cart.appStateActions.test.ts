import { initialCart, OpportunityType, PrescriptionInfo, RefillRenewStatus } from 'atlas-services/src/models';
import AppState from '../models/appState';
import deepClone from '../utils/deepClone';
import { PrescriptionCartReducers } from './prescriptionCart.appStateActions';

// FIXME?: Does this need to be updated
describe('Test CartActions', () => {
    const appState: AppState = {
        prescriptionCart: deepClone(initialCart),
    };
    const prescriptionCartActions = new PrescriptionCartReducers();
    const testPrescription: PrescriptionInfo = {
        autoPrescriptionPreferences: {
            isAutoRefilled: false,
            isAutoRenewed: false,
            prescriptionEligibility: {
                refill: true,
                renew: true,
            },
            userEligibility: {
                refill: true,
                renew: false,
            },
        },
        dosageDirections: '',
        drugInfo: {
            controlledSubstance: false,
            deaScheduling: '',
            dosage: '',
            form: '',
            isSensitive: false,
            name: '',
            ndcNumber: '',
        },
        eligibility: {
            refill: true,
            renew: false,
        },
        estimatedCopay: '15.00',
        expirationDate: '',
        fulfilledBy: 'The Doctor',
        id: '1',
        isSpecialty: false,
        lastFilled: new Date('10/15/18'),
        memberUid: '123',
        opportunity: {
            filled90DayAtCVS: false,
            opportunityType: OpportunityType.NONE,
            optOutEligible: false,
        },
        prescribedTo: {
            dob: '1970-01-01',
            firstName: 'first',
            lastName: 'last',
        },
        prescriber: {
            firstName: '',
            lastName: '',
        },
        prescriptionStatus: '',
        refillStatus: 'Available now' as RefillRenewStatus,
        remainingRefills: 20,
        renewStatus: '' as RefillRenewStatus,
        rxNumber: '123456789',
        shipsWithColdPack: false,
        supply: {
            duration: '',
            quantity: '',
        },
    };

    beforeEach(() => {
        appState.prescriptionCart = deepClone(initialCart);
    });

    it('should add an item to the cart', () => {
        const newAppState: AppState = prescriptionCartActions.togglePrescription(appState, testPrescription);
        expect(newAppState.prescriptionCart.pharmacy.prescriptionRefills[0]).toEqual(testPrescription);
    });

    it('should remove an item from the cart', () => {
        appState.prescriptionCart.pharmacy.prescriptionRefills.push(testPrescription);
        const newAppState: AppState = prescriptionCartActions.togglePrescription(appState, testPrescription);
        expect(newAppState.prescriptionCart).toEqual(initialCart);
    });

    it('should clear the cart', () => {
        appState.prescriptionCart.pharmacy.prescriptionRefills.push(testPrescription);
        appState.prescriptionCart.specialty.prescriptionRefills.push(testPrescription);
        const newAppState: AppState = prescriptionCartActions.clearCart(appState);
        expect(newAppState.prescriptionCart).toEqual(initialCart);
    });
});
