import React from 'react';
import { Text } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { H4StyleSchema } from './h4.style';

interface Props extends StyleProps {
    onPress?: noop;
    style?: Partial<H4StyleSchema>;
}

const defaultProps: Partial<Props> = {};

export default class H4 extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'H4';
    public style: H4StyleSchema;

    public render() {
        return (
            <Text accessibilityRole="header" style={this.style.h4}>
                {this.props.children}
            </Text>
        );
    }
}
