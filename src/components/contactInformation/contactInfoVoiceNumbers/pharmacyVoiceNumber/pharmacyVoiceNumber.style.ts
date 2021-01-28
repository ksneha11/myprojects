import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../../styles';

export interface PharmacyVoiceNumberStyleSchema extends StyleSheetSchema {
    disabledInput: ViewStyle;
    formFieldContainer: ViewStyle;
    rootContainer: ViewStyle;
    safeAreaContainer: ViewStyle;
}

export default ({ colorSchema, windowWidth, hairlineWidth }: StyleSchemaParams): PharmacyVoiceNumberStyleSchema => {
    return {
        disabledInput: {
            backgroundColor: colorSchema.pages.formColors.disableable.disabledColor,
        },
        formFieldContainer: {
            marginTop: 20,
            paddingHorizontal: 0,
        },
        rootContainer: {
            flex: 1,
            padding: 20,
            paddingTop: 10,
        },
        safeAreaContainer: {
            flex: 1,
        },
    };
};
