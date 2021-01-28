import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface AnimatedCollapsibleSchema extends StyleSheetSchema {
    collapsibleContainer: ViewStyle;
    collapsibleContentContainer: ViewStyle;
    hasMoreSubtitles: ViewStyle;
    iconCollapsed: ViewStyle;
    iconExpanded: ViewStyle;
    leftIcon: TextStyle;
    mainContent: ViewStyle;
    mainContentContainer: ViewStyle;
    subtitle: TextStyle;
    title: TextStyle;
    titleCollapsed: TextStyle;
    titleExpanded: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): AnimatedCollapsibleSchema => {
    return {
        collapsibleContainer: {
            flex: 1,
            flexDirection: 'row',
        },
        collapsibleContentContainer: {
            marginLeft: -15,
        },
        hasMoreSubtitles: {
            marginTop: 15,
        },
        iconCollapsed: {
            marginLeft: -5,
        },
        iconExpanded: {
            marginLeft: 0,
            marginTop: -2,
        },
        leftIcon: {
            color: colorSchema.pages.formColors.expandableIcons,
            fontSize: 20,
            marginTop: 0,
        },
        mainContent: {
            flex: 1,
        },
        mainContentContainer: {
            flex: 1,
        },
        subtitle: {},
        title: {
            color: colorSchema.pages.formColors.links,
            fontFamily: colorSchema.typeFaceParagraph,
            fontSize: 14,
            textDecorationLine: 'underline',
        },
        titleCollapsed: {
            marginLeft: 15,
        },
        titleExpanded: {
            marginLeft: 10,
        },
    };
};
