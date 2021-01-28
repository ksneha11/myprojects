import { OrderInfo } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface OrdersAppStateActions extends AppStateActions {
    orders: {
        setSelectedOrder: (order: OrderInfo) => void;
    };
}

export class OrdersReducers {
    public static setSelectedOrder = (previousState: AppState, selectedOrder: OrderInfo): Partial<AppState> => {
        return { selectedOrder };
    };
}
