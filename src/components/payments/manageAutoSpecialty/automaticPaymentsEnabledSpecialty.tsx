import { AccountInfo, RecurringPaymentMethod } from 'atlas-services/src/models';
import { GET_SPECIALTY_ACCOUNTS } from 'atlas-services/src/services/middleware/serviceEndpoint';
import moment, { Moment } from 'moment';
import React from 'react';
import { PaymentActions } from '../../../context/navigation/actions';
import AppComponent from '../../common/appComponent';
import AutomaticPaymentsEnabledSpecialtyView, { Props as ViewProps } from './automaticPaymentsEnabledSpecialty.view';

export interface Props extends Partial<ViewProps> {
    enrolledPaymentMethodAccountNumber: string;
    selectedMemberUid: string;
}

export interface State {
    enrolledPaymentMethod: RecurringPaymentMethod;
    selectedSpecialtyAccount: AccountInfo;
    specialtyAccounts: AccountInfo[];
}
export default class AutomaticPaymentsEnabledSpecialty extends AppComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            enrolledPaymentMethod: null,
            selectedSpecialtyAccount: null,
            specialtyAccounts: [],
        };
    }

    public async componentDidMount() {
        this.getSpecialtyAccounts();
    }

    public render() {
        return (
            <AutomaticPaymentsEnabledSpecialtyView
                enrolledPaymentMethod={this.state.enrolledPaymentMethod}
                getPaymentDate={this.getPaymentDate}
                onPressReturnToHome={this.onPressReturnToHome}
                onPressSetUpAdditionalMembers={this.onPressSetUpAdditionalMembers}
                selectedSpecialtyAccount={this.state.selectedSpecialtyAccount}
                specialtyAccounts={this.state.specialtyAccounts}
                {...this.props}
            />
        );
    }

    protected findEnrollmentFrequency = (paymentMethod: RecurringPaymentMethod) => {
        return !!paymentMethod.frequency;
    };

    protected getPaymentDate = (paymentMethod: RecurringPaymentMethod): Moment => {
        const currentDate = moment();
        const firstPaymentDate: Moment = moment(currentDate).date(parseFloat(paymentMethod.frequency));
        return firstPaymentDate.isBefore(currentDate, 'date') ? firstPaymentDate.add(1, 'month') : firstPaymentDate;
    };

    protected getSpecialtyAccounts = () => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_SPECIALTY_ACCOUNTS)
            .then((specialtyAccounts: AccountInfo[]) => {
                const updatedAccount = specialtyAccounts.find(
                    account => account.memberUid === this.props.selectedMemberUid
                );
                this.setState({ selectedSpecialtyAccount: updatedAccount, specialtyAccounts }, () => {
                    this.setAutoEnrollmentDetails(this.state.selectedSpecialtyAccount);
                });
            });
    };

    protected onPressReturnToHome = () => {
        this.navigate(PaymentActions.GO_HOME_PRESSED);
    };

    protected onPressSetUpAdditionalMembers = () => {
        this.navigate(PaymentActions.SPECIALTY_PAY_NOW_MULTIPLE_MEMBERS_PRESSED);
    };

    protected setAutoEnrollmentDetails = (account: AccountInfo) => {
        const enrolledPaymentMethod: RecurringPaymentMethod =
            account &&
            account.paymentMethods?.find(
                paymentMethod => paymentMethod.accountNumber === this.props.enrolledPaymentMethodAccountNumber
            );
        this.setState({ enrolledPaymentMethod });
    };
}
