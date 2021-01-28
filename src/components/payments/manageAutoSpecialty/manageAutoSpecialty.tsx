import {
    AccountBalance,
    AccountInfo,
    CreditCard,
    Payment,
    PaymentMethod,
    PaymentType,
    RecurringPaymentMethod,
} from 'atlas-services/src/models';
import { PaymentFrequency, PaymentIndicator, TransactionMode } from 'atlas-services/src/models/payment';
import {
    GET_ACCOUNT_BALANCE,
    GET_SPECIALTY_ACCOUNTS,
    MAKE_SPECIALTY_PAYMENT,
} from 'atlas-services/src/services/middleware/serviceEndpoint';
import moment from 'moment';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { PaymentActions, SpecialtyPaymentActions } from '../../../context/navigation/actions';
import { IconNames } from '../../../styles';
import { formatCurrency } from '../../../utils';
import { dateSuffix } from '../../../utils/dateSuffix';
import { validateMinimumPayment } from '../../../utils/inputValidator';
import { isExpired } from '../../../utils/paymentHelperMethods';
import { invalidInputAmount } from '../../../utils/paymentValidators';
import AppComponent from '../../common/appComponent';
import { ListModalItem } from '../../common/listModal';
import { ManageAutoSpecialtyView, Props as ViewProps } from './';

interface Props extends Partial<ViewProps> {
    formatCurrency: (value: number | string) => string;
    selectedMemberUid: string;
}
interface State {
    accountBalance: AccountBalance;
    amountDue: number;
    arePaymentMethodsPresent: boolean;
    isDatePickerVisible: boolean;
    isPaymentAlertVisible: boolean;
    isPaymentPending: boolean;
    minimumPayment: string;
    paymentErrorText: string;
    paymentLimit: string;
    selectedDate: number;
    selectedDateLabel: string;
    selectedPaymentOptionIndex: number;
    selectedSpecialtyAccount: AccountInfo;
}

export const defaultProps = {
    formatCurrency,
};

export class ManageAutoSpecialty extends AppComponent<Partial<Props>, State> {
    public static defaultProps = defaultProps;
    constructor(props: Props) {
        super(props);

        this.state = {
            accountBalance: null,
            amountDue: 0,
            arePaymentMethodsPresent: false,
            isDatePickerVisible: false,
            isPaymentAlertVisible: false,
            isPaymentPending: false,
            minimumPayment: '',
            paymentErrorText: '',
            paymentLimit: '',
            selectedDate: 1,
            selectedDateLabel: 'Every 1st of the month',
            selectedPaymentOptionIndex: 0,
            selectedSpecialtyAccount: null,
        };
    }

    public componentDidMount() {
        this.getAccountInformation();
    }

    public render() {
        return (
            <>
                {this.state.selectedSpecialtyAccount && (
                    <ManageAutoSpecialtyView
                        amountDue={this.state.amountDue}
                        arePaymentMethodsPresent={this.state.arePaymentMethodsPresent}
                        dateItems={this.dateItems()}
                        datePickerModalVisible={this.state.isDatePickerVisible}
                        isAccountEnrolled={this.isAccountEnrolled}
                        isPaymentAlertVisible={this.state.isPaymentAlertVisible}
                        isPaymentPending={this.state.isPaymentPending}
                        isSubmitButtonDisabled={this.isSubmitButtonDisabled()}
                        minimumPayment={this.getMinimumPayment(this.state.amountDue)}
                        onPressAgreeAndEnroll={this.onPressAgreeAndEnroll}
                        onChangePaymentInfoText={this.onChangePaymentInfoText}
                        onCloseDatePicker={this.onDatePickerClosed}
                        onPressCancel={this.onPressCancel}
                        onPressChangePaymentMethod={this.onPressChangePaymentMethod}
                        onPressDismissPaymentAlert={this.onPressDismissPaymentAlert}
                        onPressPaymentDateOption={this.selectedPaymentOptionIndex}
                        onPressPaymentHistory={this.onPressPaymentHistory}
                        paymentErrorText={this.state.paymentErrorText}
                        paymentLimit={this.state.paymentLimit}
                        selectedDateLabel={this.state.selectedDateLabel}
                        selectedPaymentDateIndex={this.state.selectedPaymentOptionIndex}
                        selectedPaymentDateOptionIndex={this.state.selectedPaymentOptionIndex}
                        selectedPaymentMethod={this.getMemberDefaultSelectedPaymentMethod()}
                        specialtyAccount={this.state.selectedSpecialtyAccount}
                        toggleDatePickerModal={this.toggleDatePickerModal}
                        {...this.props}
                    />
                )}
                <NavigationEvents onDidFocus={this.getAccountInformation} />
            </>
        );
    }

