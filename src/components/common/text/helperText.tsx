import React from 'react';
import { Text } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { default as defaultStyle, HelperTextStyleSchema } from './helperText.style';

interface Props extends StyleProps {
    onPress?: noop;
    style?: Partial<HelperTextStyleSchema>;
}

const defaultProps: Partial<Props> = {};

export default class HelperText extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'HelperText';
    public style: HelperTextStyleSchema;

    public render() {
        return <Text style={this.style.helperText}>{this.props.children}</Text>;
    }
}
