import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TextLink } from '.';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { TextButtonStyleSchema } from './textButton.style';
import { defaultProps as TextLinkDefaultProps, Props as TextLinkProps } from './textLink';

interface Props extends StyleProps, TextLinkProps {
    accessibililtyLabel?: string;
    alternateColor?: boolean;
    children: Children;
    hitSlop?: { bottom?: number; left?: number; right?: number; top?: number };
    href: string;
    isDisabled?: boolean;
    isUnderlined?: boolean;
    onPress: noop;
    style?: Partial<TextButtonStyleSchema>;
}

const defaultProps = {
    accessibilityHint: '',
    ...TextLinkDefaultProps,
    hitSlop: {
        bottom: 10,
        left: 20,
        right: 20,
        top: 10,
    },
};

export default class TextButton extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'TextButton';
    public style: TextButtonStyleSchema;

    public render() {
        return (
            <TouchableOpacity
                accessibilityLabel={this.props.accessibilityLabel || this.props.children.toString()}
                accessibilityHint={this.props.accessibilityHint}
                accessibilityRole="button"
                hitSlop={this.props.hitSlop}
                onPress={this.props.onPress}
            >
                <TextLink {...this.props}>{this.props.children}</TextLink>
            </TouchableOpacity>
        );
    }
}
