import {
    OrderType,
    PrescriptionCart,
    PrescriptionCartCheckout,
    PrescriptionInfo,
    ShippingOption,
    ShippingOptionsRequest,
    ShippingOptionsResponse,
    ShippingType,
} from 'atlas-services/src/models';
import { GET_SHIPPING_OPTIONS } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { ExpressRefillCheckoutView, Props } from '.';
import { ExpressRefillCheckoutActions } from '../../../context/navigation/actions/expressRefillCheckout.actions';
import AppComponent from '../../common/appComponent';

interface State {
    prescriptions: PrescriptionInfo[];
    selectAllPressed: boolean;
    selectionText: string;
}

export default class ExpressRefillCheckout extends AppComponent<Props, State> {
    protected shippingOption: ShippingOption;
    public componentWillMount() {
        this.initializeStateValues();
        this.getShippingOptions();
    }

    public initializeStateValues() {
        const labels = this.labels.pharmacy.expressRefillCheckout;
        const prescriptionsInCart =
            this.appState.prescriptionCart.pharmacy.prescriptionRefills.length +
            this.appState.prescriptionCart.specialty.prescriptionRefills.length +
            this.appState.prescriptionCart.pharmacy.prescriptionRenewals.length +
            this.appState.prescriptionCart.specialty.prescriptionRenewals.length;
        const refillPrescriptions = (this.appContext.state.actionablePrescriptions || []).filter(
            prescription => prescription.eligibility && prescription.eligibility.digitalCheckout
        );
        const selectAllPressed = prescriptionsInCart === refillPrescriptions.length;
        this.setState({
            prescriptions: refillPrescriptions,
            selectAllPressed,
            selectionText: selectAllPressed ? labels.deselectAll : labels.selectAll,
        });
    }

    public render() {
        return (
            <ExpressRefillCheckoutView
                isPrescriptionInCart={this.isPrescriptionInCart}
                onPressToggleButton={this.onPressToggleButton}
                onPressCheckout={this.onPressCheckout}
                prescriptions={this.state.prescriptions}
                selectAllPressed={this.state.selectAllPressed}
                selectionText={this.state.selectionText}
                updatePrescriptionCart={this.updatePrescriptionCart}
            />
        );
    }

    protected checkAllPrescriptionSelected = () => {
        const labels = this.labels.pharmacy.expressRefillCheckout;
        const prescriptions: PrescriptionInfo[] = this.getPrescriptionsInCart();
        const allPrescriptionChecked: boolean = this.state.prescriptions.length > 0 ?
            this.state.prescriptions.every(elem => prescriptions.indexOf(elem) > -1) : false;
        if (this.state.selectAllPressed !== allPrescriptionChecked) {
            const selectionText = allPrescriptionChecked ? labels.deselectAll : labels.selectAll
            this.setState({ selectionText, selectAllPressed: allPrescriptionChecked });
        }
    };

    protected getPrescriptionsInCart = (): PrescriptionInfo[] => {
        const cart: PrescriptionCart = this.appState.prescriptionCart;
        const prescriptions: PrescriptionInfo[] = [
            ...cart.specialty.prescriptionRefills,
            ...cart.pharmacy.prescriptionRefills,
            ...cart.specialty.prescriptionRenewals,
            ...cart.pharmacy.prescriptionRenewals,
        ];
        return prescriptions;
    };

    // todo: call this service from landing page or after login, same call is used in ActionablePrescriptions
    protected getShippingOptions = async (): Promise<void> => {
        const payload: ShippingOptionsRequest = {
            address: this.appState.prescriptionCart?.pharmacy?.selectedShippingOption?.address,
            orderType: OrderType.NEW,
            shipsWithColdPack: new PrescriptionCartCheckout(this.appState.manageAutoCart).hasColdPack(),
        };
        if (payload.address) {
            const shippingOptionsResponse: ShippingOptionsResponse = await this.appContext
                .getServiceExecutor()
                .execute(GET_SHIPPING_OPTIONS, { payload });
            this.shippingOption =
                shippingOptionsResponse.shippingOptions?.find(
                    shippingOption => shippingOption.shippingType === ShippingType.STANDARD_DELIVERY
                ) || {};
        }
    };

    protected isPrescriptionInCart = (refillPrescription: PrescriptionInfo): boolean => {
        const prescriptions: PrescriptionInfo[] = this.getPrescriptionsInCart();
        return prescriptions.includes(refillPrescription);
    };

    protected onPressCheckout = () => {
        this.appStateActions.cart.updateSelectedShippingOption(this.shippingOption);
        this.navigate(ExpressRefillCheckoutActions.CHECKOUT_PRESSED);
    };

    protected onPressToggleButton = () => {
        const labels = this.labels.pharmacy.expressRefillCheckout;
        this.appStateActions.cart.clearCart();
        if (this.state.selectionText === labels.selectAll) {
            this.setState({ selectionText: labels.deselectAll, selectAllPressed: true });
            this.state.prescriptions.forEach(refillPrescription => {
                this.appStateActions.cart.togglePrescription(refillPrescription);
            });
        } else {
            this.setState({ selectionText: labels.selectAll, selectAllPressed: false });
        }
    };

    protected updatePrescriptionCart = async (item: PrescriptionInfo) => {
        await this.appStateActions.cart.togglePrescription(item);
        this.checkAllPrescriptionSelected()

    };
}
