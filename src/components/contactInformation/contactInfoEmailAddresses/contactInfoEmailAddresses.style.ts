import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface ContactInfoEmailAddressesStyleSchema extends StyleSheetSchema {
    contactEmailContainer: ViewStyle;
    emailTitleContainer: ViewStyle;
    noAddressFoundContainer: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ContactInfoEmailAddressesStyleSchema => {
    return {
        contactEmailContainer: {
            minHeight: 50,
        },
        emailTitleContainer: {
            marginBottom: 20,
            paddingHorizontal: 20,
        },
        noAddressFoundContainer: {
            marginHorizontal: 20,
        },
        rootContainer: {
            flex: 1,
            marginBottom: 20,
            marginTop: 30,
        },
    };
};
