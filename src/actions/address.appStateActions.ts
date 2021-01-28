import { Address } from 'atlas-services/src/models';
import { AppState } from '../models';

export default interface AddressAppStateActions {
    address: {
        setDefaultAddress: (defaultAddress: Address) => void;
        setMemberAddresses: (addresses: Address[]) => void;
        setSelectedAddress: (address: Address) => void;
    };
}

export class AddressReducers {
    public static setDefaultAddress = (prevState: AppState, address: Address): Partial<AppState> => {
        prevState.defaultAddress = address;
        return prevState;
    };

    public static setMemberAddresses = (prevState: AppState, addresses: Address[]): Partial<AppState> => {
        prevState.memberAddresses = addresses;
        return prevState;
    };

    public static setSelectedAddress = (prevState: AppState, address: Address): Partial<AppState> => {
        prevState.selectedAddress = address;
        return prevState;
    };
}
