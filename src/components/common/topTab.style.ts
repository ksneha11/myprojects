import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface TopTabStyleSchema extends StyleSheetSchema {
    activeTabContainer: ViewStyle;
    activeTabIndicator: ViewStyle;
    activeTabLabel: TextStyle;
    tabContainer: ViewStyle;
    tabIndicator: ViewStyle;
    tabLabel: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): TopTabStyleSchema => ({
    activeTabContainer: {
        backgroundColor: colorSchema.topTabs.activeBackgroundColor,
    },
    activeTabIndicator: {
        borderTopColor: colorSchema.topTabs.activeBackgroundColor,
    },
    activeTabLabel: {
        color: colorSchema.topTabs.activeTextColor,
    },
    tabContainer: {
        alignItems: 'center',
        backgroundColor: colorSchema.topTabs.inactiveBackgroundColor,
        paddingVertical: 15,
        width: '100%',
    },
    tabIndicator: {
        borderLeftColor: 'transparent',
        borderLeftWidth: 10,
        borderRightColor: 'transparent',
        borderRightWidth: 10,
        borderTopColor: 'transparent',
        borderTopWidth: 10,
        height: 0,
        width: 0,
    },
    tabLabel: {
        color: colorSchema.topTabs.inactiveTextColor,
        fontSize: 16,
        fontWeight: '600',
    },
});
