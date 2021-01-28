import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface PaperlessPrescriptionsSchema extends StyleSheetSchema {
    buttonsContainer: ViewStyle;
    cancelButton: ViewStyle;
    contactNumber: TextStyle;
    divider: TextStyle;
    formStyle: ViewStyle;
    helpText: ViewStyle;
    inputFormStyle: ViewStyle;
    memberSelection: TextStyle;
    pageTitle: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): PaperlessPrescriptionsSchema => {
    return {
        buttonsContainer: {
            alignItems: 'center',
            alignSelf: 'stretch',
            marginHorizontal: 10,
            marginTop: 50,
        },
        cancelButton: {
            marginTop: 20,
        },
        contactNumber: {
            color: colorSchema.pages.formColors.links,
            textDecorationColor: colorSchema.pages.formColors.links,
            textDecorationLine: 'underline',
        },
        divider: {
            alignSelf: 'stretch',
            marginHorizontal: 10,
            marginTop: 20,
        },
        formStyle: {
            alignSelf: 'stretch',
            marginTop: 30,
        },
        helpText: {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            marginBottom: 20,
            marginHorizontal: 10,
        },
        inputFormStyle: {
            height: 70,
            justifyContent: 'flex-start',
        },
        memberSelection: {
            alignSelf: 'flex-start',
            marginHorizontal: 16,
            marginTop: 30,
        },
        pageTitle: {
            marginHorizontal: 6,
            marginTop: 30,
        },
        rootContainer: {
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            marginHorizontal: 16,
        },
    };
};
