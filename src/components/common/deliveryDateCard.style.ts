import { Platform, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface DeliveryDateCardStyleSchema extends StyleSheetSchema {
    calendarIcon: TextStyle;
    datePickerBoxContainer: ViewStyle;
    leftIcon: TextStyle;
    placeholderText: TextStyle;
    subtextContainer: ViewStyle;
    textContainer: ViewStyle;
    verticalLine: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): Partial<DeliveryDateCardStyleSchema> => ({
    calendarIcon: {
        color: colorSchema.pages.formColors.actionButtons.backgroundColor,
        fontSize: 30,
        paddingHorizontal: 15,
    },
    datePickerBoxContainer: {
        width: '75%',
    },
    leftIcon: {
        fontSize: 35,
    },
    placeholderText: {
        color: colorSchema.pages.text.disabled,
    },
    rootContainer: {
        flex: 1,
    },
    subtextContainer: {
        marginBottom: 16,
        marginTop: 2,
    },
    textContainer: {
        flexDirection: 'column',
        flexShrink: 1,
        marginHorizontal: 10,
    },
    verticalLine: {
        borderRightColor: colorSchema.menus.menuItems.borders,
        borderRightWidth: 1,
        height: '100%',
    },
});
