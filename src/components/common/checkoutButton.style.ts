import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface CheckoutButtonStyleSchema extends StyleSheetSchema {
    button: TextStyle;
    buttonContainer: ViewStyle;
    checkoutContainer: ViewStyle;
    paragraph: TextStyle;
    textContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): CheckoutButtonStyleSchema => ({
    button: {
        backgroundColor: colorSchema.pages.formColors.actionButtons.backgroundColor,
        flex: 1,
        height: 50,
    },
    buttonContainer: {
        flex: 3,
        justifyContent: 'center',
    },
    checkoutContainer: {
        backgroundColor: colorSchema.pages.formColors.horizontalSeparators,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-around',
        padding: 10,
        width: '100%',
    },
    paragraph: {
        fontSize: 14,
        fontWeight: '500',
    },
    textContainer: {
        flex: 4,
        justifyContent: 'center',
    },
});
