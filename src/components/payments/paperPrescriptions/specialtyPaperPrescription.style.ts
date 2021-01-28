import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface SpecialtyPaperPrescriptionSchema extends StyleSheetSchema {
    divider: TextStyle;
    helpText: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): SpecialtyPaperPrescriptionSchema => {
    return {
        contactNumber: {
            color: colorSchema.pages.formColors.links,
            textDecorationColor: colorSchema.pages.formColors.links,
            textDecorationLine: 'underline',
        },
        divider: {
            alignSelf: 'stretch',
            marginTop: 15,
        },
        emailAddress: {},
        emailContainer: {
            alignSelf: 'flex-start',
            marginTop: 15,
        },
        findButtonContainer: {
            alignSelf: 'stretch',
            marginTop: 50,
        },
        helpText: {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            marginBottom: 20,
        },
        instructionText: {
            alignSelf: 'flex-start',
            marginTop: 30,
        },
        rootContainer: {
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            marginHorizontal: 20,
        },
    };
};
