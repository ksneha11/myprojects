import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ChangePaymentMethodsStyleSchema extends StyleSheetSchema {
    addPaymentText: TextStyle;
    addPaymentTextLink: ViewStyle;
    cardListContainer: ViewStyle;
    cardTitle: TextStyle;
    disabledText: TextStyle;
    dropDownContainer: ViewStyle;
    dropDownIcon: ViewStyle;
    dropDownTitle: TextStyle;
    dropDownTitleContainer: ViewStyle;
    formViewButtonContainer: ViewStyle;
    listSeparator: ViewStyle;
    needChangesContainer: ViewStyle;
    needChangesIcon: TextStyle;
    needChangesOverlayAddNew: TextStyle;
    needChangesOverlayPhone: TextStyle;
    needChangesOverlayText: TextStyle;
    needChangesText: TextStyle;
    pageTitleContainer: ViewStyle;
    subheaderContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ChangePaymentMethodsStyleSchema => {
    return {
        addPaymentText: {
            marginLeft: 10,
            marginTop: 2,
        },
        addPaymentTextLink: {
            alignContent: 'center',
            alignSelf: 'flex-start',
            flexDirection: 'row',
            marginBottom: 12,
            marginLeft: 36,
            marginTop: 20,
        },
        cardListContainer: {
            marginHorizontal: 15,
        },
        cardTitle: {
            marginStart: 15,
        },
        disabledText: {
            color: colorSchema.pages.text.disabled,
        },
        dropDownContainer: {
            marginBottom: 20,
            marginHorizontal: 16,
        },
        dropDownIcon: {
            borderLeftColor: 'transparent',
            borderLeftWidth: 0,
        },
        dropDownTitle: {
            marginBottom: 10,
            marginLeft: 10,
        },
        dropDownTitleContainer: {
            marginBottom: 10,
        },
        formViewButtonContainer: {
            width: '90%',
        },
        listSeparator: {
            marginVertical: 20,
        },
        needChangesContainer: {
            marginBottom: 35,
            marginStart: 25,
            marginTop: 15,
        },
        needChangesIcon: {
            marginTop: 5,
        },
        needChangesOverlayAddNew: {},
        needChangesOverlayPhone: {
            color: colorSchema.modals.secondaryText,
        },
        needChangesOverlayText: {},
        needChangesText: {
            alignSelf: 'flex-start',
            color: colorSchema.pages.formColors.links,
            marginLeft: 10,
            marginRight: 8,
        },
        pageTitleContainer: {},
        rootContainer: {
            flex: 1,
        },
        subheaderContainer: {
            marginHorizontal: 20,
        },
    };
};
