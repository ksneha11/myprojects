import {
    Address,
    initialCart,
    PaymentMethod,
    PrescriptionCart,
    PrescriptionInfo,
    ProductOrder,
    RefillRenewStatus,
    ShippingOption,
    SpecialtyQuestion,
} from 'atlas-services/src/models';
import { prescriptionInCart } from '../components/pharmacy/prescriptions/prescriptionUtils';
import AppState from '../models/appState';
import AppStateActions from '../models/appStateActions';
import deepClone from '../utils/deepClone';

export enum AddRemove {
    ADD = 'add',
    REMOVE = 'remove',
}

export enum CartType {
    MANAGE_AUTO_CART = 'manageAutoCart',
    PRESCRIPTION_CART = 'prescriptionCart',
}

export interface CartState {
    [key: string]: PrescriptionCart;
}

export default interface CartAppStateActions extends AppStateActions {
    cart: {
        clearCart: noop;
        // this is listed here - but isn't defined in CartReducers
        // it's in PrescriptionCartReducers
        // need to figure out why that is
        // for this just did renaming and moving
        loadPrescriptions: (
            actionablePrescriptions: PrescriptionInfo[],
            nonActionablePrescriptions: PrescriptionInfo[]
        ) => void;
        setDeliveryAddress: (deliveryAddress: Address) => void;
        setDeliveryAddressSpecialty: (deliveryAddress: Address) => void;
        setOrderForDelivery: (isOrderForDelivery: boolean) => void;
        setPaymentMethod: (paymentMethod: PaymentMethod) => void;
        setPickupAddress: (pickupAddress: Address) => void;
        setShippingDate: (shippingDate: string) => void;
        setSpecialtyQuestions: (specialtyQuestions: SpecialtyQuestion[]) => void;
        setStoreId: (storeId: string) => void;
        togglePrescription: (prescription: PrescriptionInfo) => void;
        updateSelectedShippingOption: (selectedShippingOption: ShippingOption) => void;
    };
}

export abstract class CartReducers {
    constructor(private readonly cartType: CartType) {}
    public clearCart = (appState: AppState): Partial<AppState> => {
        return { prescriptionCart: deepClone(initialCart) };
    };

    public setDeliveryAddress = (prevState: AppState, deliveryAddress: Address): CartState => {
        return {
            [this.cartType]: {
                ...prevState[this.cartType],
                pharmacy: {
                    ...prevState[this.cartType].pharmacy,
                    deliveryAddress,
                },
            },
        };
    };

    public setDeliveryAddressSpecialty = (prevState: AppState, deliveryAddress: Address): CartState => {
        return {
            [this.cartType]: {
                ...prevState[this.cartType],
                specialty: {
                    ...prevState[this.cartType].specialty,
                    deliveryAddress,
                },
            },
        };
    };

    public setOrderForDelivery = (appState: AppState, isOrderForDelivery: boolean): Partial<AppState> => {
        return {
            [this.cartType]: {
                ...appState[this.cartType],
                specialty: {
                    ...appState[this.cartType].specialty,
                    deliveryAddress: isOrderForDelivery ? appState[this.cartType].specialty.deliveryAddress : null,
                    isOrderForDelivery,
                    pickupAddress: isOrderForDelivery ? null : appState[this.cartType].specialty.pickupAddress,
                },
            },
        };
    };

    public setPaymentMethod = (prevState: AppState, paymentMethod: PaymentMethod): Partial<AppState> => {
        prevState[this.cartType].pharmacy.paymentMethod = paymentMethod;
        return prevState;
    };

    public setPickupAddress = (appState: AppState, pickupAddress: Address): Partial<AppState> => {
        return {
            [this.cartType]: {
                ...appState[this.cartType],
                specialty: { ...appState[this.cartType].specialty, pickupAddress },
            },
        };
    };

    // TODO: Delete this and re-assign all programs utilizing this to use `setPaymentMethod`
    public setSelectedPaymentMethod = (prevState: AppState, paymentMethod: PaymentMethod): Partial<AppState> => {
        prevState[this.cartType].pharmacy.paymentMethod = paymentMethod;
        return prevState;
    };

    public setShippingDate = (appState: AppState, selectedDate): CartState => {
        return {
            [this.cartType]: {
                ...appState[this.cartType],
                specialty: { ...appState[this.cartType].specialty, selectedShippingDate: selectedDate },
            },
        };
    };

    public setStoreId = (appState: AppState, storeId: string): Partial<AppState> => {
        return {
            [this.cartType]: {
                ...appState[this.cartType],
                specialty: { ...appState[this.cartType].specialty, storeId },
            },
        };
    };

    public togglePrescription = (appState: AppState, prescription: PrescriptionInfo): CartState => {
        let action: AddRemove;
        action = prescriptionInCart(appState.prescriptionCart, prescription) ? AddRemove.REMOVE : AddRemove.ADD;
        return {
            [this.cartType]: this.separatePbmSpecialty(appState[this.cartType], prescription, action),
        };
    };

    public updateSelectedShippingOption = (
        prevState: AppState,
        selectedShippingOption: ShippingOption
    ): Partial<AppState> => {
        prevState[this.cartType].pharmacy.selectedShippingOption = selectedShippingOption;
        return prevState;
    };

    protected performAction = (
        prescriptions: PrescriptionInfo[],
        prescription: PrescriptionInfo,
        action: AddRemove
    ): PrescriptionInfo[] => {
        if (action === AddRemove.ADD) {
            prescriptions.push(prescription);
        } else {
            prescriptions = prescriptions.filter(
                filterPrescription => filterPrescription.uniqueRxId !== prescription.uniqueRxId
            );
        }
        return prescriptions;
    };

    protected separatePbmSpecialty = (
        prescriptionCart: PrescriptionCart,
        prescription: PrescriptionInfo,
        action: AddRemove
    ): PrescriptionCart => {
        if (prescription.isSpecialty) {
            prescriptionCart.specialty = this.separateRefillRenew(prescriptionCart.specialty, prescription, action);
        } else {
            prescriptionCart.pharmacy = this.separateRefillRenew(prescriptionCart.pharmacy, prescription, action);
        }
        return prescriptionCart;
    };

    protected separateRefillRenew = (
        deliveryOrder: ProductOrder,
        prescription: PrescriptionInfo,
        action: AddRemove
    ): ProductOrder => {
        if (prescription.refillStatus === RefillRenewStatus.AVAILABLE_NOW) {
            deliveryOrder.prescriptionRefills = this.performAction(
                deliveryOrder.prescriptionRefills,
                prescription,
                action
            );
        } else {
            deliveryOrder.prescriptionRenewals = this.performAction(
                deliveryOrder.prescriptionRenewals,
                prescription,
                action
            );
        }
        return deliveryOrder;
    };
}
