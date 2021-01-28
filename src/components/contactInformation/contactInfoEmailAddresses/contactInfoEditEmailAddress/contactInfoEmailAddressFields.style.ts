import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../../styles';

export interface ContactInfoEditEmailAddressStyleSchema extends StyleSheetSchema {
    emailField: ViewStyle;
    formFieldContainer: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({}: StyleSchemaParams): ContactInfoEditEmailAddressStyleSchema => {
    return {
        emailField: {
            marginTop: 20,
        },
        formFieldContainer: {
            marginTop: 0,
        },
        rootContainer: {
            flex: 1,
            flexGrow: 1,
        },
    };
};
