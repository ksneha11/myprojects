import React from 'react';
import { View } from 'react-native';
import { RadioButton } from '../..';
import { H2, P } from '..';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { defaultStyle, RadioButtonGroupStyleSchema } from '.';

/**
 * If a customButton prop is not passed in, then radioButtonItems must be an array of strings
 */

export interface Props extends StyleProps {
    activeIndex?: number;
    children?: (component: RadioButtonGroupView) => React.ReactNode;
    customButton?: ({ style, buttonInfo, index }) => React.ReactNode;
    isVertical?: boolean;
    onPress?: (index: number) => void;
    radioButtonGroupAccessibilityLabel?: string;
    radioButtonGroupTitle?: string;
    radioButtonItems: any[];
    style?: Partial<RadioButtonGroupStyleSchema>;
}

export const defaultProps: Partial<Props> = {
    children: ({ ButtonContainer, Title }: RadioButtonGroupView) => {
        return (
            <>
                <Title />
                <ButtonContainer />
            </>
        );
    },
    isVertical: true,
    radioButtonGroupAccessibilityLabel: 'Please choose an option.',
};

export default class RadioButtonGroupView extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'RadioButtonGroup';
    public style: RadioButtonGroupStyleSchema;

    public ButtonContainer = () => {
        const { radioButtonGroupAccessibilityLabel, radioButtonItems } = this.props;
        const { isVertical } = this.props;
        return (
            <View
                accessibilityLabel={radioButtonGroupAccessibilityLabel}
                style={isVertical ? this.style.verticalOptionsContainer : this.style.horizontalOptionsContainer}
            >
                {radioButtonItems && radioButtonItems.map((info, index) => this.RadioButton(info, index))}
            </View>
        );
    };

    public DefaultButton = (label: string, index: number) => {
        const isActive = index === this.props.activeIndex;

        return (
            <View key={Math.random()} style={this.style.button}>
                <RadioButton accessibilityLabel={label} onPress={() => this.props.onPress(index)} selected={isActive} />
                <P style={{ paragraph: this.style.buttonLabel }}>{label}</P>
            </View>
        );
    };

    public RadioButton = (buttonInfo: any, index: number) => {
        return typeof this.props.customButton === 'function'
            ? this.props.customButton({ style: this.style, buttonInfo, index })
            : this.DefaultButton(buttonInfo, index);
    };

    public render() {
        return <View style={this.style.rootContainer}>{this.props.children(this)}</View>;
    }

    public Title = () => {
        const { radioButtonGroupTitle } = this.props;
        return <>{radioButtonGroupTitle && <H2 style={{ h2: this.style.title }}>{radioButtonGroupTitle}</H2>}</>;
    };
}
