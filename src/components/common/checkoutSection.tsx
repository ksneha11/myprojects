import React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from '.';
import { H2 } from '..';
import { formatCurrency } from '../../utils';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { CheckoutSectionStyleSchema } from './checkoutSection.style';

interface Props extends StyleProps {
    cartItemCount: number;
    formatCurrency: (value: number) => string;
    isDisabled: boolean;
    onPressCheckout: noop;
    style?: Partial<CheckoutSectionStyleSchema>;
    subtotal: number;
}

const defaultProps = {
    formatCurrency,
};

export default class CheckoutSection extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'CheckoutSection';
    public style: CheckoutSectionStyleSchema;

    public render() {
        const formattedSubtotal = this.props.formatCurrency(this.props.subtotal);
        return (
            <View style={this.style.rootContainer}>
                <View accessible={true} style={this.style.checkoutInfoSection}>
                    <H2 style={{ h2: this.style.checkoutInfoItem }}>
                        {this.formatLabel(this.labels.pharmacy.checkout.itemsSelected, this.props.cartItemCount)}
                    </H2>
                    <H2 style={{ h2: this.style.checkoutInfoItem }}>
                        {this.formatLabel(this.labels.pharmacy.checkout.estimatedSubtotal, formattedSubtotal)}
                    </H2>
                </View>
                <View style={this.style.buttonContainer}>
                    <PrimaryButton
                        isDisabled={this.props.isDisabled}
                        onPress={this.props.onPressCheckout}
                        style={{ text: this.style.button }}
                        title={this.labels.pharmacy.checkout.checkout}
                    />
                </View>
            </View>
        );
    }
}
