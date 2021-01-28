import { AccountBalance, AccountInfo } from 'atlas-services/src/models';
import { GET_ACCOUNT_BALANCE, GET_SPECIALTY_ACCOUNTS } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { PaymentActions } from '../../../context/navigation/actions';
import AppComponent from '../../common/appComponent';
import PaymentConfirmationView, { Props as ViewProps } from '../paymentConfirmationView';

interface Props extends Partial<ViewProps> {}

export interface State {
    accountBalance: AccountBalance;
    specialtyAccounts: AccountInfo[];
}

export default class extends AppComponent<Props, State> {
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
            specialtyAccounts: [],
        };
    }

    public componentDidMount() {
        this.getAccountInformation();
    }

    public render() {
        return (
            <PaymentConfirmationView
                accountBalance={this.state.accountBalance}
                isSpecialty
                isBalanceNotEmpty={this.isBalanceNotEmpty}
                onPressMakePayment={this.onPressMakePbmPayment}
                onPressPayNow={this.onPressPayNow}
                onSubmit={this.onSubmit}
                selectedPaymentMethod={this.appState.payAccountBalanceCart.selectedSpecialtyPaymentMethod}
                specialtyAccounts={this.state.specialtyAccounts}
                {...this.props}
            />
        );
    }

    protected findAccountDetails = (account: AccountInfo, specialtyAccounts: AccountInfo[]) => {
        return specialtyAccounts.find(specialtyKey => account.accountId === specialtyKey.accountHolder.memberUid);
    };

    protected getAccountDetails = (): void => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_ACCOUNT_BALANCE)
            .then((accountBalance: AccountBalance) => {
                this.setState({
                    accountBalance,
                });
            });
    };

    protected getAccountInformation = async () => {
        this.getAccountDetails();
        this.getSpecialtyAccounts();
    };

    protected getSpecialtyAccounts = (): void => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_SPECIALTY_ACCOUNTS)
            .then((responseSpecialtyAccounts: AccountInfo[]) => {
                this.setState(
                    {
                        specialtyAccounts: responseSpecialtyAccounts,
                    },
                    () => this.appStateActions.payAccountBalance.setSpecialtyAccounts(responseSpecialtyAccounts)
                );
            });
    };

    protected isBalanceNotEmpty = (balance: number) => {
        return balance > 0;
    };

    protected onPressMakePbmPayment = () => {
        this.navigate(PaymentActions.PAY_NOW_PHARMACY_PRESSED);
    };

    protected onPressPayNow = (specialtyAccount: AccountInfo) => {
        this.navigate(PaymentActions.SPECIALTY_PAY_NOW_PRESSED, { selectedMemberUid: specialtyAccount.memberUid });
    };

    protected onSubmit = () => {
        this.navigate(PaymentActions.GO_HOME_PRESSED);
    };
}
