import { Platform, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface ContactInfoPhysicalAddressesStyleSchema extends StyleSheetSchema {
    address: ViewStyle;
    header: ViewStyle;
    horizontalRuleContainer: ViewStyle;
    linkToPortalContainer: ViewStyle;
    linkToPortalMenuItemRootContainer: ViewStyle;
    linkToPortalRootContainer: ViewStyle;
    linkToPortalSafeAreaViewWrapper: ViewStyle;
    linkToPortalText: ViewStyle;
    paragraph: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ContactInfoPhysicalAddressesStyleSchema => {
    return {
        address: {
            marginVertical: 20,
            paddingHorizontal: colorSchema.pages.layout.paddingHorizontal,
        },
        header: {
            marginBottom: 20,
            marginTop: 30,
            paddingHorizontal: colorSchema.pages.layout.paddingHorizontal,
        },
        horizontalRuleContainer: {
            marginBottom: Platform.select({ android: 10 }),
        },
        linkToPortalContainer: {
            alignItems: 'center',
            flex: null,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: -20,
        },
        linkToPortalMenuItemRootContainer: {
            marginVertical: 17,
        },
        linkToPortalRootContainer: {
            marginTop: 0,
            paddingBottom: 20,
            paddingHorizontal: 20,
        },
        linkToPortalSafeAreaViewWrapper: {
            flex: null,
        },
        linkToPortalText: {
            marginEnd: 4,
        },
        paragraph: {
            fontFamily: colorSchema.typeFaceParagraph,
            marginTop: 20,
            paddingBottom: 0,
        },
        rootContainer: {
            flex: 1,
            flexGrow: 1,
        },
    };
};
