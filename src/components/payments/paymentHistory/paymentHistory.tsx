import {
    FamilyAccessInformation,
    OrderInfo,
    PaymentHistory as PaymentHistoryItem,
    PharmacyLob,
} from 'atlas-services/src/models';
import {
    GET_ORDER_DETAIL,
    GET_ORDERS,
    GET_PAYMENT_HISTORY,
} from 'atlas-services/src/services/middleware/serviceEndpoint';
import isEqual from 'lodash.isequal';
import moment from 'moment';
import React from 'react';
import { PaymentHistoryView } from '.';
import AppComponent from '../../common/appComponent';
import OrderActions from '../../pharmacy/orders/orderActions';

interface Props {
    numMonthsToShow?: number;
}

interface State {
    // TODO: type orderDetails which itself will extend type OrderInfo
    orderDetails: any;
    paymentHistories: PaymentHistoryItem[];
    selectedPaymentHistory: PaymentHistoryItem;
}

export const defaultProps = {
    numMonthsToShow: 12,
};

export class PaymentHistory extends AppComponent<Partial<Props>, State> {
    public static defaultProps = defaultProps;

    constructor(props: Props) {
        super(props);
        this.state = {
            orderDetails: null,
            paymentHistories: [],
            selectedPaymentHistory: null,
        };
    }

    public componentDidMount = () => {
        this.getPaymentHistory();
    };

    public componentDidUpdate = (prevProps: Props, prevState: State) => {
        const { orderDetails, paymentHistories, selectedPaymentHistory } = this.state;
        if (!isEqual(paymentHistories, prevState.paymentHistories)) {
            this.removeOldPaymentHistories(this.state.paymentHistories);
        }
        if (orderDetails && !isEqual(orderDetails, prevState.orderDetails)) {
            this.showOrderDetails();
        }
        if (selectedPaymentHistory && !isEqual(selectedPaymentHistory, prevState.selectedPaymentHistory)) {
            this.getOrderDetail();
        }
    };

    public getOrderDetail = () => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_ORDER_DETAIL, {
                payload: {
                    contractUid: this.state.selectedPaymentHistory.contractUid || '',
                    memberUid: this.appState.memberContext.memberInfo.memberUid || '',
                    orderNumber: this.state.selectedPaymentHistory.orderNumber,
                },
            })
            .then((order: OrderInfo) => {
                this.setPrescribedToMemberDOB(order);
                this.setState(prevState => ({
                    orderDetails: {
                        ...order,
                        orderNumber: prevState.selectedPaymentHistory.orderNumber,
                    },
                }));
            });
    };

    public getPaymentHistory = () => {
        this.context.appContext
            .getServiceExecutor()
            .execute(GET_PAYMENT_HISTORY, {
                payload: this.appState.memberProfile.hcId,
            })
            .then(this.saveSortedPaymentHistories);
    };

    public removeOldPaymentHistories = (paymentHistories: PaymentHistoryItem[]) => {
        this.setState({
            paymentHistories: paymentHistories.filter(paymentHistory => {
                return (
                    moment().diff(moment(paymentHistory.transactionDate), 'months', false) <= this.props.numMonthsToShow
                );
            }),
        });
    };

    public render() {
        return (
            <PaymentHistoryView
                paymentHistories={this.state.paymentHistories}
                onViewStatusPressed={this.onViewStatusPressed}
            />
        );
    }

    public showOrderDetails = () => {
        this.appStateActions.orders.setSelectedOrder(this.state.orderDetails);
        this.navigate(OrderActions.ORDER_DETAILS);
    };

    protected onViewStatusPressed = (item: PaymentHistoryItem) => {
        this.setState({ selectedPaymentHistory: item });
    };

    protected saveSortedPaymentHistories = (unSortedHistories: PaymentHistoryItem[] = []) => {
        const sortedHistories = unSortedHistories.sort((a, b) => {
            const dateA = parseInt(moment(a.transactionDate).format('X'), 10);
            const dateB = parseInt(moment(b.transactionDate).format('X'), 10);
            return dateB - dateA;
        });

        this.setState({
            paymentHistories: sortedHistories,
        });
    };

    protected setPrescribedToMemberDOB = (order: OrderInfo) => {
        const { myInfoDetails, privacyInfoList }: FamilyAccessInformation = this.appState.myFamilyAccessRights;

        if (!!order.prescriptions?.length) {
            const { firstName, lastName } = order.prescriptions[0].prescribedTo;
            let prescribedToDOB: string = '';

            if (firstName === myInfoDetails.firstName && lastName === myInfoDetails.lastName) {
                prescribedToDOB = myInfoDetails.dob;
            } else {
                privacyInfoList.forEach(memberList => {
                    if (firstName === memberList.firstName && lastName === memberList.lastName) {
                        prescribedToDOB = memberList.dob;
                    }
                });
            }
            order.prescriptions[0].prescribedTo.dob = prescribedToDOB;
        }
    };
}

export default PaymentHistory;
