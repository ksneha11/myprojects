import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ShippingOptionsStyleSchema extends StyleSheetSchema {
    costContainer: ViewStyle;
    footerContainer: ViewStyle;
    header: TextStyle;
    headerContainer: ViewStyle;
    horizontalLine: ViewStyle;
    methodContainer: ViewStyle;
    paragraph: TextStyle;
    radioButtonContentContainer: ViewStyle;
    rootContainer: ViewStyle;
    saveButtonContainer: ViewStyle;
    scrollContainer: ViewStyle;
    sectionContainer: ViewStyle;
    sectionInformationContainer: ViewStyle;
    titleContainer: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ShippingOptionsStyleSchema => {
    return {
        costContainer: {
            alignItems: 'flex-end',
            flex: 1,
            marginTop: 5,
        },
        footerContainer: {
            backgroundColor: colorSchema.modals.footerColor,
        },
        header: {},
        headerContainer: {
            marginBottom: 15,
            marginEnd: 20,
            marginStart: 15,
            marginTop: 10,
        },
        horizontalLine: {
            marginBottom: 25,
            marginHorizontal: 15,
            marginVertical: 0,
            width: '90%',
        },
        methodContainer: {
            flex: 1,
        },
        paragraph: {},
        radioButtonContentContainer: {
            flexDirection: 'row',
            marginBottom: 20,
            marginEnd: 40,
            marginStart: 15,
        },
        rootContainer: {
            flex: 1,
        },
        saveButtonContainer: {
            marginHorizontal: 15,
            marginVertical: 10,
        },
        scrollContainer: {
            backgroundColor: colorSchema.pages.backgroundColor,
            flexGrow: 1,
            justifyContent: 'space-between',
        },
        sectionContainer: {
            flexDirection: 'row',
        },
        sectionInformationContainer: {
            justifyContent: 'space-between',
            marginStart: 10,
        },
        titleContainer: {
            marginEnd: 30,
            marginStart: 15,
            marginTop: 20,
        },
    };
};
