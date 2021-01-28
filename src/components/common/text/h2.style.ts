import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface H2StyleSchema extends StyleSheetSchema {
    h2: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): H2StyleSchema => {
    return {
        h2: {
            color: colorSchema.pages.text.h2,
            fontFamily: colorSchema.typeFace,
            fontSize: 18,
            fontWeight: '500',
        },
        h2Dark: {
            color: colorSchema.pages.text.paragraph,
        },
    };
};
