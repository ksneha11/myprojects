import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface InlineAlertStyleSchema extends StyleSheetSchema {
    confirmIcon: TextStyle;
    container: ViewStyle;
    errorMessage: TextStyle;
    errorMessageContainer: ViewStyle;
    iconContainer: ViewStyle;
    iconMiniSize: TextStyle;
    iconNormalSize: TextStyle;
    infoIcon: TextStyle;
    linkMessage: TextStyle;
    warningIcon: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): InlineAlertStyleSchema => {
    const iconMarginHorizontal = 10;

    return {
        confirmIcon: {
            color: colorSchema.alerts.confirmIcons,
            marginHorizontal: iconMarginHorizontal,
        },
        container: {
            alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        errorMessage: {
            color: colorSchema.pages.text.paragraph,
            fontFamily: colorSchema.typeFaceTitle,
            fontSize: 14,
            marginTop: 2,
        },
        // TODO: fix this? @lookmai
        // this is a known bug https://github.com/facebook/react-native/issues/1438
        // we have to add this in to prevent text from taking 100% width and
        // wrapped to parent's container properly :(
        errorMessageContainer: {
            flex: 1,
            flexGrow: 1,
            width: 0,
        },
        iconContainer: {},
        iconMiniSize: {
            fontSize: 15,
            marginTop: 2,
        },
        iconNormalSize: {
            alignSelf: 'center',
            fontSize: 20,
        },
        infoIcon: {
            color: colorSchema.alerts.infoIcons,
            marginHorizontal: iconMarginHorizontal,
        },
        linkMessage: {
            fontFamily: colorSchema.typeFace,
            fontSize: 14,
            marginTop: 12,
            textDecorationLine: 'underline',
        },
        warningIcon: {
            color: colorSchema.alerts.warningIcons,
            marginRight: iconMarginHorizontal,
        },
    };
};
