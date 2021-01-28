import { PrescriptionCartCheckout, PrescriptionInfo, ShippingOption, ShippingType } from 'atlas-services/src/models';
import moment from 'moment';
import React from 'react';
import { NativeEventSubscription } from 'react-native';
import { NavigationActions, NavigationScreenProp, NavigationState, StackActions } from 'react-navigation';
import { ManageAutoActions } from '../../context/navigation/actions/manageAuto.actions';
import { formatCurrency } from '../../utils';
import AppComponent from '../common/appComponent';
import { ConfirmationView, Props as ConfirmationViewProps } from './';

export const defaultProps = {
    formatCurrency,
};
export interface State {
    isPartialError: boolean;
    pharmacyPrescriptions: PrescriptionInfo[];
    specialtyPrescriptions: PrescriptionInfo[];
}

export interface Props extends Partial<ConfirmationViewProps> {
    navigation: NavigationScreenProp<NavigationState>;
}

export default class Confirmation extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;
    protected backPress: NativeEventSubscription;
    constructor(props: Props) {
        super(props);
        this.state = {
            isPartialError: false,
            pharmacyPrescriptions: [],
            specialtyPrescriptions: [],
        };
    }
    public componentDidMount() {
        this.setupConfirmationPage();
    }

    public render() {
        return (
            <ConfirmationView
                formatCurrency={this.props.formatCurrency}
                isAutoRefillApplicable={this.isAutoRefillEligible}
                isAutoRenewApplicable={this.isAutoRenewEligible}
                isPartialError={this.state.isPartialError}
                onPressDismissAlert={this.onPressDismissAlert}
                onPressEnrollNow={this.onPressEnrollNow}
                onPressGoBackHome={this.onPressGoBackHome}
                pharmacyPrescriptions={this.state.pharmacyPrescriptions}
                selectedPharmacyShippingOptionContent={this.propsFromShippingOption(
                    this.appState.prescriptionCart.pharmacy.selectedShippingOption
                )}
                selectedSpecialtyShippingOptionContent={this.propsFromShippingOption(
                    this.appState.prescriptionCart.specialty.selectedShippingOption
                )}
                specialtyPrescriptions={this.state.specialtyPrescriptions}
                showAdvertisementCard={this.showAdvertisementCard(this.state.pharmacyPrescriptions)}
                style={this.style}
                {...this.props}
            />
        );
    }

    protected getShippingLabel = (shippingOptionType: ShippingType): string => {
        const labels = this.labels.pharmacy.confirmation.shippingOptions;
        switch (shippingOptionType) {
            case ShippingType.NEXT_DAY_DELIVERY:
                return labels.oneDayShipping;
            case ShippingType.STANDARD_DELIVERY:
                return labels.standardShipping;
            case ShippingType.TWO_DAY_DELIVERY:
                return labels.twoDayShipping;
        }
    };

    protected isAutoRefillEligible = (prescription: PrescriptionInfo): boolean => {
        return !!(
            prescription?.autoPrescriptionPreferences?.isAutoRefillEligible &&
            !prescription?.autoPrescriptionPreferences?.isAutoRefillEnrolled
        );
    };

    protected isAutoRenewEligible = (prescription: PrescriptionInfo): boolean => {
        return !!(
            prescription?.autoPrescriptionPreferences?.isAutoRenewEligible &&
            !prescription?.autoPrescriptionPreferences?.isAutoRenewEnrolled
        );
    };

    protected onPressDismissAlert = () => {
        this.setState({
            isPartialError: false,
        });
    };

    protected onPressEnrollNow = () => {
        this.navigate(ManageAutoActions.SAVE_PRESSED);
    };

    protected onPressGoBackHome = () => {
        this.appStateActions.cart.clearCart();
        const resetAction = StackActions.reset({
            actions: [NavigationActions.navigate({ routeName: 'MainStack' })],
            index: 0,
            key: null,
        });
        this.props.navigation.dispatch(resetAction);
    };

    protected propsFromShippingOption = (selectedShippingOption: ShippingOption): string[] => {
        if (selectedShippingOption) {
            const early = moment(selectedShippingOption.startDate);
            const late = moment(selectedShippingOption.endDate);
            const earlyDelivery = early.format('MMM').length > 3 ? early.format('MMM. DD') : early.format('MMM DD');
            const lateDelivery = late.format('MMM').length > 3 ? late.format('MMM. DD') : late.format('MMM DD');
            const shippingTypeLabel = this.getShippingLabel(selectedShippingOption.shippingType);
            const shippingCost = selectedShippingOption.cost;
            return [
                `${earlyDelivery} - ${lateDelivery}`,
                `${shippingTypeLabel} (${this.props.formatCurrency(shippingCost)})`,
            ];
        }
    };

    protected setupConfirmationPage = () => {
        const {
            successfulSpecialtyOrders,
            successfulPharmacyOrders,
            failedPharmacyOrders,
            failedSpecialtyOrders,
        } = this.props.placeOrderResponse;
        this.setState({
            isPartialError: !!(failedSpecialtyOrders?.length || failedPharmacyOrders?.length),
            pharmacyPrescriptions: successfulPharmacyOrders ?? [],
            specialtyPrescriptions: successfulSpecialtyOrders ?? [],
        });
    };

    protected showAdvertisementCard = (prescriptions: PrescriptionInfo[]) => {
        return !!prescriptions.find(
            prescription => this.isAutoRefillEligible(prescription) || this.isAutoRenewEligible(prescription)
        );
    };
}
