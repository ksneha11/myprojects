import { ShippingOption, ShippingType } from 'atlas-services/src/models';
import moment from 'moment';
import React from 'react';
import { IconNames } from '../../styles';
import { formatCurrency } from '../../utils';
import StyledComponent from '../styledComponent';
import Card, { defaultProps, Props as ParentProps } from './card';
import { CardStyleSchema, default as defaultStyle } from './card.style';

interface Props extends ParentProps {
    formatCurrency: (value: number | string) => string;
    isFooterTextVisible?: boolean;
    selectedShippingOption: ShippingOption;
}

const shippingOptionsDefaultProps = {
    ...defaultProps,
    formatCurrency,
    leftIconName: IconNames.SHIPPING_OPTIONS_ICON,
};

export default class ShippingOptionsCard extends StyledComponent<Props> {
    public static defaultProps = shippingOptionsDefaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ShippingOptionsCard';
    public style: CardStyleSchema;

    public render() {
        const labels = this.labels.pharmacy.shippingOptionsCard;
        return (
            <Card
                content={this.getShippingOptionContent(this.props.selectedShippingOption)}
                footerAccessibilityHint={labels.footer.accessibilityHint}
                footerAccessibilityLabel={labels.footer.accessibilityLabel}
                footerIconName={this.props.isFooterTextVisible ? IconNames.LIST_ITEM_NAVIGATE_ICON : null}
                footerText={this.props.isFooterTextVisible ? labels.footer.text : null}
                title={labels.title}
                style={{ leftIcon: { fontSize: 35 } }}
                {...this.props}
            />
        );
    }

    protected getShippingLabel = (selectedShippingOptionType: ShippingType): string => {
        const labels = this.labels.pharmacy.shippingOptionsCard;
        switch (selectedShippingOptionType) {
            case ShippingType.NEXT_DAY_DELIVERY:
                return labels.oneDayShipping;
            case ShippingType.STANDARD_DELIVERY:
                return labels.standardShipping;
            case ShippingType.TWO_DAY_DELIVERY:
                return labels.twoDayShipping;
            default:
                return '';
        }
    };

    // Home Delivery feature needs to pass in selectedShippingOption prop
    protected getShippingOptionContent = (selectedShippingOption: ShippingOption) => {
        if (selectedShippingOption) {
            const early = moment(selectedShippingOption.startDate);
            const late = moment(selectedShippingOption.endDate);
            const earlyDelivery = early.month() === 4 ? early.format('MMM DD') : early.format('MMM. DD');
            const lateDelivery = late.month() === 4 ? late.format('MMM DD') : late.format('MMM. DD');
            const shippingTypeLabel = this.getShippingLabel(selectedShippingOption.shippingType);
            const shippingCost = selectedShippingOption.cost;
            return [`${earlyDelivery} - ${lateDelivery}`, `${shippingTypeLabel} (${formatCurrency(shippingCost)})`];
        }
    };
}
