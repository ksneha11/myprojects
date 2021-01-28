import { Address } from 'atlas-services/src/models';
import React from 'react';
import { IconNames } from '../../styles';
import StyledComponent from '../styledComponent';
import Card, { defaultProps, Props as ParentProps } from './card';
import { CardStyleSchema } from './card.style';
import defaultStyle, { ShippingAddressStyleSchema } from './shippingAddressCard.style';

export interface Props extends ParentProps {
    isFooterTextVisible?: boolean;
    shippingAddress?: Address;
}

export const propsFromShippingAddress = (shippingAddressInfo: Address): string[] => {
    if (!shippingAddressInfo) {
        return;
    }

    const shippingStreetAddress: string[] = shippingAddressInfo.storeName
        ? [shippingAddressInfo.storeName, shippingAddressInfo.streetAddress1]
        : [shippingAddressInfo.streetAddress1];

    if (shippingAddressInfo.streetAddress2) {
        shippingStreetAddress.push(shippingAddressInfo.streetAddress2);
    }
    return [
        ...shippingStreetAddress,
        `${shippingAddressInfo.city}, ${shippingAddressInfo.state} ${shippingAddressInfo.zipCode}`,
    ];
};

const shippingAddressDefaultProps = {
    ...defaultProps,
    footerIconName: IconNames.LIST_ITEM_NAVIGATE_ICON,
    isFooterTextVisible: true,
    leftIconName: IconNames.SHIPPING_DETAILS_ICON,
};

export default class ShippingAddressCard extends StyledComponent<Props> {
    public static defaultProps = shippingAddressDefaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ShippingAddressCard';
    public style: ShippingAddressStyleSchema;

    public CardContainer = () => {
        const labels = this.labels.pharmacy.shippingAddressCard;
        const styleOverrides: Partial<CardStyleSchema> = this.props.shippingAddress
            ? null
            : { contentContainer: this.style.contentContainer };
        return (
            <Card
                alertMessage={this.getAlertMessage()}
                alertType={this.getAlertType()}
                content={propsFromShippingAddress(this.props.shippingAddress)}
                footerAccessibilityHint={labels.footer.accessibilityHint}
                footerAccessibilityLabel={labels.footer.accessibilityLabel}
                footerText={this.getFooterText()}
                style={styleOverrides}
                title={labels.title}
                {...this.props}
                footerIconName={this.props.isFooterTextVisible ? this.props.footerIconName : null}
            />
        );
    };

    public render() {
        return <this.CardContainer />;
    }

    protected getAlertMessage() {
        const labels = this.labels.shippingCard;
        if (this.props.alertMessage) {
            return this.props.alertMessage;
        }
        if (!this.props.shippingAddress) {
            return labels.shippingCardNoAddress;
        }
    }

    protected getAlertType() {
        return this.props.alertType || (this.props.shippingAddress ? null : 'info');
    }

    protected getFooterText() {
        const labels = this.labels.shippingCard;
        return this.props.shippingAddress ? labels.shippingCardFooter.change : labels.shippingCardFooter.add;
    }
}
