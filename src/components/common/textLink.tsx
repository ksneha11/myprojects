import React from 'react';
import { AccessibilityProps, Linking, Text } from 'react-native';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { TextLinkStyleSchema } from './textLink.style';

export interface Props extends StyleProps, AccessibilityProps {
    alternateColor?: boolean;
    children: Children;
    finePrint: boolean;
    href?: string;
    isDisabled?: boolean;
    isUnderlined?: boolean;
    onPress: noop;
    smallText?: boolean; // Most text links are a specific font, but sometimes it's a smaller font
    style?: Partial<TextLinkStyleSchema>;
}

export const defaultProps = {
    // text link takes an onpress or href - needs one of these to work
    accessibilityHint: '',
    accessible: true,
    finePrint: false,
    href: '',
    isDisabled: false,
    isUnderlined: false,
    onPress: () => {
        return;
    },
    smallText: false,
};

export default class TextLink extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'TextLink';
    public style: TextLinkStyleSchema;

    public render() {
        const style = this.style;
        const accessibilityRole = this.props.accessibilityRole || 'button';
        return (
            <Text
                accessible={this.props.accessible}
                accessibilityLabel={this.getAccessibilityLabel()}
                accessibilityHint={this.props.accessibilityHint}
                accessibilityStates={this.props.isDisabled ? ['disabled'] : []}
                accessibilityRole={accessibilityRole}
                onPress={this.onPress}
                style={[
                    style.textLink,
                    this.props.alternateColor && style.alternateColor,
                    this.props.finePrint && style.finePrint,
                    this.props.isUnderlined && style.underlinedStyle,
                    this.props.isDisabled && style.isDisabled,
                    this.props.smallText && style.smallText,
                ]}
            >
                {this.props.children}
            </Text>
        );
    }

    protected getAccessibilityLabel = (): string => {
        let accessibilityLabel = '';
        if (this.props.accessibilityLabel) {
            accessibilityLabel = this.props.accessibilityLabel;
        } else if (typeof this.props.children === 'string') {
            accessibilityLabel = this.props.children as string;
        }
        return accessibilityLabel;
    };

    private onPress = () => {
        if (this.props.isDisabled) {
            return;
        }
        if (this.props.href) {
            Linking.openURL(this.props.href).catch(() => null);
        }
        this.props.onPress();
    };
}
