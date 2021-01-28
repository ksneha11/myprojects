import React from 'react';
import { View } from 'react-native';
import { H2, HorizontalRule, RadioButton } from '..';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { RadioMenuItemStyleSchema } from './radioMenuItem.style';
import H4 from './text/h4';

interface Props extends StyleProps {
    children?: (parent: RadioMenuItem) => React.ReactNode;
    isSelected: boolean;
    label: string;
    onPress: noop;
    style?: Partial<RadioMenuItemStyleSchema>;
}

const defaultProps = {
    children: ({ props: { isSelected, label, onPress }, RadioItem }: RadioMenuItem) => {
        return <RadioItem isSelected={isSelected} label={label} onPress={onPress} />;
    },
};

export default class RadioMenuItem extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'RadioMenuItem';
    public style: RadioMenuItemStyleSchema;

    public RadioItem = ({ isSelected, label, onPress }) => {
        return (
            <>
                <View style={this.style.optionContainer}>
                    <H4 style={{ h4: this.style.optionText }}>{label}</H4>
                    <RadioButton accessibilityLabel={label} onPress={onPress} selected={isSelected} />
                </View>
                <HorizontalRule />
            </>
        );
    };

    public render() {
        return this.props.children(this);
    }
}
