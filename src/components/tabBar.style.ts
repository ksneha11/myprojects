import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../styles';

export interface TabBarStyleSchema extends StyleSheetSchema {
    tabBar: ViewStyle;
    tabContainer: ViewStyle;
    textContainer: TextStyle; // TODO: shouldn't be named container
}

export default ({ colorSchema }: Partial<StyleSchemaParams>): TabBarStyleSchema => {
    return {
        tabBar: {
            backgroundColor: colorSchema.tabBars.backgroundColor,
            borderTopColor: colorSchema.tabBars.borderColor,
            borderTopWidth: StyleSheet.hairlineWidth,
            height: 58,
            justifyContent: 'center',
            paddingVertical: 6,
        },
        tabContainer: {
            flex: 0,
            width: '25%',
        },
        textContainer: {
            color: colorSchema.tabs.textColor,
            fontSize: 11,
        },
    };
};
