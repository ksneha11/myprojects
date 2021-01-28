import { Platform, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface InputStyleSchema extends StyleSheetSchema {
    multiline: ViewStyle;
    multilineHeight: ViewStyle;
    placeholderText: TextStyle;
    rightIcon: TextStyle;
    rightIconContainer: ViewStyle;
    rightIconDisabled: TextStyle;
    rightIconTouchableContainer: ViewStyle;
    rootContainer: ViewStyle;
    textInput: ViewStyle;
    textStyle: TextStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): InputStyleSchema => ({
    multiline: {
        marginVertical: null,
        paddingTop: Platform.select({ ios: 10, android: null }),
    },
    multilineHeight: {
        height: Platform.select({ ios: 20, android: 0 }),
    },
    placeholderText: {},
    rightIcon: {
        color: colorSchema.pages.formColors.formField.inputIcons,
        fontSize: 20,
        height: 50,
        lineHeight: 50,
        paddingHorizontal: 14,
    },
    rightIconContainer: {
        borderLeftColor: colorSchema.pages.formColors.formField.inputBorders,
        borderLeftWidth: 1,
        bottom: 1,
        position: 'absolute',
        right: 0,
        top: 1,
    },
    rightIconDisabled: {
        color: colorSchema.pages.formColors.formField.inputBorders,
        fontSize: 20,
        height: 47,
        lineHeight: 47,
        paddingHorizontal: 14,
    },
    rightIconTouchableContainer: {},
    rootContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
    },
    textInput: {
        borderColor: colorSchema.pages.formColors.formField.inputBorders,
        borderRadius: 10,
        borderWidth: 1,
        flex: 1,
        flexGrow: 1,
        height: 50,
        marginRight: 20,
        marginVertical: 6,
        paddingHorizontal: 10,
        paddingLeft: 16,
        width: '100%',
    },
    textStyle: {
        paddingStart: 15,
    },
});
