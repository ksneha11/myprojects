import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface StaticContentSchema extends StyleSheetSchema {
    accessibilityField: TextStyle;
    bulletGroupChildContainer: ViewStyle;
    bulletGroupContent: TextStyle;
    bulletGroupContentContainer: ViewStyle;
    bulletIcon: TextStyle;
    bulletSubIcon: TextStyle;
    contentContainer: ViewStyle;
    fontWeightBold: TextStyle;
    fontWeightNormal: TextStyle;
    header: TextStyle;
    headerContainer: ViewStyle;
    menuItem: ViewStyle;
    menuItemExtraAbove: ViewStyle;
    menuItemExtraBelow: ViewStyle;
    menuItemText: TextStyle;
    noneBelow: ViewStyle;
    paragraph: TextStyle;
    paragraphContainer: ViewStyle;
    rootContainer: ViewStyle;
    sectionHeader: TextStyle;
    sectionHeaderContainer: ViewStyle;
    spaceAbove: ViewStyle;
    spaceBelow: ViewStyle;
    subHeader: TextStyle;
    subText: ViewStyle;
    subTextZeroMargin: ViewStyle;
}

/**
 * The styles that we use here do not match the wires
 * The wires themselves have inconsistent spacing
 * per Denise these are the requirements:
 *
 * [10:01 AM] Barba, Denise
 * Hey Sean, Here's the rule we used for Bullets
 * https://confluence.anthem.com/display/UX/Amerigroup+Redesign+-+UX+Decisions+and+Reference
 * Bullet spacing rules: After Paragraph - 10px spacing and then 10px between bullets. IF there are sub bullets, it is 5px spacing between sub bullets
 *
 * What this means is we should be able to do margin vertical 5 on all of these components
 * if it's a bullet group with children we'll set the children's margin to just 5
 */
export default ({ colorSchema }: StyleSchemaParams): StaticContentSchema => {
    return {
        accessibilityField: {
            height: 1,
        },
        bulletGroupChildContainer: {
            alignItems: 'center',
            flex: 0,
            flexDirection: 'row',
            flexShrink: 1,
            marginBottom: 5,
        },
        bulletGroupContent: {
            flex: 0,
            flexShrink: 1,
            fontSize: 16,
            lineHeight: 24,
        },
        bulletGroupContentContainer: {
            alignItems: 'flex-start',
            flexDirection: 'row',
            marginVertical: 5,
        },
        bulletIcon: {
            alignSelf: 'flex-start',
            fontSize: 30,
            marginEnd: 4,
            marginTop: -3,
        },
        bulletSubIcon: {
            marginStart: 25,
        },
        contentContainer: {
            marginBottom: 20,
            marginHorizontal: 20,
        },
        fontWeightBold: {
            fontFamily: colorSchema.typeFaceBold,
            fontWeight: '700',
        },
        fontWeightLight: {
            fontFamily: colorSchema.typeFaceLight,
            fontWeight: null,
        },
        fontWeightNormal: {
            fontWeight: '400',
        },
        header: {
            fontSize: 32,
            fontWeight: '300',
        },
        headerContainer: {
            marginBottom: 15,
            marginTop: 30,
        },
        lessAbove: {
            marginTop: 5,
        },
        lessBelow: {
            marginBottom: 5,
        },
        menuItem: {
            marginHorizontal: null,
        },
        menuItemExtraAbove: {
            marginTop: 25,
        },
        menuItemExtraBelow: {
            marginBottom: 25,
        },
        menuItemText: {
            marginVertical: 20,
        },
        noneBelow: {
            marginBottom: 0,
        },
        paragraph: {
            flex: 0,
            flexShrink: 1,
            fontSize: 16,
            lineHeight: 24,
            marginVertical: 10,
        },
        paragraphContainer: {
            flex: 0,
            flexShrink: 1,
        },
        rootContainer: {
            flex: 1,
        },
        sectionHeader: {
            fontWeight: null,
        },
        sectionHeaderContainer: {
            marginVertical: 5,
        },
        spaceAbove: {
            marginTop: 20,
        },
        spaceBelow: {
            marginBottom: 20,
        },
        subHeader: {
            fontFamily: colorSchema.typeFaceBold,
            fontWeight: null,
            marginVertical: 0,
        },
        subText: {
            marginVertical: 0,
        },
        subTextZeroMargin: {
            flexShrink: 1,
            marginVertical: 0,
        },
    };
};
