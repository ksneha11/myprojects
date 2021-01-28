import React from 'react';
import { View } from 'react-native';
import { P, PrimaryButton } from '.';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { CheckoutButtonStyleSchema } from './checkoutButton.style';

interface Props extends StyleProps {
    children: (parent: CheckoutButton) => React.ReactNode;
    isCartEmpty: boolean;
    numberOfItems: number;
    onPress: noop;
    style?: Partial<CheckoutButtonStyleSchema>;
    title: string;
    valueSumOfItems: number;
}

const defaultProps: Partial<Props> = {
    children: ({ Button, Text }) => (
        <>
            <Text />
            <Button />
        </>
    ),
    isCartEmpty: false,
    numberOfItems: 1,
    title: 'Refill All',
    valueSumOfItems: 13.67,
};

export default class CheckoutButton extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'CheckoutButton';
    public style: CheckoutButtonStyleSchema;

    public Button = () => {
        const { numberOfItems, onPress, title } = this.props;

        return (
            <View style={this.style.buttonContainer}>
                <PrimaryButton isDisabled={!numberOfItems} onPress={onPress} title={title} />
            </View>
        );
    };

    public Container = ({ children }): JSX.Element => <View style={this.style.checkoutContainer}>{children}</View>;

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public Text = () => {
        return <View style={this.style.textContainer}>{this.renderText()}</View>;
    };

    protected renderText() {
        const { numberOfItems, isCartEmpty, valueSumOfItems } = this.props;

        if (isCartEmpty) {
            return <P style={{ paragraph: this.style.paragraph }}>{`${numberOfItems} ready to refill`}</P>;
        } else {
            return (
                <>
                    <P style={{ paragraph: this.style.paragraph }}>{`${numberOfItems} selected`}</P>
                    <P style={{ paragraph: this.style.paragraph }}>{`Estimated subtotal: $${valueSumOfItems}`}</P>
                </>
            );
        }
    }
}
