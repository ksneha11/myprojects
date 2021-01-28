import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface DisclaimerCopyStyleSchema extends StyleSheetSchema {
    disclaimerCopy: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): DisclaimerCopyStyleSchema => {
    return {
        disclaimerCopy: {
            color: colorSchema.pages.text.disclaimerCopy,
            fontFamily: colorSchema.typeFace,
            fontSize: 13,
        },
    };
};
