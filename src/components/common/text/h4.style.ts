import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface H4StyleSchema extends StyleSheetSchema {
    h4: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): H4StyleSchema => {
    return {
        h4: {
            color: colorSchema.pages.text.h4,
            fontFamily: colorSchema.typeFace,
            fontSize: 18, // why h2 styles are being used here?- Rahul. Change this to use 14 after confirmtation
            fontWeight: '500',
        },
    };
};
