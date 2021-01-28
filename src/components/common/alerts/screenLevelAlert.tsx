import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { InlineAlert } from '../..';
import { IconNames } from '../../../styles';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { AlertProps } from './inlineAlert';
import defaultStyle, { ScreenLevelAlertStyleSchema } from './screenLevelAlert.style';

interface Props extends AlertProps, StyleProps {
    isDismissAlertDisabled?: boolean;
    style?: Partial<ScreenLevelAlertStyleSchema>;
}

const defaultProps: Partial<Props> = {
    alertType: 'info',
    isDismissAlertDisabled: false,
};

export default class ScreenLevelAlert extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ScreenLevelAlert';
    public style: ScreenLevelAlertStyleSchema;

    public render() {
        const dismissIcon = this.getIcon(IconNames.DISMISS_ACTION_ICON, {
            style: this.style.dismissIcon,
        });
        const isConfirmType = this.props.alertType === 'confirm';
        const isWarningType = this.props.alertType === 'warning';

        return (
            <View
                style={[
                    this.style.rootContainer,
                    isConfirmType && this.style.confirmContainer,
                    isWarningType && this.style.warningContainer,
                ]}
            >
                <View style={this.style.alertContainer}>
                    <InlineAlert {...this.props}>{this.props.children}</InlineAlert>
                </View>
                <>
                    {!this.props.isDismissAlertDisabled && (
                        <TouchableOpacity
                            accessibilityLabel={'Dismiss alert message'}
                            accessibilityRole={'alert'}
                            style={this.style.dismissIconContainer}
                            onPress={this.props.onDismissAlert}
                        >
                            {dismissIcon}
                        </TouchableOpacity>
                    )}
                </>
            </View>
        );
    }
}
