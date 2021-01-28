import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface ContactInfoVoiceNumbersStyleSchema extends StyleSheetSchema {
    contactPhoneContainer: ViewStyle;
    rootContainer: ViewStyle;
    textContainer: ViewStyle;
    title: TextStyle;
    titleContainer: ViewStyle;
}

export default ({ colorSchema, windowWidth, hairlineWidth }: StyleSchemaParams): ContactInfoVoiceNumbersStyleSchema => {
    return {
        contactPhoneContainer: {
            minHeight: 50,
            marginBottom: 20,
        },
        rootContainer: {
            flex: 1,
        },
        textContainer: {
            justifyContent: 'flex-start',
        },
        title: {},
        titleContainer: {
            marginBottom: 20,
            marginTop: 30,
            paddingHorizontal: 20,
        },
    };
};
