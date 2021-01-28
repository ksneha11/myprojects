import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface FinePrintStyleSchema extends StyleSheetSchema {
    finePrint: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): FinePrintStyleSchema => {
    return {
        finePrint: {
            color: colorSchema.pages.text.finePrint,
            fontFamily: colorSchema.typeFace,
            fontSize: 12,
        },
    };
};
