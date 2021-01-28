import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../styles';

export interface BottomTabBarStyleSchema extends StyleSheetSchema {
    tabBar: ViewStyle;
    tabContainer: ViewStyle;
    textContainer: TextStyle; // TODO: shouldn't be named container
}

export default ({ colorSchema }: Partial<StyleSchemaParams>): BottomTabBarStyleSchema => {
    return {
        tabBar: {
            backgroundColor: colorSchema.tabBars.backgroundColor,
            height: 58,
            justifyContent: 'center',
            paddingBottom: 6,
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
