import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface MakePaymentStyleSchema extends StyleSheetSchema {
    automaticContentSpace: ViewStyle;
    enrollmentText: TextStyle;
    horizontalLine: ViewStyle;
    noRecentPaymentContainer: ViewStyle;
    noRecentPaymentText: TextStyle;
    payNowContainer: ViewStyle;
    payNowIcon: TextStyle;
    payNowText: TextStyle;
    recentPaymentAmountContainer: ViewStyle;
    recentPaymentContainer: ViewStyle;
    recentPaymentText: TextStyle;
    rootContainer: ViewStyle;
    sectionContainer: ViewStyle;
    sectionTitle: TextStyle;
    sectionValue: TextStyle;
    setupTextLink: TextStyle;
    weightedText: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): MakePaymentStyleSchema => {
    return {
        automaticContentSpace: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginLeft: 20,
            marginTop: 5,
        },
        enrollmentText: {
            color: colorSchema.modals.backdrop,
            marginRight: 13,
            marginTop: 5,
        },
        horizontalLine: {
            marginHorizontal: 16,
            marginTop: 26,
            width: '91%',
        },
        noRecentPaymentContainer: {
            marginHorizontal: 20,
            marginTop: 25,
        },
        noRecentPaymentText: {
            fontStyle: 'italic',
            marginBottom: 10,
        },
        payNowContainer: {
            flexDirection: 'row',
        },
        payNowIcon: {
            color: colorSchema.pages.formColors.links,
            marginStart: 10,
            marginTop: 8,
        },
        payNowText: {
            color: colorSchema.pages.formColors.links,
            marginTop: 3,
        },
        recentPaymentAmountContainer: {
            flexDirection: 'row',
            marginVertical: 10,
        },
        recentPaymentContainer: {
            marginHorizontal: 20,
            marginTop: 25,
        },
        recentPaymentText: {
            color: colorSchema.pages.formColors.paragraphs,
        },
        rootContainer: {},
        sectionContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 6,
        },
        sectionTitle: {
            color: colorSchema.pages.formColors.descriptiveText,
            marginLeft: 20,
            marginTop: 31,
        },
        sectionValue: {
            color: colorSchema.pages.formColors.descriptiveText,
        },
        setupTextLink: {
            marginTop: 3,
        },
        weightedText: {
            color: colorSchema.pages.formColors.paragraphs,
        },
    };
};
