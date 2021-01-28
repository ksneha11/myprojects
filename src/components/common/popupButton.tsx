import React from 'react';
import { TextLink } from '.';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { PopupButtonStyleSchema } from './popupButton.style';

interface Props extends StyleProps {
    buttonLabel: string;
    onPress: noop;
}

const defaultProps: Partial<Props> = {
    buttonLabel: 'Button',
};

export default class PopupButton extends StyledComponent<Props> {
    public static readonly defaultProps: Partial<Props> = defaultProps;
    public readonly defaultStyle = defaultStyle;
    public readonly name: string = 'PopupButton';
    public readonly style: PopupButtonStyleSchema;

    public render() {
        const { buttonLabel, onPress } = this.props;
        return (
            <TextLink isUnderlined onPress={onPress} style={{ textLink: this.style.buttonLabel }}>
                {buttonLabel}
            </TextLink>
        );
    }
}