    protected clearPaymentMethod = () => {
        this.appStateActions.payments.setSelectedSpecialtyPaymentMethod(null);
        this.appStateActions.payAccountBalance.setSelectedSpecialtyPaymentMethod(null);
    };

    protected createDateList = (): string[] => {
        const daysOfMonth: string[] = [];
        for (let i = 1; i < 29; i++) {
            daysOfMonth.push(
                (this.formatLabel(
                    this.labels.pharmacy.manageAutoSpecialty.dateList.everyNthOfTheMonth,
                    `${i}${dateSuffix(i)}`
                ) as string[]).join('')
            );
        }
        return daysOfMonth;
    };

    protected createSpecialtyPaymentRequest = (): Payment => {
        const { payAccountBalanceCart } = this.appState;

        const selectedPaymentMethod =
            payAccountBalanceCart.selectedSpecialtyPaymentMethod ||
            this.logger.warn(
                'inside manage auto specialty but no selected specialty payment method is defined, something is wrong'
            ) ||
            ({} as RecurringPaymentMethod);
        const paymentLimit: string =
            this.state.paymentLimit && !isNaN(parseFloat(this.state.paymentLimit))
                ? this.state.paymentLimit
                : this.state.amountDue.toString();

        return {
            accountInfo: this.state.selectedSpecialtyAccount,
            billingAddress: selectedPaymentMethod.billingAddress,
            paymentAmount: paymentLimit,
            paymentFrequency: PaymentFrequency.RECURRING,
            paymentFrequencyDate: this.getPaymentFrequencyDate(),
            paymentIndicator: PaymentIndicator.FULL_AMOUNT,
            recurringPaymentMethod: selectedPaymentMethod,
            transactionMode: TransactionMode.NONE,
        };
    };

    protected dateItems = (): ListModalItem[] => {
        const daysOfMonth = this.createDateList();
        return daysOfMonth.map((item: string, index: number) => ({
            label: item,
            onPress: () => {
                this.onPressDateItem(item, index + 1);
            },
            rightIcon: this.state.selectedDateLabel === item && IconNames.LIST_ITEM_SELECTED_ICON,
        }));
    };

    protected getAccountBalance = () => {
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
        await this.getSpecialtyAccounts();
        this.getAccountBalance();
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
        return balance ? this.props.formatCurrency(balance / 3) : '';
    };

