import { AccountInfo, PaymentHistory, RecurringPaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import AppComponent from '../../../common/appComponent';
import { Props as ParentProps } from '../../../common/card';
import MakePaymentCardView from './makePaymentCard.view';

interface Props extends ParentProps {}

export interface State {
    numberOfAutoEnrolledAccounts: number;
    paymentHistory: PaymentHistory[];
}

export default class MakePaymentCard extends AppComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            numberOfAutoEnrolledAccounts: 0,
            paymentHistory: [],
        };
    }

    public render() {
        this.setNumberAutoenrolledAccounts();

        return (
            <MakePaymentCardView
                isPaymentNeeded={this.isPaymentNeeded}
                numberOfAutoEnrolledAccounts={this.state.numberOfAutoEnrolledAccounts}
                {...this.props}
            />
        );
    }

    protected isAccountEnrolled = (account: AccountInfo): boolean => {
        return account.paymentMethods.some(method => {
            const recurringMethod = method as RecurringPaymentMethod;
            return !!recurringMethod.frequency;
        });
    };

    protected isPaymentNeeded = (balance: number) => {
        return balance > 0;
    };

    protected setNumberAutoenrolledAccounts = () => {
        if (!!this.appState.specialtyAccounts?.length) {
            const autoEnrolledAccounts = this.appState.specialtyAccounts.filter(account => {
                return account.paymentMethods.find(method => {
                    const paymentMethod = method as RecurringPaymentMethod;
                    return !!paymentMethod.frequency;
                });
            });

            if (autoEnrolledAccounts.length !== this.state.numberOfAutoEnrolledAccounts) {
                this.setState({
                    numberOfAutoEnrolledAccounts: autoEnrolledAccounts.length,
                });
            }
        }
    };
}
