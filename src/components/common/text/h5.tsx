import React from 'react';
import { Text } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { H5StyleSchema } from './h5.style';

interface Props extends StyleProps {
    onPress?: noop;
    style?: Partial<H5StyleSchema>;
}

const defaultProps: Partial<Props> = {};

export default class H5 extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'H5';
    public style: H5StyleSchema;

    public render() {
        return <Text style={this.style.h5}>{this.props.children}</Text>;
    }
}
