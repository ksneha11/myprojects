import React from 'react';
import { Text, TextProps } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { LabelCopyStyleSchema } from './labelCopy.style';

interface Props extends StyleProps {
    style?: Partial<LabelCopyStyleSchema>;
    textProps: TextProps;
}

const defaultProps = {};

// This is the text field for labels, like on forms, radio buttons, and some section headers
// TODO:  All forms should use this
export default class LabelCopy extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'LabelCopy';
    public style: LabelCopyStyleSchema;

    public render() {
        return (
            <Text style={this.style.labelCopy} {...this.props.textProps}>
                {this.props.children}
            </Text>
        );
    }
}
