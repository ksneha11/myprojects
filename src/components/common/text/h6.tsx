import React from 'react';
import { Text } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { H6StyleSchema } from './h6.style';

interface Props extends StyleProps {
    onPress?: noop;
    style?: Partial<H6StyleSchema>;
}

const defaultProps: Partial<Props> = {};

export default class H6 extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'H6';
    public style: H6StyleSchema;

    public render() {
        return <Text style={this.style.h6}>{this.props.children}</Text>;
    }
}
