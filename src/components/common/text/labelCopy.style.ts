import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface LabelCopyStyleSchema extends StyleSheetSchema {
    labelCopy: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): LabelCopyStyleSchema => ({
    labelCopy: {
        fontFamily: colorSchema.typeFaceBold,
        fontSize: 16,
        lineHeight: 20,
    },
});
