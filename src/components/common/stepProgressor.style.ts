import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface StepProgressorStyleSchema extends StyleSheetSchema {
    divider: ViewStyle;
    inactiveNumber: TextStyle;
    inactiveNumberContainer: ViewStyle;
    inactiveText: TextStyle;
    itemContainer: ViewStyle;
    numberContainer: ViewStyle;
    rootContainer: ViewStyle;
    selected: TextStyle;
    selectedNumber: TextStyle;
    selectedNumberContainer: ViewStyle;
    stepNumber: TextStyle;
    stepText: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): StepProgressorStyleSchema => {
    return {
        divider: {
            alignSelf: 'center',
            width: '90%',
        },
        inactiveNumber: {
            color: colorSchema.progressor.inactive.color,
        },
        inactiveNumberContainer: {
            backgroundColor: colorSchema.progressor.inactive.container,
        },
        inactiveText: {
            color: colorSchema.progressor.inactive.color,
        },
        itemContainer: {
            alignItems: 'center',
            backgroundColor: colorSchema.progressor.backgroundColor,
            flex: 1,
        },
        numberContainer: {
            alignItems: 'center',
            backgroundColor: colorSchema.progressor.inactive.container,
            borderRadius: 30,
            height: 30,
            justifyContent: 'center',
            width: 30,
        },
        rootContainer: {
            flexDirection: 'row',
            marginVertical: 15,
        },
        selected: {
            color: colorSchema.progressor.active.container,
        },
        selectedNumber: {
            color: colorSchema.progressor.active.color,
        },
        selectedNumberContainer: {
            backgroundColor: colorSchema.progressor.active.container,
        },
        stepNumber: {
            color: colorSchema.progressor.inactive.color,
            fontSize: 13,
        },
        stepText: {
            color: colorSchema.progressor.inactive.color,
            fontSize: 13,
            paddingTop: 8,
            textAlign: 'center',
            width: 70,
        },
    };
};
