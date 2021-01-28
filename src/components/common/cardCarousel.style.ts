import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface CardCarouselStyleSchema extends StyleSheetSchema {
    activeDotColor: TextStyle;
    carouselContentContainer: ViewStyle;
    footerContainer: ViewStyle;
    footerPaginationContainer: ViewStyle;
    footerText: TextStyle;
    footerTextLeftContainer: ViewStyle;
    footerTextRightContainer: ViewStyle;
    inactiveDotColor: TextStyle;
    inactiveDotColorBorder: TextStyle;
    paginationContainer: ViewStyle;
    paginationDot: ViewStyle;
    paginationDotContainer: ViewStyle;
    paginationInactiveDotStyle: TextStyle;
    rootContainer: ViewStyle;
}
export default (styleParams: StyleSchemaParams): CardCarouselStyleSchema => {
    return {
        activeDotColor: {
            color: styleParams.colorSchema.carousel.pagination.dotColor,
        },
        carouselContentContainer: {},
        footerContainer: {
            flexDirection: 'row',
        },
        footerPaginationContainer: {
            alignItems: 'center',
            flex: 1,
        },
        footerText: {},
        footerTextLeftContainer: {
            alignItems: 'flex-start',
            flex: 1,
        },
        footerTextRightContainer: {
            alignItems: 'flex-end',
            flex: 1,
        },
        inactiveDotColor: {
            color: styleParams.colorSchema.carousel.pagination.inactiveDotColor,
        },
        inactiveDotColorBorder: {
            color: styleParams.colorSchema.carousel.pagination.inactiveDotColorBorder,
        },
        paginationContainer: {
            paddingVertical: 15,
        },
        paginationDot: {
            borderRadius: 10,
            height: 10,
            width: 10,
        },
        paginationDotContainer: {
            marginHorizontal: 5,
        },
        paginationInactiveDotStyle: {
            borderColor: styleParams.colorSchema.carousel.pagination.inactiveDotColorBorder,
            borderWidth: 1,
        },
        rootContainer: {
            flex: 0,
        },
    };
};
