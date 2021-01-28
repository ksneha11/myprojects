import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface ScreenLevelAlertStyleSchema extends StyleSheetSchema {
    alertContainer: ViewStyle;
    confirmContainer: ViewStyle;
    dismissIcon: TextStyle;
    dismissIconContainer: ViewStyle;
    errorMessage: TextStyle;
    iconNormalSize: TextStyle;
    rootContainer: ViewStyle;
    warningContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ScreenLevelAlertStyleSchema => {
    return {
        alertContainer: {
            flexGrow: 1,
        },
        confirmContainer: {
            backgroundColor: colorSchema.alerts.successBackground,
        },
        dismissIcon: {
            color: colorSchema.alerts.dismissIcon,
            fontSize: 12,
        },
        dismissIconContainer: {},
        errorMessage: {},
        iconNormalSize: {},
        rootContainer: {
            backgroundColor: colorSchema.alerts.defaultBackground,
            flexDirection: 'row',
            padding: 15,
        },
        warningContainer: {
            backgroundColor: colorSchema.alerts.warningBackground,
        },
    };
};
