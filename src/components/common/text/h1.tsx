import React from 'react';
import { AccessibilityProps, AccessibilityRole, Text } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { H1StyleSchema } from './h1.style';

interface Props extends StyleProps, AccessibilityProps {
    onPress?: noop;
    style?: Partial<H1StyleSchema>;
}

const defaultProps: Partial<Props> = {
    accessibilityRole: 'header',
};
export default class H1 extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'H1';
    public style: H1StyleSchema;

    public render() {
        return (
            <Text {...this.props} style={this.style.h1}>
                {this.props.children}
            </Text>
        );
    }
}
