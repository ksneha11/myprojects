import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { DisclaimerCopy, HorizontalRule, P, StripesFlatList } from '..';
import formatCurrency from '../../utils/formatCurrency';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { OrderTotalStyleSchema } from './orderTotal.style';

export interface Props extends StyleProps {
    children?: <C extends OrderTotal>(parent: C) => React.ReactNode;
    formatCurrency?: (value: string | number) => string;
    isChargedAtCheckoutVisible?: boolean;
    isPharmacyBalanceUsed?: boolean;
    shippingCost: string;
    style?: Partial<OrderTotalStyleSchema>;
    subTotal: number;
}

export const defaultProps: Partial<Props> = {
    children: ({ HorizontalRuleContainer, OrderTotalCost, PharmacyBalance, SubtotalAndShipping }: OrderTotal) => {
        return (
            <>
                <SubtotalAndShipping />
                <HorizontalRuleContainer />
                <PharmacyBalance />
                <OrderTotalCost />
            </>
        );
    },
    formatCurrency,
    isChargedAtCheckoutVisible: false,
    isPharmacyBalanceUsed: false,
};

export default class OrderTotal extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'OrderTotal';
    public style: OrderTotalStyleSchema;
    protected selectedShippingCost: number;

    constructor(props: any) {
        super(props);

        this.state = { shippingOptionsInfo: [] };
    }

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View accessible={false} style={this.style.rootContainer}>
                    {children}
                </View>
            </SafeAreaView>
        );
    };

    public HorizontalRuleContainer = () => {
        return (
            <View style={this.style.horizontalRuleContainer}>
                <HorizontalRule />
            </View>
        );
    };

    public OrderTotalCost = () => {
        const pharmacyBalance = this.getPharmacyBalance();
        const total = this.props.subTotal + Number(this.props.shippingCost) + pharmacyBalance;
        return (
            <View>
                <View style={this.style.orderRow} accessible>
                    <P style={{ paragraph: this.style.orderTotal }}>{this.labels.pharmacy.orderTotal.orderTotal}</P>
                    <P style={{ paragraph: this.style.orderTotal }}>{this.props.formatCurrency(total)}</P>
                </View>

                {this.props.isChargedAtCheckoutVisible && (
                    <View style={this.style.orderRow}>
                        <DisclaimerCopy style={{ disclaimerCopy: this.style.disclaimerText }}>
                            {this.labels.pharmacy.orderTotal.chargedAtCheckout}
                        </DisclaimerCopy>
                    </View>
                )}
            </View>
        );
    };

    public PharmacyBalance = () => {
        return (
            <>
                {this.props.isPharmacyBalanceUsed && this.appState.pbmAccountBalance > 0 && (
                    <View>
                        <View style={this.style.orderRow} accessible>
                            <P style={{ paragraph: this.style.pharmacyBalance }}>
                                {this.labels.pharmacy.orderTotal.outstandingBalance}
                            </P>
                            <P style={{ paragraph: this.style.pharmacyBalance }}>
                                {this.props.formatCurrency(this.appState.pbmAccountBalance)}
                            </P>
                        </View>
                        <this.HorizontalRuleContainer />
                    </View>
                )}
            </>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public SubtotalAndShipping = () => {
        const data = [
            {
                title: this.labels.pharmacy.orderTotal.subTotal,
                value: this.props.formatCurrency(this.props.subTotal),
            },
            {
                title: this.labels.pharmacy.orderTotal.shippingCost,
                value: this.props.formatCurrency(this.props.shippingCost),
            },
        ];
        return (
            <StripesFlatList
                data={data}
                style={{
                    leftContent: this.style.flatListLeftContent,
                    leftContentText: this.style.dataFormat,
                    rightContent: this.style.flatListRighContent,
                    rightContentText: this.style.dataFormat,
                }}
            />
        );
    };

    protected getPharmacyBalance = (): number => {
        let balance = 0;
        if (this.props.isPharmacyBalanceUsed && this.appState.pbmAccountBalance > 0) {
            balance = this.appState.pbmAccountBalance;
        }
        return balance;
    };
}
