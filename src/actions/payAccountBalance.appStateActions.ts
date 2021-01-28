import { AccountInfo, PaymentMethod, RecurringPaymentMethod } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface PayAccountBalanceAppStateActions extends AppStateActions {
    payAccountBalance: {
        setAmountDue: (amountDue: number) => void;
        setPaymentAmount: (paymentAmount: number) => void;
        setPbmAccountBalance: (pbmAccountBalance: string) => void;
        setPbmAccounts: (specialtyAccounts: AccountInfo[]) => void;
        setSelectedPbmPaymentMethod: (selectedPbmPaymentMethod: PaymentMethod) => void;
        setSelectedSpecialtyAccount: (selectedSpecialtyAccount: AccountInfo) => void;
        setSelectedSpecialtyPaymentMethod: (selectedSpecialtyPaymentMethod: RecurringPaymentMethod) => void;
        setSpecialtyAccountBalance: (specialtyAccountBalance: string) => void;
        setSpecialtyAccounts: (specialtyAccounts: AccountInfo[]) => void;
        setTotalAccountBalance: (totalAccountBalance: number) => void;
    };
}

export class PayAccountBalanceReducers {
    public static setAmountDue = (previousState: AppState, amountDue): Partial<AppState> => {
        previousState.payAccountBalanceCart.amountDue = amountDue;
        return previousState;
    };

    public static setPaymentAmount = (previousState: AppState, paymentAmount): Partial<AppState> => {
        previousState.payAccountBalanceCart.paymentAmount = paymentAmount;
        return previousState;
    };

    public static setPbmAccountBalance = (
        previousState: AppState,
        pbmAccountBalance: string = '0.00'
    ): Partial<AppState> => {
        return { ...previousState, pbmAccountBalance: parseFloat(pbmAccountBalance) };
    };

    public static setPbmAccounts = (previousState: AppState, pbmAccounts: AccountInfo[]) => {
        return { ...previousState, pbmAccounts };
    };

    public static setSelectedPbmPaymentMethod = (
        previousState: AppState,
        pbmPaymentMethod: PaymentMethod
    ): Partial<AppState> => {
        previousState.payAccountBalanceCart.selectedPbmPaymentMethod = pbmPaymentMethod;
        return previousState;
    };

    public static setSelectedSpecialtyAccount = (
        previousState: AppState,
        selectedSpecialtyAccount: AccountInfo
    ): Partial<AppState> => {
        previousState.payAccountBalanceCart.selectedSpecialtyAccount = selectedSpecialtyAccount;
        return previousState;
    };

    public static setSelectedSpecialtyPaymentMethod = (
        previousState: AppState,
        specialtyPaymentMethod: RecurringPaymentMethod
    ): Partial<AppState> => {
        previousState.payAccountBalanceCart.selectedSpecialtyPaymentMethod = specialtyPaymentMethod;
        return previousState;
    };

    public static setSpecialtyAccountBalance = (
        previousState: AppState,
        specialtyAccountBalance: string = '0.00'
    ): Partial<AppState> => {
        return { ...previousState, specialtyAccountBalance: parseFloat(specialtyAccountBalance) };
    };

    public static setSpecialtyAccounts = (previousState: AppState, specialtyAccounts: AccountInfo[]) => {
        return { ...previousState, specialtyAccounts };
    };

    public static setTotalAccountBalance = (
        previousState: AppState,
        totalAccountBalance: number
    ): Partial<AppState> => {
        return { ...previousState, totalAccountBalance };
    };
}
