import React from 'react';
import { AccessibilityProps, AccessibilityRole, Text } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { H2StyleSchema } from './h2.style';

interface Props extends StyleProps, AccessibilityProps {
    accessibilityRole?: AccessibilityRole;
    isDark?: boolean; // Sometimes H2 elements are the primary color, sometimes they are grey text color
    onPress?: noop;
    style?: Partial<H2StyleSchema>;
}

const defaultProps: Partial<Props> = {
    accessibilityRole: 'header',
    isDark: false,
};

export default class H2 extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'H2';
    public style: H2StyleSchema;

    public render() {
        return (
            <Text
                accessible={this.props.accessible}
                accessibilityLabel={this.props.accessibilityLabel}
                accessibilityRole={this.props.accessibilityRole}
                style={{ ...this.style.h2, ...(this.props.isDark && this.style.h2Dark) }}
            >
                {this.props.children}
            </Text>
        );
    }
}
