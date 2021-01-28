import { StyleSchemaParams, StyleSheetSchema } from '../../styles';
// tslint:disable-next-line: ordered-imports
import { ViewStyle, TextStyle } from 'react-native';
import { CardStyleSchema } from './card.style';
export interface PrescriptionPricingCardStyleSchema extends Partial<CardStyleSchema> {
    drugNameText: TextStyle;
    employerCostDisclaimerCopy: TextStyle;
    footerCardContentContainer: ViewStyle;
    footerContainer: ViewStyle;
    iconStyle: TextStyle;
    mainCardContentContainer: ViewStyle;
    memberCostContainer: ViewStyle;
    memberCostText: TextStyle;
    prescriptionLinkContainer: ViewStyle;
    prescriptionLinksSeperator: TextStyle;
    sectionText: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): PrescriptionPricingCardStyleSchema => {
    return {
        drugNameText: {
            marginBottom: 20,
        },
        employerCostDisclaimerCopy: {
            marginLeft: 5,
            marginTop: 10,
        },
        footerCardContentContainer: {
            flex: 1,
            marginHorizontal: 15,
            marginVertical: 10,
        },
        footerContainer: {
            height: 'auto',
            // Had to Remove the padding/margin applied by the footerContainer in Card
            marginTop: 0,
            paddingEnd: 0,
        },
        iconContainer: {
            marginStart: 5,
            paddingTop: 2,
        },
        iconStyle: {},
        mainCardContentContainer: {
            flex: 1,
            marginBottom: 5,
            marginStart: 17,
            marginTop: 15,
        },
        memberCostContainer: {
            flexDirection: 'row',
        },
        memberCostText: {},
        prescriptionLinkContainer: {
            flexDirection: 'row',
            marginVertical: 15,
        },
        prescriptionLinksSeperator: {
            marginHorizontal: 13,
        },
        sectionText: {},
    };
};
