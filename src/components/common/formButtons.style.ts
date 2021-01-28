import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface FormButtonsStyleSchema extends StyleSheetSchema {
    button: ViewStyle;
    buttonContainer: ViewStyle;
}

export default ({ colorSchema, windowWidth, hairlineWidth }: StyleSchemaParams): FormButtonsStyleSchema => {
    // if you find commonly repeated style key define here
    const fontSize = 18;
    const color = colorSchema.pages.formColors.paragraphs;
    return {
        button: {
            flex: 0,
            width: '47.5%',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
        },
    };
};
