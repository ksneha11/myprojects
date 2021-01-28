import { Platform, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface PaymentRadioSelectorStyleSchema extends StyleSheetSchema {
    cardStyle?: ViewStyle;
    defaultText: TextStyle;
    expiredText: TextStyle;
    iconStyle: TextStyle;
    rootContainer: ViewStyle;
}

// Strictly for the use of overriding some of the RadioSelector styles put in place by paymentRadioSelector
export default ({ colorSchema }: StyleSchemaParams): PaymentRadioSelectorStyleSchema => {
    return {
        cardStyle: {
            flexDirection: 'row',
        },
        defaultText: {
            // FIXME: Shouldn't be an h1 fix when merged to develop
            color: colorSchema.pages.text.h1,
            fontStyle: 'italic',
            marginTop: 10,
        },
        expiredText: {
            color: colorSchema.pages.formColors.validation.invalid,
        },
        iconStyle: {
            marginBottom: Platform.OS === 'android' ? 4 : 2,
        },
        rootContainer: {
            borderRadius: 10,
            height: 110,
        },
    };
};
