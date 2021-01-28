import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface ContactInfoAccountRecoveryStyleSchema extends StyleSheetSchema {
    accountRecoveryTitleContainer: ViewStyle;
    contactNumberContainer: ViewStyle;
    noNumberFoundContainer: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ContactInfoAccountRecoveryStyleSchema => {
    return {
        accountRecoveryTitleContainer: {
            marginBottom: 20,
            paddingHorizontal: 20,
        },
        contactNumberContainer: {
            minHeight: 50,
        },
        noNumberFoundContainer: {
            marginHorizontal: 20,
        },
        rootContainer: {
            flex: 1,
            marginBottom: 20,
            marginTop: 30,
        },
    };
};
