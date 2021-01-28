import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface DatePickerStyleSchema extends StyleSheetSchema {
    calendarBodyContainer: ViewStyle;
    calendarContainer: ViewStyle;
    calendarDayContainer: ViewStyle;
    calendarDayCurrentMonthContainer: ViewStyle;
    calendarDayCurrentMonthText: TextStyle;
    calendarDaySelectedContainer: ViewStyle;
    calendarDaySelectedText: TextStyle;
    calendarDayText: TextStyle;
    calendarHeaderContainer: ViewStyle;
    calendarMonthYearTitleContainer: ViewStyle;
    calendarMonthYearTitleText: TextStyle;
    calendarNavigationIcon: TextStyle;
    calendarNextMonthContainer: ViewStyle;
    calendarPreviousMonthContainer: ViewStyle;
    calendarWeekContainer: ViewStyle;
    inputRightIcon: TextStyle;
    modelContentContainer: ViewStyle;
}

export default ({ colorSchema, hairlineWidth }: StyleSchemaParams): DatePickerStyleSchema => ({
    calendarBodyContainer: {
        borderColor: colorSchema.pages.formColors.formField.inputBorders,
        borderWidth: hairlineWidth,
        width: '100%',
    },
    calendarContainer: {
        width: '100%',
    },
    calendarDayContainer: {
        alignContent: 'center',
        borderColor: colorSchema.pages.formColors.formField.inputBorders,
        borderWidth: hairlineWidth,
        flex: 1,
        height: 40,
    },
    calendarDayCurrentMonthContainer: {
        backgroundColor: colorSchema.pages.formColors.toggleable.inactive.backgroundColor,
    },
    calendarDayCurrentMonthText: {
        color: colorSchema.pages.formColors.toggleable.inactive.color,
    },
    calendarDaySelectedContainer: {
        backgroundColor: colorSchema.pages.formColors.toggleable.active.backgroundColor,
    },
    calendarDaySelectedText: {
        color: colorSchema.pages.formColors.toggleable.active.color,
    },
    calendarDayText: {
        color: colorSchema.pages.formColors.formField.inputBorders,
        fontFamily: colorSchema.typeFace,
        fontSize: 16,
        height: 40,
        lineHeight: 40,
        textAlign: 'center',
    },
    calendarHeaderContainer: {
        backgroundColor: colorSchema.pages.formColors.cards.backgroundColor,
        flexDirection: 'row',
        height: 40,
    },
    calendarMonthYearTitleContainer: {
        alignContent: 'center',
        flex: 5,
        height: 40,
    },
    calendarMonthYearTitleText: {
        fontFamily: colorSchema.typeFace,
        fontSize: 18,
        lineHeight: 40,
        textAlign: 'center',
        width: '100%',
    },
    calendarNavigationIcon: {
        color: colorSchema.pages.formColors.links,
        lineHeight: 40,
        textAlign: 'center',
    },
    calendarNextMonthContainer: {
        alignContent: 'center',
        flex: 1,
    },
    calendarPreviousMonthContainer: {
        alignContent: 'center',
        flex: 1,
    },
    calendarWeekContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    inputRightIcon: {
        fontSize: 30,
    },
    modelContentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '90%',
    },
});
