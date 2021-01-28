import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../../styles';

export interface AccountVoiceNumberStyleSchema extends StyleSheetSchema {
    buttonContainer: ViewStyle;
    formFieldContainer: ViewStyle;
    formFieldLabel: ViewStyle;
    inputContainer: ViewStyle;
    paragraph: TextStyle;
    rootContainer: ViewStyle;
    title: TextStyle;
}

export default ({  }: StyleSchemaParams): AccountVoiceNumberStyleSchema => {
    return {
        buttonContainer: {
            flex: 0,
            width: '47.5%',
        },
        formFieldContainer: {
            marginTop: 20,
            paddingHorizontal: 0,
        },
        formFieldLabel: {
            marginLeft: 0,
        },
        inputContainer: {
            paddingHorizontal: 20,
            paddingTop: 30,
        },
        paragraph: {
            marginTop: 20,
        },
        rootContainer: {
            flex: 1,
        },
        title: {},
    };
};
