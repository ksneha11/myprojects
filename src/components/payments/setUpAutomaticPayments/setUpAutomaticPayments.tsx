import {
    AccountInfo,
    AddUpdateSpecialtyAccountRequest,
    PaymentMethod,
    RecurringPaymentMethod,
} from 'atlas-services/src/models';
import { TransactionMode } from 'atlas-services/src/models/payment';
import { UPDATE_SPECIALTY_ACCOUNT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { NavigationParams, NavigationScreenProp } from 'react-navigation';
import { SetUpAutomaticPaymentsView, ViewProps } from '.';
import { PaymentActions } from '../../../context/navigation/actions';
import AppComponent from '../../common/appComponent';
interface State {
    cancelEnrollmentDialogVisible: boolean;
    name: string;
    status: string;
}

interface Props extends Partial<ViewProps> {
    enrolledPaymentMethod: RecurringPaymentMethod;
    navigation: NavigationScreenProp<NavigationParams, any>;
    selectedSpecialtyAccount: AccountInfo;
}

class SetUpAutomaticPayments extends AppComponent<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            cancelEnrollmentDialogVisible: false,
            name: '',
            status: 'Enrolled',
        };
    }

    public consolidateAddUpdateSpecialtyAccount = (): AddUpdateSpecialtyAccountRequest => {
        return {
            memberUid: this.props.selectedSpecialtyAccount.memberUid,
            paymentMethod: {
                accountID: this.props.enrolledPaymentMethod.accountID,
                accountName: this.props.enrolledPaymentMethod.accountName,
                accountNumber: this.props.enrolledPaymentMethod.accountNumber,
                bankAccountType: this.props.enrolledPaymentMethod.bankAccountType,
                billingAddress: this.props.enrolledPaymentMethod.billingAddress,
                companyName: this.props.enrolledPaymentMethod.companyName,
                expirationDate: this.props.enrolledPaymentMethod.expirationDate,
                isDefaultMethod: this.props.enrolledPaymentMethod.isDefaultMethod,
                isFSA: this.props.enrolledPaymentMethod.isFSA,
                isRecurring: false,
                paymentType: this.props.enrolledPaymentMethod.paymentType,
                relationshipToCardHolder: this.props.enrolledPaymentMethod.relationshipToCardHolder,
                routingNumber: this.props.enrolledPaymentMethod.routingNumber,
            },
            transactionMode: TransactionMode.EDIT,
        };
    };

    public getAutoEnrolledPaymentInfo = (accountInfo: AccountInfo) => {
        return accountInfo.paymentMethods.find(paymentMethod => {
            const recurringPaymentMethod = paymentMethod as RecurringPaymentMethod;
            return !!recurringPaymentMethod.frequency;
        });
    };

    public onPressCancelEnrollment = () => {
        this.showCancelEnrollmentDialog();
    };

    public onPressCancelUnenrollment = () => {
        this.hideCancelEnrollmentDialog();
    };

    public onPressChangeSettings = async () => {
        this.navigate(PaymentActions.MANAGE_AUTO_SPECIALTY_PRESSED, {
            onPressBack: this.clearPaymentMethod,
            selectedMemberUid: this.props.selectedSpecialtyAccount.memberUid,
        });
    };

    public onPressDone = () => {
        this.props.navigation.pop();
    };

    public onPressUnenroll = () => {
        this.appContext
            .getServiceExecutor()
            .execute(UPDATE_SPECIALTY_ACCOUNT, { payload: this.consolidateAddUpdateSpecialtyAccount() })
            .then(() => {
                this.navigate(PaymentActions.AUTOMATIC_PAYMENTS_UNENROLL_PRESSED, {
                    selectedSpecialtyAccount: this.props.selectedSpecialtyAccount,
                });
                this.hideCancelEnrollmentDialog();
            });
    };

    public render() {
        const labels = this.labels.setUpAutomaticPayments.footer;
        const { cancelEnrollmentDialogVisible } = this.state;
        if (this.props.enrolledPaymentMethod) {
            return (
                <SetUpAutomaticPaymentsView
                    accountInfo={this.props.selectedSpecialtyAccount}
                    autoEnrolledPaymentMethod={this.props.enrolledPaymentMethod}
                    cancelEnrollmentDialogVisible={cancelEnrollmentDialogVisible}
                    onPressCancelEnrollment={this.onPressCancelEnrollment}
                    onPressCancelUnenrollment={this.onPressCancelUnenrollment}
                    onPressChangeSettings={this.onPressChangeSettings}
                    onPressDone={this.onPressDone}
                    onPressUnenroll={this.onPressUnenroll}
                    primaryButtonTitle={labels.done}
                    secondaryButtonTitle={labels.changeSettings}
                    style={this.style}
                />
            );
        }
        return <></>;
    }

    protected clearPaymentMethod = () => {
        this.appStateActions.payments.setSelectedSpecialtyPaymentMethod(null);
        this.appStateActions.payAccountBalance.setSelectedSpecialtyPaymentMethod(null);
    };

    protected hideCancelEnrollmentDialog = () => {
        this.setState({
            cancelEnrollmentDialogVisible: false,
        });
    };

    protected showCancelEnrollmentDialog = () => {
        this.setState({
            cancelEnrollmentDialogVisible: true,
        });
    };
}

export default SetUpAutomaticPayments;
