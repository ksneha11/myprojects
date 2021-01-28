import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextLink } from '..';
import { IconNames } from '../../../styles';
import { setAccessibilityFocus } from '../../../utils';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { InlineAlertStyleSchema } from './inlineAlert.style';
/*
    Alert Types: 
     - `warning` will give you the /!\ icon
     - `info` will give you the (i) icon
     - `confirm` will give you the [√] icon

    Use Mini Icon prop is a boolean that detemine the font size of the icon
     - error message attached to Form Field would use mini icon
     - error message attached to Card would use the normal sized
*/

export interface AlertProps {
    alertType: 'warning' | 'info' | 'confirm';
    linkCopy?: string;
    onDismissAlert?: noop;
    onLinkPress?: noop;
    useMiniIcon: boolean;
}

interface Props extends AlertProps, StyleProps {
    style?: Partial<InlineAlertStyleSchema>;
}

const defaultProps: Partial<Props> = {
    alertType: 'warning',
    linkCopy: '',
    useMiniIcon: false,
};

export default class InlineAlert extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'InlineAlert';
    public style: InlineAlertStyleSchema;
    public titleRef: any;
    protected hasRecievedFocus: boolean = false;

    public render() {
        if (this.titleRef && !this.hasRecievedFocus) {
            setAccessibilityFocus(this.titleRef);
            this.hasRecievedFocus = true;
        }
        const iconComponent = this.getIconComponent(this.props.alertType);
        const hasLink = this.props.linkCopy.length > 0;
        return (
            <>
                <View style={this.style.container} collapsable={false}>
                    <View style={this.style.iconContainer}>{iconComponent}</View>
                    <TouchableWithoutFeedback accessible accessibilityRole={'alert'}>
                        <View
                            ref={component => {
                                this.titleRef = component;
                            }}
                            collapsable={true}
                            style={this.style.errorMessageContainer}
                        >
                            {/* 
                    ---  On Android, rendering text in this view prevents the
                    <HorizontalRuleContainer /> and <CancelOrder />
                    components from reviewOrder.view.tsx that are supposed to be rendered
                    below this component from rendering -- @Reggie
                    */}
                            <Text accessibilityLiveRegion="assertive" style={this.style.errorMessage}>
                                {this.props.children}
                            </Text>
                            {hasLink && (
                                <TextLink style={{ textLink: this.style.linkMessage }} onPress={this.props.onLinkPress}>
                                    {this.props.linkCopy}
                                </TextLink>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </>
        );
    }

    private getIconComponent(type: string): JSX.Element {
        let iconName;
        let iconStyle = {};

        if (type === 'warning') {
            iconName = IconNames.ALERT_WARNING_ICON;
            iconStyle = this.style.warningIcon;
        } else if (type === 'info') {
            iconName = IconNames.ALERT_INFO_ICON;
            iconStyle = this.style.infoIcon;
        } else if (type === 'confirm') {
            iconName = IconNames.ALERT_CONFIRM_ICON;
            iconStyle = this.style.confirmIcon;
        }

        const iconSizeStyle = this.props.useMiniIcon ? this.style.iconMiniSize : this.style.iconNormalSize;

        return this.getIcon(iconName, {
            // The icon should not read out to a screen reader, only the message
            accessible: false,
            style: {
                ...iconSizeStyle,
                ...iconStyle,
            },
        });
    }
}
