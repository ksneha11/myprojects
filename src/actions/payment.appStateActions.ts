import { PaymentMethod, RecurringPaymentMethod } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface PaymentAppStateActions extends AppStateActions {
    payments: {
        setSelectedPaymentMethod: (paymentMethod: PaymentMethod) => void;
        setSelectedSpecialtyPaymentMethod: (paymentMethod: RecurringPaymentMethod) => void;
    };
}

export class PaymentReducers {
    public static selectedPaymentMethod = (prevState: AppState, paymentMethod: PaymentMethod): Partial<AppState> => {
        prevState.selectedPaymentMethod = paymentMethod;
        return prevState;
    };

    public static setSelectedSpecialtyPaymentMethod = (
        prevState: AppState,
        specialtyPaymentMethod: RecurringPaymentMethod
    ): Partial<AppState> => {
        prevState.selectedSpecialtyPaymentMethod = specialtyPaymentMethod;
        return prevState;
    };
}
