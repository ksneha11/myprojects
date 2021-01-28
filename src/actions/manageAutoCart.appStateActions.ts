import { Address, PaymentMethod, PrescriptionCart, PrescriptionInfo, ShippingOption } from 'atlas-services/src/models';
import { CartAppStateActions, CartReducers } from '.';
import { AppState, AppStateActions } from '../models';
import { AddRemove, CartState, CartType } from './cart.appStateActions';

export enum ManageToggleType {
    NONE = 'None',
    REFILL = 'Refill',
    RENEW = 'Renew',
}

// these aren't going to be used by medicaid
// but will by Sydney health
// leaving them at the atlas level for now
export default interface ManageAutoCartAppStateActions extends AppStateActions {
    // TODO: FIX THIS ASAP
    // this SHOULD extend CartAppStateActions - the problem is the initial key
    //      CartActions has everything under cart:
    //      ManageAutoCartActions has everything under manageAutoCart
    // want to fix this and make this extend CartActions
    // changing this to featureActions would make that part work but not sure about that yet
    manageAutoCart: {
        clearCart: noop;
        setDeliveryAddress: (deliveryAddress: Address) => void;
        setOrderForDelivery: (isOrderForDelivery: boolean) => void;
        setPaymentMethod: (paymentMethod: PaymentMethod) => void;
        setPickupAddress: (pickupAddress: Address) => void;
        setShippingDate: (shippingDate: string) => void;
        setStoreId: (storeId: string) => void;
        togglePrescription: (prescription: PrescriptionInfo) => void;
        toggleRefill: (prescription: PrescriptionInfo) => void;
        toggleRenew: (prescription: PrescriptionInfo) => void;
        updateSelectedShippingOption: (selectedShippingOption: ShippingOption) => void;
    };
}

export class ManageAutoCartReducers extends CartReducers {
    constructor() {
        super(CartType.MANAGE_AUTO_CART);
    }

    public toggleRefill = (appState: AppState, prescription: PrescriptionInfo): CartState => {
        let action: AddRemove;
        action = this.isPrescriptionPresent(appState, prescription) ? AddRemove.REMOVE : AddRemove.ADD;
        return {
            [CartType.MANAGE_AUTO_CART]: this.addRemoveRefill(
                appState[CartType.MANAGE_AUTO_CART],
                prescription,
                action
            ),
        };
    };

    public toggleRenew = (appState: AppState, prescription: PrescriptionInfo): CartState => {
        let action: AddRemove;
        action = this.isPrescriptionPresent(appState, prescription) ? AddRemove.REMOVE : AddRemove.ADD;
        return {
            [CartType.MANAGE_AUTO_CART]: this.addRemoveRenew(appState[CartType.MANAGE_AUTO_CART], prescription, action),
        };
    };

    protected addRemoveRefill = (
        prescriptionCart: PrescriptionCart,
        prescription: PrescriptionInfo,
        action: AddRemove
    ): PrescriptionCart => {
        prescriptionCart.pharmacy.prescriptionRefills = this.performAction(
            prescriptionCart.pharmacy.prescriptionRefills,
            prescription,
            action
        );
        return prescriptionCart;
    };

    protected addRemoveRenew = (
        prescriptionCart: PrescriptionCart,
        prescription: PrescriptionInfo,
        action: AddRemove
    ): PrescriptionCart => {
        prescriptionCart.pharmacy.prescriptionRenewals = this.performAction(
            prescriptionCart.pharmacy.prescriptionRenewals,
            prescription,
            action
        );
        return prescriptionCart;
    };

    protected isPrescriptionPresent = (appState: AppState, prescription: PrescriptionInfo): boolean => {
        const cart: PrescriptionCart = appState.manageAutoCart;
        const prescriptionsInCart: PrescriptionInfo[] = [];
        if (cart.pharmacy) {
            prescriptionsInCart.push(...cart.pharmacy.prescriptionRefills, ...cart.pharmacy.prescriptionRenewals);
        }
        return !!prescriptionsInCart.find(cartPresciption => cartPresciption.uniqueRxId === prescription.uniqueRxId);
    };
}
