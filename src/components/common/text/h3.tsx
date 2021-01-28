import React from 'react';
import { AccessibilityProps, Text } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { H3StyleSchema } from './h3.style';

interface Props extends StyleProps, AccessibilityProps {
    isDark?: boolean; // Sometimes H3 elements are the primary color, sometimes they are grey text color
    onPress?: noop;
    style?: Partial<H3StyleSchema>;
}

const defaultProps: Partial<Props> = {
    accessible: true,
    isDark: false,
};

export default class H3 extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'H3';
    public style: H3StyleSchema;

    public render() {
        return (
            <Text {...this.props} style={{ ...this.style.h3, ...(this.props.isDark && this.style.h3Dark) }}>
                {this.props.children}
            </Text>
        );
    }
}
