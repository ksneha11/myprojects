import { AccountBalance, AccountInfo, RecurringPaymentMethod } from 'atlas-services/src/models';
import { GET_ACCOUNT_BALANCE, GET_SPECIALTY_ACCOUNTS } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { SpecialtyPayNowMultipleMembersView } from '.';
import { PaymentActions } from '../../../context/navigation/actions';
import AppComponent from '../../common/appComponent';

export interface State {
    accountBalance: AccountBalance;
    specialtyAccountDetails: AccountInfo[];
}
export interface Props {}
export default class SpecialtyPayNowMultipleMembers extends AppComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            accountBalance: {
                pbmAccounts: [],
                specialtyAccounts: [],
                totalBalance: '',
                totalPbmBalance: '',
                totalSpecialtyBalance: '',
            },
            specialtyAccountDetails: [],
        };
    }

    public componentDidMount() {
        this.getAccountDetails();
    }

    public onPressPaymentHistory = (): void => {
        this.navigate(PaymentActions.PAYMENT_HISTORY_PRESSED);
    };

    public onPressSetupAutomaticPayments = (accountInfo: AccountInfo) => {
        this.appStateActions.payAccountBalance.setSelectedSpecialtyAccount(accountInfo);
        this.navigate(PaymentActions.MANAGE_AUTO_SPECIALTY_PRESSED, {
            onPressBack: this.clearPaymentMethod,
            selectedMemberUid: accountInfo.memberUid,
        });
    };

    public onPressViewSettings = (accountInfo: AccountInfo) => {
        const enrolledPaymentMethod = this.getEnrolledPaymentMethod(accountInfo);
        this.navigate(PaymentActions.SET_UP_AUTOMATIC_PAYMENTS_PRESSED, {
            enrolledPaymentMethod,
            onPressBack: this.clearPaymentMethod,
            selectedSpecialtyAccount: accountInfo,
        });
    };

    public render() {
        return (
            <>
                <SpecialtyPayNowMultipleMembersView
                    accountBalance={this.state.accountBalance}
                    onPressPayNow={this.onPressPayNow}
                    onPressPaymentHistory={this.onPressPaymentHistory}
                    onPressSetupAutomaticPayments={this.onPressSetupAutomaticPayments}
                    onPressViewSettings={this.onPressViewSettings}
                />
                <NavigationEvents onDidFocus={this.getAccountDetails} />
            </>
        );
    }

    protected clearPaymentMethod = () => {
        this.appStateActions.payments.setSelectedSpecialtyPaymentMethod(null);
        this.appStateActions.payAccountBalance.setSelectedSpecialtyPaymentMethod(null);
    };

    protected getAccountDetails = (): void => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_ACCOUNT_BALANCE)
            .then((accountBalance: AccountBalance) => {
                this.setState(
                    {
                        accountBalance,
                    },
                    () => {
                        this.getSpecialtyAccountDetails(this.state.accountBalance.specialtyAccounts);
                    }
                );
            });
    };

    protected getEnrolledPaymentMethod = (specialtyAccount: AccountInfo): RecurringPaymentMethod => {
        return (
            specialtyAccount.paymentMethods &&
            specialtyAccount.paymentMethods.find((paymentMethod: RecurringPaymentMethod) => !!paymentMethod.frequency)
        );
    };

    protected getSpecialtyAccountDetails = (specialtyAccounts: AccountInfo[]): void => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_SPECIALTY_ACCOUNTS)
            .then(responseSpecialtyAccounts => {
                this.setState(prevState => ({
                    accountBalance: { ...prevState.accountBalance, specialtyAccounts: responseSpecialtyAccounts },
                }));
            });
    };

    protected onPressPayNow = (amountDue: number, selectedAccount: AccountInfo) => {
        this.appStateActions.payAccountBalance.setSelectedSpecialtyAccount(selectedAccount);
        this.appStateActions.payAccountBalance.setAmountDue(amountDue);
        this.navigate(PaymentActions.SPECIALTY_PAY_NOW_PRESSED, {
            onPressBack: this.clearPaymentMethod,
            selectedMemberUid: selectedAccount.memberUid,
        });
    };
}
