import React from 'react';
import { AccessibilityProps, Text } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { DisclaimerCopyStyleSchema } from './disclaimerCopy.style';

interface Props extends StyleProps, AccessibilityProps {
    onPress?: noop;
    style?: Partial<DisclaimerCopyStyleSchema>;
}

const defaultProps: Partial<Props> = {};

export default class DisclaimerCopy extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'DisclaimerCopy';
    public style: DisclaimerCopyStyleSchema;

    public render() {
        return (
            <Text {...this.props} style={this.style.disclaimerCopy}>
                {this.props.children}
            </Text>
        );
    }
}
