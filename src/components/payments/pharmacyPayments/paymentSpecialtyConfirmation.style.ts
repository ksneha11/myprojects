import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface PaymentSpecialtyConfirmationStyleSchema extends StyleSheetSchema {
    confirmationTitleContainer: ViewStyle;
    disclaimerTextContainer: ViewStyle;
    horizontalRuleContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): PaymentSpecialtyConfirmationStyleSchema => {
    return {
        confirmationTitleContainer: {
            marginTop: 40,
        },
        disclaimerTextContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            marginTop: 5,
        },
        horizontalRuleContainer: {
            marginBottom: 400,
            marginHorizontal: -5,
            marginTop: 10,
        },
        rootContainer: {
            flex: 1,
            marginHorizontal: 20,
        },
    };
};
