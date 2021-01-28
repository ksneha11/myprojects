import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface LoginStyleSchema extends StyleSheetSchema {
    actions: TextStyle;
    errorMessage: TextStyle;
    forgotUsernamePassword: ViewStyle;
    forgotUsernamePasswordText: TextStyle;
    formFieldLabel: TextStyle;
    password: ViewStyle;
    register: TextStyle;
    rootContainer: ViewStyle;
    safeArea: ViewStyle;
    title: TextStyle;
    titleContainer: ViewStyle;
    username: ViewStyle;
    usernamePasswordContainer: ViewStyle;
    warningIcon: TextStyle;

}

export default ({ colorSchema, windowWidth }: StyleSchemaParams): LoginStyleSchema => {
    const color = colorSchema.pages.formColors.paragraphs;

    return {
        actions: {
            color: colorSchema.pages.formColors.links,
        },
        errorMessage: {},
        forgotUsernamePassword: {},
        forgotUsernamePasswordText: {},
        formFieldContainer: {
            paddingHorizontal: 20,
            width: '100%',
        },
        formFieldLabel: {},
        password: {
            borderColor: colorSchema.pages.formColors.formField.inputBorders,
            borderWidth: 1,
            height: 49,
            marginTop: 20,
            width: 285,
        },
        register: {
            alignItems: 'center',
        },
        registerText: {},
        rootContainer: {
            alignItems: 'center',
            flex: 0,
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'center',
        },
        safeArea: {
            flex: 1,
        },
        title: {
            paddingTop: 89,
            width: windowWidth * 0.66,
        },
        titleContainer: {
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        username: {
            borderColor: colorSchema.pages.formColors.formField.inputBorders,
            borderWidth: 1,
            height: 49,
            marginTop: 36,
            width: 285,
        },
        usernamePasswordContainer: {
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        warningIcon: {}
    };
};
