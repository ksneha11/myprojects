import {
    AccountInfo,
    CreditCard,
    IdCard,
    PaymentMethod,
    PaymentType,
    RecurringPaymentMethod,
} from 'atlas-services/src/models';
import Payment, { PaymentFrequency, PaymentIndicator, TransactionMode } from 'atlas-services/src/models/payment';
import {
    GET_ID_CARD_INFORMATION,
    GET_SPECIALTY_ACCOUNTS,
    MAKE_SPECIALTY_PAYMENT,
} from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { SpecialtyPaymentActions } from '../../../context/navigation/actions';
import { PaymentActions } from '../../../context/navigation/actions/payments.actions';
import { formatCurrency } from '../../../utils';
import { getPbmPhoneNumber } from '../../../utils/idCards';
import { allowPeriods } from '../../../utils/inputFormatters';
import { validateMinimumPayment } from '../../../utils/inputValidator';
import { isExpired } from '../../../utils/paymentHelperMethods';
import { invalidInputAmount } from '../../../utils/paymentValidators';
import AppComponent from '../../common/appComponent';
import { Props as ViewProps, SpecialtyPayNowView } from './';

interface Props extends Partial<ViewProps> {
    selectedMemberUid: string;
}

interface State {
    amountDue: number;
    arePaymentMethodsPresent: boolean;
    isPaymentAlertVisibile: boolean;
    isPaymentPending: boolean;
    minimumPayment: string;
    paymentEntered: string;
    paymentErrorText: string;
    pbmPhoneNumber: string;
    selectedSpecialtyAccount: AccountInfo;
    selectedSpecialtyPaymentIndex: number;
}

export const defaultProps = {
    formatCurrency,
};

export class SpecialtyPayNow extends AppComponent<Partial<Props>, State> {
    public static defaultProps = defaultProps;
    protected enrollmentStatus = 'Not enrolled';

    constructor(props: any) {
        super(props);

        this.state = {
            amountDue: 0,
            arePaymentMethodsPresent: false,
            isPaymentAlertVisibile: false,
            isPaymentPending: false,
            minimumPayment: '',
            paymentEntered: '',
            paymentErrorText: '',
            pbmPhoneNumber: '',
            selectedSpecialtyAccount: null,
            selectedSpecialtyPaymentIndex: 0,
        };
    }

    public componentDidMount() {
        this.getSpecialtyAccounts();
        this.getPbmPhoneNumber();
    }

    public render() {
        return (
            <>
                {this.state.selectedSpecialtyAccount && (
                    <SpecialtyPayNowView
                        enrollmentStatus={this.enrollmentStatus}
                        amountDue={this.state.amountDue}
                        arePaymentMethodsPresent={this.state.arePaymentMethodsPresent}
                        isPaymentAlertVisibile={this.state.isPaymentAlertVisibile}
                        isPaymentNeeded={this.isPaymentNeeded}
                        isPaymentPending={this.state.isPaymentPending}
                        isSubmitButtonDisabled={this.isSubmitButtonDisabled()}
                        minimumPayment={this.getMinimumPayment(this.state.amountDue)}
                        onPressDismissPaymentAlert={this.onPressDismissPaymentAlert}
                        onPaymentEnteredBlur={this.onBlurPaymentEntered}
                        onPaymentEnteredChangeText={this.onPaymentEnteredChangeText}
                        onPressChangePaymentMethod={this.onPressChangePaymentMethod}
                        onPressManageAutoSpecialty={this.onPressManageAutoSpecialty}
                        onPressPrimaryButton={this.onPressPrimaryButton}
                        onPressPaymentHistory={this.onPressPaymentHistory}
                        onPressPaymentSelection={this.onPressPaymentSelection}
                        onPressSecondaryButton={this.onPressSecondaryButton}
                        paymentEntered={this.state.paymentEntered}
                        paymentErrorText={this.state.paymentErrorText}
                        pbmPhoneNumber={this.state.pbmPhoneNumber}
                        selectedPaymentMethod={this.getMemberDefaultSelectedPaymentMethod()}
                        selectedSpecialtyAccount={this.state.selectedSpecialtyAccount}
                        selectedSpecialtyPaymentIndex={this.state.selectedSpecialtyPaymentIndex}
                        {...this.props}
                    />
                )}
                <NavigationEvents onDidFocus={this.getSpecialtyAccounts} />
            </>
        );
    }

