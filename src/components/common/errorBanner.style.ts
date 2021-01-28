import { Platform, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ErrorBannerStyleSchema extends StyleSheetSchema {
    actionContainer: ViewStyle;
    contentContainer: ViewStyle;
    errorText: TextStyle;
    icon: TextStyle;
    iconWrapper: ViewStyle;
    isNotVisible: ViewStyle;
    mainContainer: ViewStyle;
    secondaryButton: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ErrorBannerStyleSchema => {
    return {
        actionContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingBottom: 10,
            paddingTop: 5,
        },
        contentContainer: {
            flexDirection: 'row',
            paddingBottom: 5,
            paddingTop: 10,
        },
        errorText: {
            flex: 1,
        },
        icon: {
            color: colorSchema.alerts.warningIcons,
            fontSize: 24,
        },
        iconWrapper: {
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
        },
        isNotVisible: {
            height: 0,
            opacity: 0,
        },
        mainContainer: {
            backgroundColor: colorSchema.alerts.warningBackground,
            paddingHorizontal: 20,
            ...Platform.select({
                android: {
                    elevation: 2,
                },
                ios: {
                    shadowColor: 'black',
                    shadowOffset: { height: 2, width: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                },
            }),
            width: '100%',
        },
        secondaryButton: {
            marginHorizontal: 20,
        },
    };
};
