import React from 'react';
import { View } from 'react-native';
import { PrimaryButton, SecondaryButton } from '.';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { FormButtonsStyleSchema } from './formButtons.style';

interface Props extends StyleProps {
    isPrimaryDisabled?: boolean;
    onPrimaryButtonOnPress?: noop;
    onSecondaryButtonOnPress?: noop;
    primaryButtonTitle?: string;
    secondaryButtonTitle?: string;
    style?: Partial<FormButtonsStyleSchema>;
}

export default class FormButtons extends StyledComponent<Props> {
    public defaultStyle = defaultStyle;
    public name = 'FormButtons';
    public render() {
        const { isPrimaryDisabled, primaryButtonTitle, secondaryButtonTitle } = this.props;
        return (
            <View style={this.style.buttonContainer}>
                <SecondaryButton
                    onPress={this.props.onSecondaryButtonOnPress}
                    style={{ buttonContainer: this.style.button }}
                    title={secondaryButtonTitle}
                />
                <PrimaryButton
                    isDisabled={isPrimaryDisabled}
                    onPress={this.props.onPrimaryButtonOnPress}
                    style={{ buttonContainer: this.style.button }}
                    title={primaryButtonTitle}
                />
            </View>
        );
    }
}
