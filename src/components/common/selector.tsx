import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { RadioButtonGroup } from '.';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { SelectorStyleSchema } from './selector.style';

interface Props extends StyleProps {
    activeIndex: number;
    isVertical?: boolean;
    labels: string[];
    onPress: (index: number, labels: string) => void;
    style?: Partial<SelectorStyleSchema>;
}

const defaultProps = {
    isVertical: false,
};

export default class Selector extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'Selector';
    public style: SelectorStyleSchema;

    public PaymentTypeSelection = ({ labels }) => {
        return (
            <View style={this.style.selectorContainer}>
                <RadioButtonGroup
                    customButton={({ buttonInfo, index }) => (
                        <this.PaymentTypeButton label={buttonInfo} index={index} />
                    )}
                    isVertical={this.props.isVertical}
                    radioButtonGroupAccessibilityLabel={'Please Choose an Option'}
                    radioButtonItems={labels}
                />
            </View>
        );
    };

    public render() {
        const PaymentTypeSelection = this.PaymentTypeSelection;
        return <PaymentTypeSelection labels={this.props.labels} />;
    }

    protected PaymentTypeButton = ({ index, label }: { index: number; label: any }) => {
        const isActive = index === this.props.activeIndex;
        return (
            <Button
                accessibilityLabel={label}
                accessibilityRole="button"
                accessibilityStates={isActive ? ['selected'] : []}
                buttonStyle={[
                    this.style.buttonContainer,
                    index === 0 ? this.style.leftButton : this.style.rightButton,
                    isActive ? this.style.activeButton : this.style.inactiveButton,
                ]}
                containerStyle={[this.style.rootContainer]}
                onPress={() => this.props.onPress(index, label)}
                title={label}
                titleStyle={[
                    this.style.buttonText,
                    isActive ? this.style.activeButtonLabel : this.style.inactiveButtonLabel,
                ]}
            />
        );
    };
}
