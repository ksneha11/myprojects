import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface HelperTextStyleSchema extends StyleSheetSchema {
    helperText: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): HelperTextStyleSchema => ({
    helperText: {
        color: colorSchema.pages.text.helper,
        fontFamily: colorSchema.typeFaceHelper,
        fontSize: 14,
        lineHeight: 18,
    },
    rootContainer: {},
});