    protected createSpecialtyPaymentRequest = (): Payment => {
        const paymentIndicator = this.getPaymentIndicator();
        const paymentAmount = this.getPaymentAmount(paymentIndicator);
        const selectedPaymentMethod = this.getMemberDefaultSelectedPaymentMethod();
        return {
            accountInfo: this.state.selectedSpecialtyAccount,
            billingAddress: selectedPaymentMethod.billingAddress,
            paymentAmount,
            paymentFrequency: PaymentFrequency.ONE_TIME,
            paymentIndicator,
            recurringPaymentMethod: selectedPaymentMethod,
            transactionMode: TransactionMode.NONE,
        };
    };

    protected getMemberDefaultSelectedPaymentMethod = (): RecurringPaymentMethod => {
        const { selectedSpecialtyPaymentMethod } = this.appState.payAccountBalanceCart;
        if (
            this.state.selectedSpecialtyAccount &&
            this.state.selectedSpecialtyAccount.paymentMethods.includes(selectedSpecialtyPaymentMethod)
        ) {
            return selectedSpecialtyPaymentMethod;
        } else if (this.state.selectedSpecialtyAccount && this.state.selectedSpecialtyAccount.paymentMethods) {
            const memberPrimaryPaymentMehod = this.state.selectedSpecialtyAccount.paymentMethods.find(
                paymentMethod => paymentMethod.isDefaultMethod
            );
            return memberPrimaryPaymentMehod;
        } else {
            return null;
        }
    };

    protected getMinimumPayment = (balance: number) => {
        return this.props.formatCurrency(balance / 3);
    };

    protected getPaymentAmount = (paymentIndicator: PaymentIndicator): string => {
        switch (paymentIndicator) {
            case PaymentIndicator.FULL_AMOUNT:
                return this.state.amountDue.toString();
            case PaymentIndicator.PARTIAL_AMOUNT:
                return this.state.paymentEntered;
            default:
                this.logger.warn('No Payment Indicator provided');
        }
    };

    protected getPaymentIndicator = () => {
        switch (this.state.selectedSpecialtyPaymentIndex) {
            case 0:
                return PaymentIndicator.FULL_AMOUNT;
            case 1:
                return PaymentIndicator.PARTIAL_AMOUNT;
            default:
                this.logger.warn('Unknown payment option selected');
        }
    };

    protected getPbmPhoneNumber = () => {
        this.executeService(GET_ID_CARD_INFORMATION, (idCards: IdCard[] = []) => {
            const pbmPhoneNumber =
                getPbmPhoneNumber(idCards) || this.logger.warn('could not find the pbm phone number in idCards') || '';
            this.setState({ pbmPhoneNumber });
        });
    };

