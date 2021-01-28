import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import AppComponent from './appComponent';
import defaultStyle, { RadioButtonStyleSchema } from './radioButton.style';

interface Props {
    accessibilityLabel?: string;
    children?: (component: RadioButton) => React.ReactNode;
    onPress: noop;
    selected: boolean;
}

const defaultProps = {
    children: ({ RadioButtonContainer, style }) => {
        return (
            <>
                <RadioButtonContainer style={style} />
            </>
        );
    },
};

export default class RadioButton extends AppComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'RadioButton';
    public style: RadioButtonStyleSchema;

    public RadioButtonContainer = (): JSX.Element => {
        const { accessibilityLabel, selected } = this.props;
        const accessibilityText = accessibilityLabel || '';
        const accessiblityState = selected ? this.labels.radioButton.selected : this.labels.radioButton.notSelected;
        return (
            <TouchableWithoutFeedback
                accessibilityLabel={`${accessiblityState} ${accessibilityText}`}
                onPress={() => this.props.onPress()}
                accessible
                accessibilityRole="radio"
            >
                <View style={this.style.rootContainer}>
                    <View style={[this.style.radioButtonShape, selected && this.style.selectedOuterStyles]}>
                        <View style={[this.style.radioButtonFiller, { opacity: selected ? 100 : 0 }]} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    public render() {
        return <View style={this.style.rootContainer}>{this.props.children(this)}</View>;
    }
}
