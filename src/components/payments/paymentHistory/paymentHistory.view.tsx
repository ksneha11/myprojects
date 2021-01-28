import { PaymentHistory as PaymentHistoryItem, PharmacyLob } from 'atlas-services/src/models';
import moment from 'moment';
import React from 'react';
import { FlatList, View } from 'react-native';
import { HorizontalRule, TextLink } from '../..';
import { formatCurrency } from '../../../utils';
import { H2, P } from '../../common';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { defaultStyle, PaymentHistoryStyleSchema } from './index';

export interface Props extends StyleProps {
    children?: (parent: PaymentHistoryView) => React.ReactNode;
    onViewStatusPressed: (item: PaymentHistoryItem) => void;
    paymentHistories: PaymentHistoryItem[];
    style?: PaymentHistoryStyleSchema;
}

export const defaultProps: Partial<Props> = {
    children: ({ ViewPaymentHistory, PaymentHistoryTitle }: PaymentHistoryView) => {
        return (
            <>
                <PaymentHistoryTitle />
                <ViewPaymentHistory />
            </>
        );
    },
};

export default class PaymentHistoryView extends StyledComponent<Partial<Props>> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'Paymenthistory'; // TODO: fix name here
    public style: PaymentHistoryStyleSchema;

    public Container = ({ children }: { children: Children }) => {
        return <View style={this.style.rootContainer}>{children}</View>;
    };

    public HistoryItem = ({ item }: { item: PaymentHistoryItem }) => {
        const { activity, itemName, lineOfBusiness, orderNumber, transactionDate, transactionAmount } = item;
        const { order, specialty, viewOrder } = this.labels.payAccountBalance.paymentHistory;

        return (
            <View style={this.style.historyItemContainer}>
                <View style={this.style.historyItemDetailsContainer}>
                    <View style={this.style.leftColumn}>
                        <H2>{moment(transactionDate).format('MM/DD/YYYY')}</H2>
                        <this.SubText subText={activity} />
                        {orderNumber && <this.SubText isLight subText={`${order} ${orderNumber}`} />}
                        {itemName && <this.SubText isLight subText={itemName} />}
                    </View>
                    <View style={this.style.rightColumn}>
                        <this.SubText subText={formatCurrency(transactionAmount)} />
                        {lineOfBusiness === PharmacyLob.SPECIALTY && <this.SubText isLight subText={specialty} />}
                    </View>
                </View>
                {!!orderNumber && lineOfBusiness === PharmacyLob.PBM && (
                    <TextLink isUnderlined onPress={() => this.props.onViewStatusPressed(item)}>
                        {viewOrder}
                    </TextLink>
                )}
            </View>
        );
    };

    public HorizontalRuleNoMargin = () => {
        const hasPaymentHistory = this.props.paymentHistories?.length > 0;

        return hasPaymentHistory ? (
            <HorizontalRule style={{ horizontalRule: this.style.horizontalRuleNoMargin }} />
        ) : null;
    };

    public PaymentHistoryTitle = () => {
        const hasPaymentHistory = this.props.paymentHistories?.length > 0;
        const { title, noPaymentHistoryTitle } = this.labels.payAccountBalance.paymentHistory;
        const titleText = hasPaymentHistory ? title : noPaymentHistoryTitle;

        return (
            <View style={this.style.titleContainer}>
                <P>{titleText}</P>
            </View>
        );
    };

    public render = () => <this.Container>{this.props.children(this)}</this.Container>;

    public SubText = ({
        isDark = false,
        isLight = false,
        subText,
    }: {
        isDark?: boolean;
        isLight?: boolean;
        subText: string;
    }) => {
        return (
            <P
                style={{
                    paragraph: {
                        ...this.style.subText,
                        ...(isDark ? this.style.subTextDark : {}),
                        ...(isLight ? this.style.subTextLight : {}),
                    },
                }}
            >
                {subText}
            </P>
        );
    };

    public ViewPaymentHistory = () => {
        return (
            <FlatList
                data={this.props.paymentHistories}
                ItemSeparatorComponent={this.HorizontalRuleNoMargin}
                keyExtractor={(item: PaymentHistoryItem) => item.orderNumber || Math.random().toString()}
                ListFooterComponent={this.HorizontalRuleNoMargin}
                ListHeaderComponent={this.HorizontalRuleNoMargin}
                renderItem={({ item }) => <this.HistoryItem item={item} />}
                style={this.style.historyList}
            />
        );
    };
}
