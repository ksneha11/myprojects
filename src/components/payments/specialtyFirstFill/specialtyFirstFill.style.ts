import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface SpecialtyFirstFillSchema extends StyleSheetSchema {
    divider: TextStyle;
    helpText: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): SpecialtyFirstFillSchema => {
    return {
        buttonsContainer: {
            alignItems: 'center',
            alignSelf: 'stretch',
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
            marginTop: 20,
        },
        helpText: {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            marginBottom: 20,
        },
        radioButtonContentContainer: {
            alignSelf: 'stretch',
            flex: 1,
            marginLeft: 12,
            marginTop: 10,
        },
        radioButtonTitle: {
            alignSelf: 'flex-start',
            marginTop: 40,
        },
        rootContainer: {
            alignItems: 'center',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            marginHorizontal: 20,
        },
    };
};
