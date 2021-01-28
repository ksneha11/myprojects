import React from 'react';
import { Button } from 'react-native-elements';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { SecondaryButtonStyleSchema } from './secondaryButton.style';

interface Props extends StyleProps {
    accessibilityLabel?: string;
    isDisabled: boolean;
    onPress: noop;
    style?: Partial<SecondaryButtonStyleSchema>;
    title: string;
}

const defaultProps: Partial<Props> = {
    accessibilityLabel: null,
    isDisabled: false,
    title: '',
};

export default class SecondaryButton extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'SecondaryButton';
    public style: SecondaryButtonStyleSchema;

    public render() {
        const { accessibilityLabel, isDisabled, onPress, title } = this.props;
        return (
            <Button
                accessibilityLabel={accessibilityLabel || title}
                accessibilityRole="button"
                accessibilityStates={isDisabled ? ['disabled'] : []}
                buttonStyle={this.style.button}
                containerStyle={this.style.buttonContainer}
                disabled={isDisabled}
                disabledStyle={this.style.buttonDisabled}
                onPress={onPress}
                title={title}
                titleStyle={this.style.text}
            />
        );
    }
}
