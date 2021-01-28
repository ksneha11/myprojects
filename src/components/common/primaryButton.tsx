import React from 'react';
import { ActivityIndicatorProps } from 'react-native';
import { Button, ButtonProps } from 'react-native-elements';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { PrimaryButtonStyleSchema } from './primaryButton.style';

interface Props extends StyleProps {
    buttonProps?: Partial<ButtonProps>;
    isDisabled: boolean;
    isLoading?: boolean;
    loadingProps?: ActivityIndicatorProps;
    onPress: noop;
    style?: Partial<PrimaryButtonStyleSchema>;
    testID?: string;
    title: string;
}

const defaultProps: Partial<Props> = {
    isDisabled: false,
    isLoading: false,
    loadingProps: {},
    title: '',
};

export default class PrimaryButton extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'PrimaryButton';
    public style: PrimaryButtonStyleSchema;

    public render() {
        const { buttonProps, isDisabled, isLoading, loadingProps, onPress, testID, title } = this.props;
        return (
            <Button
                accessibilityRole="button"
                accessibilityStates={isDisabled ? ['disabled'] : []}
                buttonStyle={this.style.button}
                containerStyle={this.style.buttonContainer}
                disabled={isDisabled}
                disabledStyle={this.style.darkDisabledButton}
                disabledTitleStyle={this.style.darkDisabledButtonTitle}
                loading={isLoading}
                loadingProps={loadingProps}
                onPress={onPress}
                testID={testID ?? title.replace(' ', '-').trim()}
                title={title}
                titleStyle={this.style.text}
                {...buttonProps}
            />
        );
    }
}