    protected getSpecialtyAccounts = () => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_SPECIALTY_ACCOUNTS)
            .then((specialtyAccounts: AccountInfo[]) => {
                const selectedSpecialtyAccount = specialtyAccounts.find(
                    specialtyAccount => specialtyAccount.memberUid === this.props.selectedMemberUid
                );
                const arePaymentMethodsPresent: boolean =
                    selectedSpecialtyAccount?.paymentMethods && !!selectedSpecialtyAccount.paymentMethods.length;
                this.setState(
                    {
                        amountDue: parseFloat(selectedSpecialtyAccount.accountBalance),
                        arePaymentMethodsPresent,
                        selectedSpecialtyAccount,
                    },
                    () => {
                        this.setRecentPayment();
                    }
                );
            });
    };

    protected isPaymentNeeded = (balance: number) => {
        return balance > 0;
    };

    protected isSubmitButtonDisabled = (): boolean => {
        const currentSelectedMethod: RecurringPaymentMethod = this.getMemberDefaultSelectedPaymentMethod();
        let methodExpired = false;
        if (currentSelectedMethod?.paymentType === PaymentType.CREDIT_CARD) {
            methodExpired = isExpired((currentSelectedMethod as CreditCard)?.expirationDate);
        }
        if (this.state.selectedSpecialtyPaymentIndex) {
            return (
                !this.state.paymentEntered || !!this.state.paymentErrorText || !currentSelectedMethod || methodExpired
            );
        } else {
            return !currentSelectedMethod || methodExpired;
        }
    };

    protected makeSpecialtyPayment = () => {
        this.context.appContext
            .getServiceExecutor()
            .execute(MAKE_SPECIALTY_PAYMENT, {
                payload: this.createSpecialtyPaymentRequest(),
            })
            .then(() => {
                const paymentIndicator = this.getPaymentIndicator();
                const paymentAmount = this.getPaymentAmount(paymentIndicator);
                this.appStateActions.payAccountBalance.setPaymentAmount(parseFloat(paymentAmount));
                this.appStateActions.payAccountBalance.setSelectedSpecialtyPaymentMethod(
                    this.getMemberDefaultSelectedPaymentMethod()
                );
                this.navigate(PaymentActions.SUBMIT_SPECIALTY_PAYMENT_PRESSED, {
                    selectedMemberUid: this.state.selectedSpecialtyAccount.memberUid,
                });
            });
    };

    protected onBlurPaymentEntered = () => {
        this.validatePaymentEntered();
    };

    protected onPaymentEnteredChangeText = (amount: string) => {
        this.setState({ paymentEntered: allowPeriods(amount.slice(1)) }, () => this.validatePaymentEntered());
    };

    protected onPressChangePaymentMethod = (isManagePayment: boolean) => {
        if (isManagePayment) {
            return; // TODO:- Code to navigate to manage specialty payment methods goes in here.
        } else {
            this.navigate(SpecialtyPaymentActions.CHANGE_SPECIALTY_PAYMENT_METHOD_PRESSED, {
                labels: this.labels,
                selectedSpecialtyAccount: this.state.selectedSpecialtyAccount,
            });
        }
    };

    protected onPressDismissPaymentAlert = () => {
        this.setState({ isPaymentAlertVisibile: false });
    };

    protected onPressManageAutoSpecialty = (): void => {
        this.navigate(PaymentActions.MANAGE_AUTO_SPECIALTY_PRESSED);
    };

    protected onPressPaymentHistory = () => {
        this.navigate(PaymentActions.PAYMENT_HISTORY_PRESSED);
    };

    protected onPressPaymentSelection = (index: number) => {
        if (this.state.selectedSpecialtyPaymentIndex !== index) {
            this.setState(
                { selectedSpecialtyPaymentIndex: index },
                () =>
                    this.state.selectedSpecialtyPaymentIndex === 0 &&
                    this.setState({ paymentErrorText: '', paymentEntered: '' })
            );
        }
    };

    protected onPressPrimaryButton = () => {
        this.makeSpecialtyPayment();
    };

    protected onPressSecondaryButton = () => {
        this.getNavigationParams('onPressBack')();
        this.navigate(PaymentActions.SPECIALTY_PAY_NOW_CANCEL_PRESSED);
    };

    protected setRecentPayment = () => {
        const isSpecialtyAccountPendingPayment =
            this.state.selectedSpecialtyAccount &&
            this.state.selectedSpecialtyAccount.accountBalancePaymentInfo &&
            this.state.selectedSpecialtyAccount.accountBalancePaymentInfo.recentPayment;
        this.setState({
            isPaymentAlertVisibile: isSpecialtyAccountPendingPayment,
            isPaymentPending: isSpecialtyAccountPendingPayment,
        });
    };

    protected validatePaymentEntered = () => {
        const labels = this.labels.pharmacy.specialtyPayNow.errors;
        let errorMessage = '';
        if (!invalidInputAmount(this.state.paymentEntered)) {
            errorMessage = labels.invalidPaymentAmount;
        } else if (validateMinimumPayment(this.getMinimumPayment(this.state.amountDue), this.state.paymentEntered)) {
            errorMessage = labels.invalidMinimumPaymentAmount;
        }
        this.setState({ paymentErrorText: errorMessage });
    };
}

export default SpecialtyPayNow;
