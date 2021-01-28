import { Address, BankAccount, CreditCard, IdCard, PaymentType } from 'atlas-services/src/models';
import PaymentMethod, { RecurringPaymentMethod } from 'atlas-services/src/models/paymentMethod';
import { GET_ID_CARD_INFORMATION, GET_PAYMENT_ACCOUNTS } from 'atlas-services/src/services/middleware/serviceEndpoint';
import differenceBy from 'lodash.differenceby';
import differenceWith from 'lodash.differencewith';
import isEqual from 'lodash.isequal';
import React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { PaymentActions } from '../../context/navigation/actions';
import { _omit } from '../../utils';
import { getPbmPhoneNumber } from '../../utils/idCards';
import { getBankAccounts, getCreditCards, getDefaultPaymentMethod, isExpired } from '../../utils/paymentHelperMethods';
import AppComponent from '../common/appComponent';

// NOTES:
// selectedPaymentID can get set as this.state.selectedPaymentMethod.accountName
// Functions meant to be overrode for Specialty:
// - Functions that navigate
// - Functions that pull from services and handle the results

export interface Props {
    addPaymentRouteName?: string;
    defaultSelectedPaymentMethod?: PaymentMethod;
    editBankAccountRouteName?: string;
    editCreditCardRouteName?: string;
    getBankAccounts?: (paymentMethods: PaymentMethod[]) => BankAccount[];
    getCreditCards?: (paymentMethods: PaymentMethod[]) => CreditCard[];
    getDefaultPaymentMethod?: (paymentMethods: PaymentMethod[]) => PaymentMethod;
    hasRadioButtons?: boolean;
    isExpired?: (date: string) => boolean;
    navigation?: NavigationScreenProp<NavigationState>;
    onPressAddPaymentMethod?: () => void;
    onPressSaveButton?: (paymentMethod: PaymentMethod) => void;
    onSaveRoute?: string;
    pageTitle?: string;
    saveButtonText?: string;
    subHeaderLabel?: string;
}

export interface State {
    arePaymentMethodsPresent: boolean;
    editablePaymentMethod: PaymentMethod | RecurringPaymentMethod;
    isPrimaryButtonDisabled: boolean;
    modalVisible: boolean;
    paymentMethods: PaymentMethod[];
    pbmPhoneNumber: string;
    selectedPaymentID: string;
    selectedPaymentMethod: PaymentMethod;
}

export const defaultProps = {
    getBankAccounts,
    getCreditCards,
    getDefaultPaymentMethod,
    isExpired,
};
export default class AbstractChangePaymentMethods<
    P extends Props = Props,
    S extends State = State
