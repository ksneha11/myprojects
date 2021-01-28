import React from 'react';
import { Button, ButtonProps } from 'react-native-elements';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { SelectorButtonStyleSchema } from './selectorButton.style';

interface Props extends StyleProps {
    buttonProps?: Partial<ButtonProps>;
    isDisabled: boolean;
    onPress: noop;
    style?: Partial<SelectorButtonStyleSchema>;
    title: string;
}

const defaultProps: Partial<Props> = {
    isDisabled: false,
    title: '',
};

export default class SelectorButton extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'SelectorButton';
    public style: SelectorButtonStyleSchema;

    public render() {
        const { buttonProps, isDisabled, onPress, title } = this.props;
        return (
            <Button
                accessibilityRole="button"
                accessibilityStates={isDisabled ? ['disabled'] : []}
                buttonStyle={this.style.button}
                containerStyle={this.style.buttonContainer}
                disabled={isDisabled}
                onPress={onPress}
                title={title}
                titleStyle={this.style.text}
                {...buttonProps}
            />
        );
    }
}
