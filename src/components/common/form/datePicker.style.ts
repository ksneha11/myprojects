import { Platform, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface DatePickerStyleSchema extends StyleSheetSchema {
    datePickerIOS: ViewStyle;
    datePickerIOSButtonContainer: ViewStyle;
    datePickerIOSDoneButton: TextStyle;
    datePickerIOSNavigateDatesContainer: ViewStyle;
    datePickerIOSNavigationIcon: TextStyle;
    inputMultiline: ViewStyle;
    rightIconContainer: ViewStyle;
    textInput: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): DatePickerStyleSchema => ({
    datePickerIOS: {
        height: '100%',
        margin: 0,
        padding: 0,
    },
    datePickerIOSButtonContainer: {
        backgroundColor: colorSchema.dropDown.iOS.header.backgroundColor,
        borderBottomColor: colorSchema.dropDown.iOS.header.borderColor,
        borderBottomWidth: hairlineWidth,
        borderTopColor: colorSchema.dropDown.iOS.header.borderColor,
        borderTopWidth: hairlineWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    datePickerIOSDoneButton: {
        color: colorSchema.dropDown.iOS.header.textColor,
        fontSize: 17,
    },
    datePickerIOSNavigateDatesContainer: {
        flexDirection: 'row',
        marginStart: 5,
        marginTop: 5,
    },
    datePickerIOSNavigationIcon: {
        color: colorSchema.dropDown.iOS.header.textColor,
        fontSize: 24,
        marginHorizontal: 10,
    },
    inputMultiline: {
        marginVertical: null,
        paddingTop: Platform.select({ ios: 15, android: null }),
    },
    rightIconContainer: {
        top: 2,
    },
    textInput: {
        marginRight: 0,
        paddingRight: 32,
    },
});
