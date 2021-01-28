import { AccountInfo } from 'atlas-services/src/models';
import { GET_SPECIALTY_ACCOUNTS } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { PaymentActions } from '../../context/navigation/actions';
import AppComponent from '../common/appComponent';
import PaymentConfirmationView, { Props as ViewProps } from './paymentConfirmationView';

interface Props extends ViewProps {}

export interface State {
    specialtyAccounts: AccountInfo[];
}

export default class extends AppComponent<Partial<Props>, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            specialtyAccounts: [],
        };
    }

    public componentDidMount() {
        this.getSpecialtyAccounts();
    }

    public render() {
        return (
            <PaymentConfirmationView
                isBalanceNotEmpty={this.isBalanceNotEmpty}
                onPressMakePayment={this.onPressMakeSpecialtyPayment}
                onSubmit={this.onSubmit}
                selectedPaymentMethod={this.appState.payAccountBalanceCart.selectedPbmPaymentMethod}
                specialtyAccounts={this.state.specialtyAccounts}
                {...this.props}
            />
        );
    }

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

    protected onPressMakeSpecialtyPayment = () => {
        if (this.state.specialtyAccounts.length === 1) {
            this.navigate(PaymentActions.SPECIALTY_PAY_NOW_PRESSED, {
                selectedMemberUid: this.state.specialtyAccounts[0].memberUid,
            });
        } else {
            this.navigate(PaymentActions.SPECIALTY_PAY_NOW_MULTIPLE_MEMBERS_PRESSED);
        }
    };

    protected onSubmit = () => {
        this.navigate(PaymentActions.GO_HOME_PRESSED);
    };
}
