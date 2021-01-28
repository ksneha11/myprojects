import React from 'react';
import { AccessibilityProps, AccessibilityRole, Text } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { ParagraphStyleSchema } from './paragraph.style';

interface Props extends StyleProps, AccessibilityProps {
    onPress?: noop;
    style?: Partial<ParagraphStyleSchema>;
}

const defaultProps: Partial<Props> = {
    accessible: true,
    onPress: () => {},
};

export default class Paragraph extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'Paragraph';
    public style: ParagraphStyleSchema;

    public render() {
        return (
            <Text
                accessible={this.props.accessible}
                accessibilityRole={this.props.accessibilityRole}
                accessibilityLabel={this.props.accessibilityLabel}
                onPress={this.props.onPress}
                style={this.style.paragraph}
            >
                {this.props.children}
            </Text>
        );
    }
}