> extends AppComponent<P, S> {
    public static defaultProps = defaultProps;
    constructor(props: P) {
        super(props);
        this.state = {
            arePaymentMethodsPresent: false,
            isPrimaryButtonDisabled: true,
            modalVisible: false,
            paymentMethods: [],
            pbmPhoneNumber: '',
            selectedPaymentID: null,
            selectedPaymentMethod: props.defaultSelectedPaymentMethod,
        } as S;
    }

    public async componentDidMount() {
        await this.getPaymentMethods();
        await this.getPbmPhoneNumber();
    }
    protected getDefaultPaymentMethod = (
        currentPaymentMethods: PaymentMethod[] = [],
        servicePaymentMethods: PaymentMethod[] = []
    ) => {
        let selectedPaymentMethod: PaymentMethod = null;
        let isPrimaryButtonDisabled: boolean = true;

        const updatedPaymentMethod: PaymentMethod = this.getUpdatedPaymentMethod(
            currentPaymentMethods,
            servicePaymentMethods
        );

        if (updatedPaymentMethod?.paymentType === PaymentType.CREDIT_CARD) {
            if (updatedPaymentMethod?.accountName && !isExpired((updatedPaymentMethod as CreditCard).expirationDate)) {
                isPrimaryButtonDisabled = false;
                selectedPaymentMethod = updatedPaymentMethod;
            }
        } else if (updatedPaymentMethod?.accountName) {
            isPrimaryButtonDisabled = false;
            selectedPaymentMethod = updatedPaymentMethod;
        }

        if (!updatedPaymentMethod?.accountName) {
            const selectedMethod = servicePaymentMethods.find(payment => this.isSelectedPaymentMethod(payment));
            const defaultOrSelectedMethod =
                selectedMethod || servicePaymentMethods.find(payment => payment.isDefaultMethod);
            if (defaultOrSelectedMethod?.paymentType === PaymentType.CREDIT_CARD) {
                if (
                    defaultOrSelectedMethod?.accountName &&
                    !isExpired((defaultOrSelectedMethod as CreditCard)?.expirationDate)
                ) {
                    this.appStateActions.payments.setSelectedPaymentMethod(defaultOrSelectedMethod);
                    isPrimaryButtonDisabled = false;
                    selectedPaymentMethod = defaultOrSelectedMethod;
                }
            } else if (defaultOrSelectedMethod?.accountName) {
                this.appStateActions.payments.setSelectedPaymentMethod(defaultOrSelectedMethod);
                isPrimaryButtonDisabled = false;
                selectedPaymentMethod = defaultOrSelectedMethod;
            }
        }

        this.setState({ isPrimaryButtonDisabled, selectedPaymentMethod });
    };

    protected getPaymentMethods = async (): Promise<void> => {
        return this.appContext
            .getServiceExecutor()
            .execute(GET_PAYMENT_ACCOUNTS)
            .then(response => {
                this.updateState(response);
            });
    };

    protected getPbmPhoneNumber = async (): Promise<void> => {
        this.executeService(GET_ID_CARD_INFORMATION, (idCards: IdCard[] = []) => {
            const pbmPhoneNumber =
                getPbmPhoneNumber(idCards) || this.logger.warn('could not find the pbm phone number in idCards') || '';
            this.setState({ pbmPhoneNumber });
        });
    };

    protected getSubHeader = (): string => {
        const labels = this.labels.pharmacy.changePaymentMethods.subHeader;
        if (this.state.arePaymentMethodsPresent) {
            if (!this.props.subHeaderLabel) {
                return labels.paymentMethodsPresent.pbm;
            } else {
                return this.props.subHeaderLabel;
            }
        } else {
            return labels.paymentMethodsNotPresent.pbm;
        }
    };

    protected getUpdatedPaymentMethod = (
        currentPaymentMethods: PaymentMethod[],
        servicePaymentMethods: PaymentMethod[]
    ): PaymentMethod => {
        let updatedPaymentMethod: PaymentMethod = null;
        // PaymentMethod Added
        if (servicePaymentMethods?.length > currentPaymentMethods?.length) {
            const difference: PaymentMethod[] = differenceWith(servicePaymentMethods, currentPaymentMethods, isEqual);
            updatedPaymentMethod =
                difference.length > 1 ? differenceBy(difference, currentPaymentMethods, 'accountName') : difference[0];
        } // Payment Method edited
        else if (
            this.state.editablePaymentMethod?.accountName &&
            servicePaymentMethods?.length === currentPaymentMethods?.length &&
            !isEqual(servicePaymentMethods, currentPaymentMethods)
        ) {
            updatedPaymentMethod = servicePaymentMethods.find(
                payment =>
                    payment.accountName === this.state.editablePaymentMethod?.accountName &&
                    (!isEqual(
                        _omit(payment, 'billingAddress'),
                        _omit(this.state.editablePaymentMethod, 'billingAddress')
                    ) ||
                        this.isAddressChanged(payment.billingAddress, this.state.editablePaymentMethod.billingAddress))
            );
        }

        return updatedPaymentMethod;
    };

    // Overwritten by Specialty to do actual comparison easier to make this overwrittable then rewrite the one above for one line
    protected isAddressChanged = (paymentAddress: Address, editableAddress: Address): boolean => {
        return false;
    };

    protected isSaveDisabled = (): boolean => {
        return this.state.paymentMethods.length > 0 && !!this.state.selectedPaymentID;
    };

    protected isSelectedPaymentMethod = (paymentMethod: PaymentMethod): boolean => {
        return (
            this.appState.selectedPaymentMethod?.accountName === paymentMethod.accountName &&
            !!paymentMethod.accountName
        );
    };

    protected onPressAddPaymentMethod = () => {
        this.navigate(this.props.addPaymentRouteName ?? PaymentActions.ADD_PAYMENT_METHOD_PRESSED, {
            onSaveRoute: this.props.onSaveRoute,
        });
    };

    protected onPressEditBankAccount = (paymentMethod: PaymentMethod) => {
        this.navigate('');
    };

    protected onPressEditCreditCard = (paymentMethod: PaymentMethod) => {
        const editablePaymentMethod = paymentMethod;
        this.setState({ editablePaymentMethod }, () => {
            this.navigate(this.props.editCreditCardRouteName ?? PaymentActions.CREDIT_CARD_EDIT_PRESSED, {
                editablePaymentMethod,
                onSaveRoute: this.props.onSaveRoute,
            });
        });
    };

    protected onPressNeedToMakeChanges = () => {
        this.setState({ modalVisible: true });
    };

    protected onPressOverlayClose = () => {
        this.setState({ modalVisible: false });
    };

    protected onPressOverlayPrimary = () => {
        this.setState({ modalVisible: false });
    };

    protected onPressPaymentMethod = (paymentMethod: PaymentMethod) => {
        let isPaymentExpired = true;
        if (paymentMethod?.paymentType === PaymentType.CREDIT_CARD) {
            isPaymentExpired = isExpired((paymentMethod as CreditCard).expirationDate);
        }

        if (paymentMethod && paymentMethod?.paymentType === PaymentType.CREDIT_CARD && !isPaymentExpired) {
            this.setState({
                isPrimaryButtonDisabled: false,
                selectedPaymentMethod: paymentMethod,
            });
        } else if (paymentMethod && paymentMethod?.paymentType === PaymentType.BANK_ACCOUNT) {
            this.setState({
                isPrimaryButtonDisabled: false,
                selectedPaymentMethod: paymentMethod,
            });
        }
    };

    protected onPressSave = () => {
        const selectedPaymentMethod = this.state.selectedPaymentMethod;
        this.props.onPressSaveButton(selectedPaymentMethod);
    };

    protected updateState = async (response: PaymentMethod[]): Promise<void> => {
        if (response.length > 0) {
            await this.getDefaultPaymentMethod(this.state.paymentMethods, response);
            this.setState({
                arePaymentMethodsPresent: true,
                paymentMethods: response,
                selectedPaymentID: this.state.selectedPaymentMethod?.accountName,
            });
        } else {
            this.setState({ arePaymentMethodsPresent: false });
        }
    };
}
