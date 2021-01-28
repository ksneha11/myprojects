import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface RadioButtonGroupStyleSchema extends StyleSheetSchema {
    button: ViewStyle;
    buttonLabel: TextStyle;
    horizontalOptionsContainer: ViewStyle;
    rootContainer: ViewStyle;
    title: TextStyle;
    verticalOptionsContainer: ViewStyle;
}

export default ({  }: StyleSchemaParams): RadioButtonGroupStyleSchema => {
    return {
        button: {
            flexDirection: 'row',
            marginBottom: 20,
        },
        buttonLabel: {
            marginStart: 10,
        },
        horizontalOptionsContainer: {
            alignContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
        },
        rootContainer: {
            justifyContent: 'center',
            marginVertical: 10,
        },
        title: {
            // Exists to allow easy overriding of the title styles
        },
        verticalOptionsContainer: {
            flexDirection: 'column',
        },
    };
};
