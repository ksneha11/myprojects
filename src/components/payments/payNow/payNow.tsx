import {
    AccountInfo,
    CreditCard,
    PayAccountBalanceCart,
    Payment,
    PaymentMethod,
    PaymentType,
} from 'atlas-services/src/models';
import { GET_PAYMENT_ACCOUNTS, MAKE_PBM_PAYMENT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import isEqual from 'lodash.isequal';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { PaymentActions } from '../../../context/navigation/actions';
import { formatCurrency } from '../../../utils';
import { isExpired } from '../../../utils/paymentHelperMethods';
import AppComponent from '../../common/appComponent';
import { PayNowView, Props } from './';

export interface State {
    accounts: PaymentMethod[];
    flexibleSpendingAccounts: AccountInfo[];
}
export const defaultProps = {
    formatCurrency,
};

export class PayNow extends AppComponent<Partial<Props>, State> {
    public static defaultProps = defaultProps;

    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            flexibleSpendingAccounts: [],
        };
    }

    public render() {
        return (
            <>
                <PayNowView
                    arePaymentsPresent={this.arePaymentsPresent()}
                    isPaymentNeeded={this.isPaymentNeeded}
                    isSubmitButtonDisabled={this.isSubmitButtonDisabled()}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                    paymentAmountValue={this.props.formatCurrency(this.appState.pbmAccountBalance)}
                    onPressChangePaymentMethod={this.onPressChangePaymentMethod}
                    onPressPaymentHistory={this.onPressPaymentHistory}
                    selectedPaymentMethod={this.getDefaultSelectedPaymentMethod()}
                    style={this.style}
                    {...this.props}
                />
                <NavigationEvents onDidFocus={this.getAccounts} />
            </>
        );
    }

    protected arePaymentsPresent = (): boolean => {
        return this.state.accounts.length > 0;
    };

    protected createMakePbmPaymentRequest = (): Payment => {
        const selectedPaymentMethod = this.getDefaultSelectedPaymentMethod();
        const payAccountBalanceCart =
            this.appState.payAccountBalanceCart ||
            this.logger.warn('inside pay account balance no paymentAmount is defined , something is wrong') ||
            ({} as PayAccountBalanceCart);
        return {
            accountInfo: {
                accountBalance: payAccountBalanceCart.paymentAmount.toString(),
                accountId: selectedPaymentMethod.accountName,
            },
            billingAddress: null,
            paymentAmount: this.appState.pbmAccountBalance.toString(),
            paymentMethod: selectedPaymentMethod,
        };
    };

    protected getAccounts = (): void => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_PAYMENT_ACCOUNTS)
            .then(response => {
                this.setState({ accounts: response || [] });
            });
    };

    protected getDefaultSelectedPaymentMethod = (): PaymentMethod => {
        const { selectedPbmPaymentMethod } = this.appState.payAccountBalanceCart;
        if (selectedPbmPaymentMethod && this.state.accounts.includes(selectedPbmPaymentMethod)) {
            return selectedPbmPaymentMethod;
        } else if (this.state.accounts.length) {
            const defaultPaymentMethod = this.state.accounts.find(paymentMethod => paymentMethod.isDefaultMethod);
            return defaultPaymentMethod;
        } else {
            return null;
        }
    };

    protected haveAccountsOrDefaultPaymentChanged = (
        accounts: AccountInfo[],
        defaultPaymentMethod: PaymentMethod,
        prevAccounts: AccountInfo[],
        prevDefaultPaymentMethod: PaymentMethod
    ): boolean => {
        return (
            defaultPaymentMethod &&
            accounts &&
            (!isEqual(defaultPaymentMethod, prevDefaultPaymentMethod) || !isEqual(accounts, prevAccounts))
        );
    };

    protected isPaymentNeeded = (balance: number) => {
        return balance > 0;
    };

    protected isSubmitButtonDisabled = (): boolean => {
        const selectedPaymentMethod: PaymentMethod = this.getDefaultSelectedPaymentMethod();
        if (selectedPaymentMethod?.paymentType === PaymentType.CREDIT_CARD) {
            return (
                !this.appState.pbmAccountBalance ||
                !selectedPaymentMethod ||
                isExpired((selectedPaymentMethod as CreditCard)?.expirationDate)
            );
        } else {
            return !this.appState.pbmAccountBalance || !selectedPaymentMethod;
        }
    };

    protected makePBMPayment = () => {
        this.context.appContext
            .getServiceExecutor()
            .execute(MAKE_PBM_PAYMENT, {
                payload: this.createMakePbmPaymentRequest(),
            })
            .then(() => {
                this.appStateActions.payAccountBalance.setPaymentAmount(this.appState.pbmAccountBalance);
                this.appStateActions.payAccountBalance.setSelectedPbmPaymentMethod(
                    this.getDefaultSelectedPaymentMethod()
                );
                this.navigate(PaymentActions.SUBMIT_PAYMENT_PRESSED);
            });
    };

    protected onCancel = () => {
        this.getNavigationParams('onPressBack')();
        return this.navigate(PaymentActions.PAY_NOW_CANCEL_PRESSED);
    };

    protected onPressChangePaymentMethod = isManagePayment => {
        if (isManagePayment) {
            this.setNavigationParams({ onSaveRoute: PaymentActions.MANAGE_PHARMACY_PAYMENT_METHOD_PRESSED });
            this.navigate(PaymentActions.MANAGE_PHARMACY_PAYMENT_METHOD_PRESSED, {
                onSaveRoute: PaymentActions.MANAGE_PHARMACY_PAYMENT_METHOD_PRESSED,
            }); // Manage payment method allows only add and edit payment cards (Profile payment view)
        } else {
            this.navigate(PaymentActions.CHANGE_PHARMACY_PAYMENT_METHOD_PRESSED, {
                onSaveRoute: PaymentActions.CHANGE_PHARMACY_PAYMENT_METHOD_PRESSED,
            }); // Change payment method allows user to select a payment method and save it for the current checkout and display same in payment card.
        }
    };

    protected onPressPaymentHistory = () => {
        this.navigate(PaymentActions.PAYMENT_HISTORY_PRESSED);
    };

    protected onSubmit = () => {
        this.makePBMPayment();
    };

    protected setPaymentAmount = (pbmBalance: number) => {
        this.appStateActions.payAccountBalance.setPaymentAmount(pbmBalance);
    };
}

export default PayNow;
