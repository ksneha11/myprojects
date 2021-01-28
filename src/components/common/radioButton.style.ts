import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface RadioButtonStyleSchema extends StyleSheetSchema {
    radioButtonFiller: TextStyle;
    radioButtonShape: ViewStyle;
    rootContainer: ViewStyle;
    selectedOuterStyles: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): RadioButtonStyleSchema => {
    const radioButtonShapeCommon: ViewStyle = {
        alignItems: 'center',
        backgroundColor: colorSchema.radioButton.backgroundColor,
        borderColor: colorSchema.radioButton.unselectedBorder,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        display: 'flex',
        height: 20,
        justifyContent: 'center',
        width: 20,
    };
    return {
        radioButtonFiller: Platform.select({
            android: {
                backgroundColor: colorSchema.radioButton.selectedInnerColor,
                borderRadius: 7,
                height: 10,
                width: 10,
            },
            ios: {
                backgroundColor: colorSchema.radioButton.selectedInnerColor,
                borderRadius: 7,
                height: 14,
                width: 14,
            },
        }),
        radioButtonShape: Platform.select({
            android: {
                ...radioButtonShapeCommon,
                borderColor: colorSchema.radioButton.unselectedBorderAndroid,
                borderWidth: 2,
            },
            ios: {
                ...radioButtonShapeCommon,
            },
        }),
        rootContainer: {
            alignItems: 'center',
            flexDirection: 'row',
        },
        selectedOuterStyles: {
            borderColor: colorSchema.radioButton.selectedOuterBorder,
        },
    };
};
