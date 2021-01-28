import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface AlertCardStyleSchema extends StyleSheetSchema {
    card: ViewStyle;
    cardShadows: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): AlertCardStyleSchema => ({
    card: {
        backgroundColor: colorSchema.alerts.warningBackground,
    },
    cardShadows: {
        shadowColor: colorSchema.pages.formColors.formField.inputBorders,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
});
