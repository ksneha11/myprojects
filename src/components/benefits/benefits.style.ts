import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface BenefitsStyleSchema extends StyleSheetSchema {
    benefitsSection: ViewStyle;
    benefitsSectionContent: TextStyle;
    benefitsSectionHeader: TextStyle;
    contactUsContainer: ViewStyle;
    contentContainer: ViewStyle;
    headerContainer: ViewStyle;
    rootContainer: ViewStyle;
    subheader: TextStyle;
}

export default ({ colorSchema, windowWidth, hairlineWidth }: StyleSchemaParams): BenefitsStyleSchema => {
    return {
        benefitsSection: {
            marginTop: 20,
        },
        benefitsSectionContent: {
            marginBottom: 20,
            marginTop: 10,
        },
        benefitsSectionHeader: {
            color: colorSchema.pages.text.paragraph,
            fontFamily: colorSchema.typeFaceTitle,
        },
        contactUsContainer: {
            marginTop: 30,
        },
        contentContainer: {
            flex: 1,
            marginBottom: 20,
            marginHorizontal: colorSchema.pages.layout.paddingHorizontal,
        },
        headerContainer: {
            marginTop: 30
        },
        rootContainer: {
            flex: 1
        },
        subheader: {},
    };
};
