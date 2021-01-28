import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface FormFieldValidatorStyleSchema extends StyleSheetSchema {
    invalidCharacters: ViewStyle;
    invalidIcon: TextStyle;
    invalidInput: TextStyle;
    paragraph?: TextStyle;
    rootContainer: ViewStyle;
    titleContainer: ViewStyle;
    titleContainerIcon: TextStyle;
    validatorItemContainer: ViewStyle;
    validatorList: ViewStyle;
    validatorText: TextStyle;
    validIcon: TextStyle;
    validInput: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): FormFieldValidatorStyleSchema => {
    const fontSize = 14;
    const color = colorSchema.pages.formColors.paragraphs;

    return {
        input: {
            color,
            fontSize,
        },
        invalidCharacters: {
            marginLeft: 35,
        },
        invalidIcon: {
            color: colorSchema.pages.formColors.validation.invalid,
            marginTop: 2,
        },
        invalidInput: {
            color: colorSchema.pages.formColors.validation.invalid,
        },
        rootContainer: {
            flex: null,
            flexDirection: 'column',
        },
        titleContainer: {
            alignItems: 'center',
            flexDirection: 'row',
        },
        titleContainerIcon: {
            fontSize: 20,
        },
        unstyledValidatorText: {
            flex: 1,
            fontSize,
        },
        validIcon: {
            color: colorSchema.pages.formColors.validation.valid,
            marginTop: 2,
        },
        validInput: {
            color: colorSchema.pages.formColors.validation.valid,
        },
        validatorItemContainer: {
            alignItems: 'flex-start',
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 5,
        },
        validatorList: {
            marginLeft: 10,
            marginTop: 10,
        },
        validatorText: {
            flex: 1,
            fontSize,
            marginLeft: 10,
        },
        validatorTitle: {
            flex: 1,
            fontSize,
            marginLeft: 10,
        },
    };
};
