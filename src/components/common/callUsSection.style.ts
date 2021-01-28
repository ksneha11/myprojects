import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface CallUsSectionStyleSchema extends StyleSheetSchema {
    contactUsContainer: ViewStyle;
    contactUsIcon: TextStyle;
    contactUsIconContainer: ViewStyle;
    contactUsPhoneContainer: ViewStyle;
    contactUsPhoneLink: TextStyle;
    contactUsPhoneText: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): CallUsSectionStyleSchema => ({
    contactUsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 30,
    },
    contactUsIcon: {
        color: colorSchema.pages.backgroundColor,
        fontSize: 30,
    },
    contactUsIconContainer: {
        backgroundColor: colorSchema.pages.formColors.actionButtons.backgroundColor,
        borderRadius: 20,
        elevation: 4,
        marginRight: 7,
        padding: 4,
        paddingBottom: 3,
        shadowColor: colorSchema.pages.formColors.formField.inputBorders,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    contactUsPhoneContainer: {
        flexDirection: 'row',
    },
    contactUsPhoneLink: {
        lineHeight: 18,
    },
    contactUsPhoneText: {
        fontSize: 14,
        lineHeight: 18,
        marginTop: null,
    },
    rootContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});
