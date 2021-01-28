import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface PopupButtonStyleSchema extends StyleSheetSchema {
    buttonLabel: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): PopupButtonStyleSchema => {
    return {
        buttonLabel: {
            color: colorSchema.pages.formColors.links,
            fontSize: 16,
            fontWeight: '500',
        },
    };
};
