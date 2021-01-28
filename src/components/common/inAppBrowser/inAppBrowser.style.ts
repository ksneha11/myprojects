import { Dimensions, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface InAppBrowserStyleSchema extends StyleSheetSchema {
    loadingIndicator: ViewStyle;
    loadingIndicatorDone: ViewStyle;
    navBar: ViewStyle;
    navBarArrow: TextStyle;
    navBarArrows: ViewStyle;
    navBarBack: TextStyle;
    rootContainer: ViewStyle;
    webViewContainer: ViewStyle;
}

export default ({ colorSchema, windowWidth }: StyleSchemaParams): InAppBrowserStyleSchema => {
    return {
        loadingIndicator: {
            left: windowWidth / 2,
            position: 'absolute',
            top: Dimensions.get('window').height / 2,
            zIndex: 10,
        },
        loadingIndicatorDone: {
            zIndex: -10,
        },
        navBar: {
            alignItems: 'center',
            backgroundColor: colorSchema.pages.backgroundColor,
            elevation: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            shadowColor: colorSchema.pages.formColors.formField.inputBorders,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            width: '100%',
            zIndex: 10,
        },
        navBarArrow: {
            color: colorSchema.pages.formColors.actionButtons.backgroundColor,
            fontSize: 20,
            marginStart: 10,
            marginVertical: 15,
        },
        navBarArrows: {
            flexDirection: 'row',
        },
        navBarBack: {
            fontSize: 16,
            marginVertical: 13,
        },
        rootContainer: {
            flex: 1,
            width: '100%',
        },
        webViewContainer: {
            flex: 1,
            width: '100%',
        },
    };
};
