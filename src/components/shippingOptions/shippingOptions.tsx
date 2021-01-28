import {
    OrderType,
    PrescriptionCartCheckout,
    PrescriptionInfo,
    ShippingOption,
    ShippingOptionsRequest,
    ShippingOptionsResponse,
    ShippingType,
} from 'atlas-services/src/models';
import { GET_SHIPPING_OPTIONS } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { NavigationComponent } from 'react-navigation';
import { PrescriptionsActions } from '../../context/navigation/actions';
import { ReviewOrderActions } from '../../context/navigation/actions/reviewOrder.actions';
import AppComponent from '../common/appComponent';
import { ShippingOptionsView, ViewProps } from './';

interface State {
    selectedShippingType: ShippingType;
    shippingOptionsContent: ShippingOption[];
}
interface Props extends ViewProps {
    navigation: NavigationComponent;
}

const defaultProps = {};

export class ShippingOptions extends AppComponent<Partial<Props>, State> {
    public static defaultProps = defaultProps;
    protected pharmacyPrescriptions: PrescriptionInfo[] = [];

    constructor(props: Props) {
        super(props);

        this.state = {
            selectedShippingType: ShippingType.STANDARD_DELIVERY,
            shippingOptionsContent: [],
        };
    }

    public componentWillMount() {
        this.pharmacyPrescriptions = this.props.navigation.getParam('isFromHomeDeliveryScreen')
            ? [this.context.appContext.state.savingOpportunityPrescription]
            : [
                  ...this.appState.prescriptionCart.pharmacy.prescriptionRefills,
                  ...this.appState.prescriptionCart.pharmacy.prescriptionRenewals,
              ];
        this.getShippingOptions();

        this.props.navigation.getParam('isFromHomeDeliveryScreen')
            ? this.setState({
                  selectedShippingType: this.appState.prescriptionCart.pharmacy?.selectedShippingOption?.shippingType,
              })
            : this.setState({
                  selectedShippingType: this.appState.prescriptionCart.pharmacy?.selectedShippingOption?.shippingType,
              });
    }

    public render() {
        return (
            <ShippingOptionsView
                onPressSave={this.onPressSave}
                onPressShippingOption={this.onPressShippingOption}
                selectedShippingOption={this.state.selectedShippingType}
                shippingOptionsContent={this.state.shippingOptionsContent}
                style={this.style}
                {...this.props}
            />
        );
    }

    protected checkColdPack = (): boolean => {
        return new PrescriptionCartCheckout(this.appState.prescriptionCart).hasColdPack();
    };

    protected filterColdPack = (shippingOption: ShippingOption) => {
        if (this.checkColdPack()) {
            return shippingOption.shippingType !== ShippingType.TWO_DAY_DELIVERY;
        } else {
            return true;
        }
    };

    protected getShippingOptions = async () => {
        const deliveryAddress = this.appState.prescriptionCart.pharmacy.deliveryAddress;
        if (deliveryAddress) {
            const payload: ShippingOptionsRequest = {
                address: deliveryAddress,
                includeSpecialtyDates: false,
                orderType: OrderType.NEW,
                shipsWithColdPack: new PrescriptionCartCheckout(this.appState.manageAutoCart).hasColdPack(),
            };
            this.setState({
                shippingOptionsContent: [
                    ...(await this.appContext
                        .getServiceExecutor()
                        .execute(GET_SHIPPING_OPTIONS, { payload })
                        .then((shippingOptionsResponse: ShippingOptionsResponse) => {
                            return shippingOptionsResponse.shippingOptions || [];
                        })),
                ]
                    .filter(option => this.filterColdPack(option))
                    .reverse(),
            });
        }
    };

    protected onPressSave = () => {
        this.props.navigation.getParam('isFromHomeDeliveryScreen')
            ? this.onPressSaveHomeDelivery()
            : this.onPressSaveReviewOrder();
    };

    protected onPressSaveHomeDelivery = (): void => {
        const selectedShippingOption = this.state.shippingOptionsContent.find(
            shippingOption => shippingOption.shippingType === this.state.selectedShippingType
        );
        this.appStateActions.cart.updateSelectedShippingOption(selectedShippingOption);
        this.navigate(PrescriptionsActions.SAVING_OPPORTUNITY_HOME_DELIVERY_PRESSED);
    };

    protected onPressSaveReviewOrder = (): void => {
        const selectedShippingOption = this.state.shippingOptionsContent.find(
            shippingOption => shippingOption.shippingType === this.state.selectedShippingType
        );
        this.appStateActions.cart.updateSelectedShippingOption(selectedShippingOption);
        this.navigate(ReviewOrderActions.SAVE_BUTTON_PRESSED);
    };

    protected onPressShippingOption = (index: ShippingType) => {
        this.setState({ selectedShippingType: index });
    };
}

export default ShippingOptions;
