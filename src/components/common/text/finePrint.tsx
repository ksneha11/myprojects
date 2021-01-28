import React from 'react';
import { Text } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { FinePrintStyleSchema } from './finePrint.style';

interface Props extends StyleProps {
    onPress?: noop;
    style?: Partial<FinePrintStyleSchema>;
}

export default class FinePrint extends StyledComponent<Props> {
    public defaultStyle = defaultStyle;
    public name = 'FinePrint';
    public style: FinePrintStyleSchema;

    public render() {
        return (
            <Text accessibilityRole="text" style={this.style.finePrint}>
                {this.props.children}
            </Text>
        );
    }
}
