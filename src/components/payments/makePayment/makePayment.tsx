import { AccountBalance, AccountInfo, PaymentHistory, RecurringPaymentMethod } from 'atlas-services/src/models';
import {
    GET_ACCOUNT_BALANCE,
    GET_PAYMENT_HISTORY,
    GET_SPECIALTY_ACCOUNTS,
} from 'atlas-services/src/services/middleware/serviceEndpoint';
import moment from 'moment';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { formatCurrency } from '../../../../src/utils';
import { PaymentActions } from '../../../context/navigation/actions';
import AppComponent from '../../common/appComponent';
import { MakePaymentView, Props } from './';

export interface State {
    accountBalance: AccountBalance;
    paymentHistory: PaymentHistory[];
    specialtyAccounts: AccountInfo[];
}

export const defaultProps = {
    formatCurrency,
};

export class MakePayment extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;
    constructor(props: Props) {
        super(props);
        this.state = {
            accountBalance: null,
            paymentHistory: [],
            specialtyAccounts: [],
        };
    }

    public componentDidMount() {
        this.getAccountBalance();
        this.getPaymentHistory();
        this.getSpecialtyAccounts();
    }

    public render() {
        return (
            <>
                <MakePaymentView
                    autoEnrolledSpecialtyAccounts={this.getAutoEnrolledAccounts()}
                    hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                    isPaymentNeeded={this.isPaymentNeeded}
                    onPressManageAutoSpecialty={this.onPressManageAutoSpecialty}
                    onPressPaymentHistory={this.onPressPaymentHistory}
                    onPressPharmacyAccount={this.onPressPharmacyAccount}
                    onPressSpecialtyAccount={this.onPressSpecialtyAccount}
                    recentPayment={this.getMostRecentPayment()}
                    specialtyAccounts={this.state.specialtyAccounts}
                    {...this.props}
                />
                <NavigationEvents onDidFocus={this.getSpecialtyAccounts} />
            </>
        );
    }

    protected clearPBMPaymentMethod = () => {
        this.appStateActions.payAccountBalance.setSelectedPbmPaymentMethod(null);
        this.appStateActions.payments.setSelectedPaymentMethod(null);
    };

    protected clearSpecialtyPaymentMethod = () => {
        this.appStateActions.payments.setSelectedSpecialtyPaymentMethod(null);
        this.appStateActions.payAccountBalance.setSelectedSpecialtyPaymentMethod(null);
    };

    protected getAccountBalance = () => {
        this.executeService(GET_ACCOUNT_BALANCE, (accountBalance: AccountBalance) => {
            this.setState(
                {
                    accountBalance,
                },
                () => {
                    // TODO: pass accountBalance into these directly vs. re-accessing accountBalance from state
                    // don't want to change it now in case these were overridden somewhere
                    this.setPbmAccountBalance();
                    this.setSpecialtyAccountBalance();
                }
            );
        });
    };

    protected getAutoEnrolledAccounts = (): AccountInfo[] => {
        if (this.state.specialtyAccounts && this.state.specialtyAccounts.length) {
            const autoEnrolledAccounts: AccountInfo[] = this.state.specialtyAccounts.filter(account =>
                this.isAccountEnrolled(account)
            );
            return autoEnrolledAccounts;
        }
        return [];
    };

    protected getEnrolledPaymentMethod = (specialtyAccount: AccountInfo): RecurringPaymentMethod => {
        return (
            specialtyAccount.paymentMethods &&
            specialtyAccount.paymentMethods.find((paymentMethod: RecurringPaymentMethod) => !!paymentMethod.frequency)
        );
    };

    protected getMostRecentPayment = () => {
        if (this.state.paymentHistory && this.state.paymentHistory.length) {
            let mostRecentPayment = this.state.paymentHistory[0];
            for (const payment of this.state.paymentHistory) {
                mostRecentPayment = moment(payment.transactionDate).isAfter(moment(mostRecentPayment.transactionDate))
                    ? payment
                    : mostRecentPayment;
            }
            return mostRecentPayment;
        }
        return null;
    };

    protected getPaymentHistory = () => {
        this.executeService(GET_PAYMENT_HISTORY, (paymentHistory: PaymentHistory[]) => {
            this.setState({ paymentHistory });
        });
    };

    protected getSpecialtyAccounts = () => {
        this.executeService(GET_SPECIALTY_ACCOUNTS, (specialtyAccounts: AccountInfo[]) => {
            this.setState({ specialtyAccounts });
        });
    };

    // checks to see if account is enrolled by checking to see if its a RecurringPaymentMethod with a frequency
    protected isAccountEnrolled = (account: AccountInfo) => {
        return account.paymentMethods.some(method => {
            const recurringMethod = method as RecurringPaymentMethod;

            // this is doing a not not, seeing if frequency is defined
            return !!recurringMethod.frequency;
        });
    };

    protected isPaymentNeeded = (balance: number) => {
        return balance > 0;
    };

    protected onPressManageAutoSpecialty = (): void => {
        this.state.specialtyAccounts.length > 1
            ? this.navigate(PaymentActions.SPECIALTY_PAY_NOW_MULTIPLE_MEMBERS_PRESSED, {
                  onPressBack: this.clearSpecialtyPaymentMethod,
              })
            : this.onPressManageAutoSpecialtySingleMember();
    };

    protected onPressManageAutoSpecialtySingleMember = () => {
        if (this.state.specialtyAccounts.length === 1) {
            this.appStateActions.payAccountBalance.setSelectedSpecialtyAccount(this.state.specialtyAccounts[0]);
            const isEnrolled = this.isAccountEnrolled(this.state.specialtyAccounts[0]);
            const enrolledPaymentMethod: RecurringPaymentMethod =
                isEnrolled && this.getEnrolledPaymentMethod(this.state.specialtyAccounts[0]);
            isEnrolled
                ? this.navigate(PaymentActions.SET_UP_AUTOMATIC_PAYMENTS_PRESSED, {
                      enrolledPaymentMethod,
                      onPressBack: this.clearSpecialtyPaymentMethod,
                      selectedSpecialtyAccount: this.state.specialtyAccounts[0],
                  })
                : this.navigate(PaymentActions.MANAGE_AUTO_SPECIALTY_PRESSED, {
                      onPressBack: this.clearSpecialtyPaymentMethod,
                      selectedMemberUid: this.state.specialtyAccounts[0].memberUid,
                  });
        }
    };

    protected onPressPaymentHistory = (): void => {
        this.navigate(PaymentActions.PAYMENT_HISTORY_PRESSED);
    };

    protected onPressPharmacyAccount = (): void => {
        this.navigate(PaymentActions.PAY_NOW_PHARMACY_PRESSED, { onPressBack: this.clearPBMPaymentMethod });
    };

    protected onPressSpecialtyAccount = (): void => {
        this.state.accountBalance.specialtyAccounts.length > 1
            ? this.navigate(PaymentActions.SPECIALTY_PAY_NOW_MULTIPLE_MEMBERS_PRESSED, {
                  onPressBack: this.clearSpecialtyPaymentMethod,
              })
            : this.onPressSpecialtyAccountSingleMember();
    };

    protected onPressSpecialtyAccountSingleMember = () => {
        this.navigate(PaymentActions.SPECIALTY_PAY_NOW_PRESSED, {
            onPressBack: this.clearSpecialtyPaymentMethod,
            selectedMemberUid: this.state.specialtyAccounts[0].memberUid,
        });
    };

    protected setPbmAccountBalance = () => {
        if (this.state.accountBalance) {
            this.appStateActions.payAccountBalance.setPbmAccountBalance(this.state.accountBalance.totalPbmBalance);
        }
    };

    protected setSpecialtyAccountBalance = () => {
        const accountBalance: AccountBalance = this.state.accountBalance || ({} as AccountBalance);
        const specialtyAccounts: AccountInfo[] = accountBalance.specialtyAccounts || [];
        let totalSpecialtyBalance = 0;
        for (const payment of specialtyAccounts) {
            totalSpecialtyBalance = totalSpecialtyBalance + parseFloat(payment.accountBalance);
        }
        this.appStateActions.payAccountBalance.setSpecialtyAccountBalance(totalSpecialtyBalance.toString());
    };
}

export default MakePayment;