    protected getPaymentFrequencyDate = (): number => {
        const currentDate = moment();
        const { selectedSpecialtyPaymentMethod } = this.appState.payAccountBalanceCart;
        if (this.state.amountDue) {
            return currentDate.date() + 1;
        } else if (selectedSpecialtyPaymentMethod.paymentType === PaymentType.CREDIT_CARD) {
            return this.state.selectedPaymentOptionIndex === 0 ? null : this.state.selectedDate;
        } else {
            return this.state.selectedDate;
        }
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
                        minimumPayment: this.getMinimumPayment(parseFloat(selectedSpecialtyAccount.accountBalance)),
                        selectedSpecialtyAccount,
                    },
                    () => this.setRecentPayment()
                );
            });
    };

    protected isAccountEnrolled = (account: AccountInfo): boolean => {
        return account.paymentMethods.some(method => {
            const recurringMethod = method as RecurringPaymentMethod;
            return !!recurringMethod.frequency;
        });
    };

    protected isSubmitButtonDisabled = (): boolean => {
        const selectedSpecialtyPaymentMethod = this.getMemberDefaultSelectedPaymentMethod();

        if (selectedSpecialtyPaymentMethod?.paymentType === PaymentType.CREDIT_CARD) {
            if (!isExpired(selectedSpecialtyPaymentMethod?.expirationDate)) {
                return this.isSubmitButtonDisabledOnShippingOptionIndex();
            } else {
                return (
                    !selectedSpecialtyPaymentMethod ||
                    !!this.state.paymentErrorText ||
                    isExpired(selectedSpecialtyPaymentMethod?.expirationDate)
                );
            }
        } else {
            return !selectedSpecialtyPaymentMethod || !!this.state.paymentErrorText;
        }
    };

    protected isSubmitButtonDisabledOnShippingOptionIndex = (): boolean => {
        const { selectedPaymentOptionIndex } = this.state;
        switch (selectedPaymentOptionIndex) {
            case 1:
                return !this.state.selectedDate || !!this.state.paymentErrorText;
            default:
                return !!this.state.paymentErrorText;
        }
    };

    protected makeSpecialtyPayment = () => {
        this.context.appContext
            .getServiceExecutor()
            .execute(MAKE_SPECIALTY_PAYMENT, {
                payload: this.createSpecialtyPaymentRequest(),
            })
            .then(() => {
                const enrolledPaymentMethod = this.getMemberDefaultSelectedPaymentMethod();
                this.navigate(PaymentActions.AGREE_AND_ENROLL_SPECIALTY_PRESSED, {
                    enrolledPaymentMethodAccountNumber: enrolledPaymentMethod.accountNumber,
                    selectedMemberUid: this.state.selectedSpecialtyAccount.memberUid,
                });
            });
    };

    protected onChangePaymentInfoText = (amount: string) => {
        amount.length <= 1
            ? this.setState({ paymentLimit: '', paymentErrorText: '' })
            : this.setState({ paymentLimit: amount.slice(1) }, this.validatePaymentEntered);
    };

    protected onDatePickerClosed = () => {
        this.setState({ isDatePickerVisible: false });
    };

    protected onPressAgreeAndEnroll = () => {
        this.makeSpecialtyPayment();
    };

    protected onPressCancel = () => {
        this.clearPaymentMethod();
        return this.navigate(PaymentActions.MANAGE_AUTO_CANCEL_PRESSED);
    };

    protected onPressChangePaymentMethod = (isManagePayment: boolean) => {
        if (isManagePayment) {
            return; // // TODO:- Code to navigate to manage specialty payment methods goes in here.
        } else {
            this.navigate(SpecialtyPaymentActions.CHANGE_SPECIALTY_PAYMENT_METHOD_PRESSED, {
                labels: this.labels,
                selectedSpecialtyAccount: this.state.selectedSpecialtyAccount,
            });
        }
    };

    protected onPressDateItem = (dateLabel: string, index: number) => {
        this.setState({
            selectedDate: index,
            selectedDateLabel: dateLabel,
            selectedPaymentOptionIndex: 1,
        });
    };

    protected onPressDismissPaymentAlert = () => {
        this.setState({ isPaymentAlertVisible: false });
    };

    protected onPressPaymentHistory = () => {
        this.navigate(PaymentActions.PAYMENT_HISTORY_PRESSED);
    };

    protected selectedPaymentOptionIndex = (index: number) => {
        this.setState({ selectedPaymentOptionIndex: index });
    };

    protected setRecentPayment = () => {
        const isSpecialtyAccountPendingPayment =
            this.state.selectedSpecialtyAccount &&
            this.state.selectedSpecialtyAccount.accountBalancePaymentInfo &&
            this.state.selectedSpecialtyAccount.accountBalancePaymentInfo.recentPayment;
        this.setState({
            isPaymentAlertVisible: isSpecialtyAccountPendingPayment,
            isPaymentPending: isSpecialtyAccountPendingPayment,
        });
    };

    protected toggleDatePickerModal = () => {
        this.setState(previousState => ({ isDatePickerVisible: !previousState.isDatePickerVisible }));
    };

    protected validatePaymentEntered = () => {
        const labels = this.labels.pharmacy.manageAutoSpecialty.errors;
        let paymentErrorText = '';
        if (this.state.paymentLimit && !invalidInputAmount(this.state.paymentLimit)) {
            paymentErrorText = labels.invalidPaymentAmount;
        } else if (
            this.state.amountDue &&
            validateMinimumPayment(this.getMinimumPayment(this.state.amountDue), this.state.paymentLimit)
        ) {
            paymentErrorText = labels.invalidMinimumPaymentAmount;
        }
        this.setState({ paymentErrorText });
    };
}

export default ManageAutoSpecialty;
