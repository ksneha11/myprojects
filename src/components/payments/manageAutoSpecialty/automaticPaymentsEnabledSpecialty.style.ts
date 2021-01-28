import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface AutomaticPaymentsEnabledSpecialtyStyleSchema extends StyleSheetSchema {
    autoPaymentTitle: TextStyle;
    dividerContainer: ViewStyle;
    enrollmentInfoContainer: ViewStyle;
    enrollmentRecapContainer: ViewStyle;
    expirationDate: TextStyle;
    headerText: TextStyle;
    iconTextLink: TextStyle;
    infoContainer: ViewStyle;
    memberInfoContainer: ViewStyle;
    paymentDate: TextStyle;
    paymentMethod: TextStyle;
    rootContainer: ViewStyle;
    setUpAdditionalMembersTextLink: TextStyle;
    setUpAdditionalMembersTextLinkContainer: ViewStyle;
    setUpAdditionalMembersTextLinkIcon: TextStyle;
    successHeader: TextStyle;
}

export default ({
    colorSchema,
    hairlineWidth,
    windowWidth,
}: StyleSchemaParams): AutomaticPaymentsEnabledSpecialtyStyleSchema => ({
    autoPaymentTitle: {
        marginBottom: 15,
    },
    dividerContainer: {},
    enrollmentInfoContainer: {
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    enrollmentRecapContainer: {
        marginBottom: 25,
    },
    expirationDate: {
        marginBottom: 15,
    },
    headerText: {},
    iconTextLink: {
        color: colorSchema.pages.formColors.links,
    },
    infoContainer: {
        marginVertical: 25,
    },
    memberInfoContainer: {
        marginBottom: 15,
        marginHorizontal: 5,
        marginTop: 15,
    },
    paymentDate: {
        marginBottom: 25,
    },
    paymentMethod: {},
    rootContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    setUpAdditionalMembersTextLink: {
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '90%',
    },
    setUpAdditionalMembersTextLinkContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    setUpAdditionalMembersTextLinkIcon: {
        color: colorSchema.pages.formColors.links,
    },
    successHeader: {
        marginBottom: 10,
    },
});
