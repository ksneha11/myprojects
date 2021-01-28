import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface H6StyleSchema extends StyleSheetSchema {
    h6: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): H6StyleSchema => {
    return {
        h6: {
            color: colorSchema.pages.text.h5,
            fontFamily: colorSchema.typeFaceBold,
            fontSize: 14,
        },
    };
};
