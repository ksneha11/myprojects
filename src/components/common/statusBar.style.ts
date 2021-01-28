import { Platform, StatusBar, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface StatusBarStyleSchema extends StyleSheetSchema {
    content: ViewStyle;
    statusBar: ViewStyle;
    statusBarLight: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): StatusBarStyleSchema => {
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

    return {
        content: {
            backgroundColor: colorSchema.pageHeader.background,
        },
        statusBar: {
            backgroundColor: colorSchema.pageHeader.background,
            height: STATUSBAR_HEIGHT,
        },
        statusBarLight: {
            backgroundColor: colorSchema.pages.backgroundColor,
            height: STATUSBAR_HEIGHT,
        },
    };
};
