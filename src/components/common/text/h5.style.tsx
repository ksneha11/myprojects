import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface H5StyleSchema extends StyleSheetSchema {
    h5: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): H5StyleSchema => {
    return {
        h5: {
            color: colorSchema.pages.text.h5,
            fontFamily: colorSchema.typeFace,
            fontSize: 16, // same as h3, why? change it to use 12?
            fontWeight: '500',
        },
    };
};
