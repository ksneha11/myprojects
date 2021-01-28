import React from 'react';
import { Text, View } from 'react-native';
import { Labels } from '../../context/abstractAppContext';
import HorizontalRule from '../horizontalRule';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { StepProgressorStyleSchema } from './stepProgressor.style';

interface Props extends StyleProps {
    data: string[];
    getDataSource: (labels: Labels) => { [key in string]: string };
    selectedIndex: number;
    style?: Partial<StepProgressorStyleSchema>;
}

const defaultProps = {
    data: [],
    getDataSource: (labels: Labels) => labels.pharmacy.reviewOrder.stepProgressor,
    selectedIndex: 0,
};

export default class StepProgressor extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'StepProgressor';
    public style: StepProgressorStyleSchema;

    public render() {
        return <this.RenderRow />;
    }

    public RenderRow = (): JSX.Element => {
        return (
            <View>
                <HorizontalRule style={{ horizontalRule: this.style.divider }} />
                <View style={this.style.rootContainer}>
                    {this.props.data.map((item, index) => {
                        const isActive = this.props.selectedIndex === index;
                        return (
                            <View style={this.style.itemContainer} key={index}>
                                <View
                                    style={[this.style.numberContainer, isActive && this.style.selectedNumberContainer]}
                                >
                                    <Text
                                        accessibilityStates={isActive ? ['selected'] : []}
                                        style={[this.style.stepNumber, isActive && this.style.selectedNumber]}
                                    >
                                        {index + 1}
                                    </Text>
                                </View>
                                <Text style={[this.style.stepText, isActive && this.style.selected]}>
                                    {this.props.getDataSource(this.labels)[item]}
                                </Text>
                            </View>
                        );
                    })}
                </View>
                <HorizontalRule style={{ horizontalRule: this.style.divider }} />
            </View>
        );
    };
}
