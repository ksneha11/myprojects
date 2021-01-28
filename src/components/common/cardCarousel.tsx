import React from 'react';
import { Dimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { TextLink } from '..';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { CardCarouselStyleSchema } from './cardCarousel.style';

const WINDOW_WIDTH = Dimensions.get('window').width;

export interface State {
    activeIndex: number;
}

export interface Props extends StyleProps {
    activeSlideAlignment?: string;
    applyInactivePaginationStyle?: boolean;
    footerTextLeft?: string[];
    footerTextRight?: string[];
    inactiveSlideOpacity?: number;
    inactiveSlideScale?: number;
    items: any[];
    lastIndexAction?: () => void;
    showPagination: boolean;
    sliderWidth?: number;
    slideWidth?: number;
}

const defaultProps: Partial<Props> = {
    activeSlideAlignment: 'center',
    applyInactivePaginationStyle: false,
    inactiveSlideOpacity: 1,
    inactiveSlideScale: 0.95,
    showPagination: true,
    slideWidth: WINDOW_WIDTH * 0.9,
    sliderWidth: WINDOW_WIDTH,
};

export default class CardCarousel extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public readonly defaultStyle = defaultStyle;
    public readonly name = 'CardCarousel';
    public style: CardCarouselStyleSchema;

    protected carouselReference = null;

    public constructor(props: Props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };
    }

    public Carousel = () => {
        return (
            <Carousel
                activeSlideAlignment={this.props.activeSlideAlignment}
                data={this.props.items}
                inactiveSlideOpacity={this.props.inactiveSlideOpacity}
                inactiveSlideScale={this.props.inactiveSlideScale}
                itemWidth={this.props.slideWidth}
                onSnapToItem={activeIndex => this.setState({ activeIndex })}
                ref={reference => {
                    this.carouselReference = reference;
                }}
                renderItem={({ item }) => item}
                sliderWidth={this.props.sliderWidth}
            />
        );
    };

    public Footer = () => {
        const footerTextLeft = this.props.footerTextLeft && this.props.footerTextLeft[this.state.activeIndex];
        const footerTextRight = this.props.footerTextRight && this.props.footerTextRight[this.state.activeIndex];
        return (
            <View style={this.style.footerContainer}>
                <View style={this.style.footerTextLeftContainer}>
                    {footerTextLeft && (
                        <TextLink onPress={this.onPressFooterTextLeft} style={{ textLink: this.style.footerText }}>
                            {footerTextLeft}
                        </TextLink>
                    )}
                </View>
                <View style={this.style.footerPaginationContainer}>
                    {this.props.showPagination && <this.Pagination />}
                </View>
                <View style={this.style.footerTextRightContainer}>
                    {footerTextRight && (
                        <TextLink onPress={this.onPressFooterTextRight} style={{ textLink: this.style.footerText }}>
                            {footerTextRight}
                        </TextLink>
                    )}
                </View>
            </View>
        );
    };

    public Pagination = () => {
        return (
            <Pagination
                activeDotIndex={this.state.activeIndex}
                containerStyle={this.style.paginationContainer}
                dotColor={this.style.activeDotColor.color}
                dotsLength={this.props.items.length}
                dotContainerStyle={this.style.paginationDotContainer}
                dotStyle={this.style.paginationDot}
                inactiveDotColor={this.style.inactiveDotColor.color}
                inactiveDotColorBorder={this.style.inactiveDotColorBorder.color}
                inactiveDotScale={1}
                inactiveDotStyle={this.props.applyInactivePaginationStyle ? this.style.paginationInactiveDotStyle : {}}
            />
        );
    };

    public render() {
        return (
            <View style={this.style.rootContainer}>
                <View style={this.style.carouselContentContainer}>
                    <this.Carousel />
                </View>
                <View>
                    <this.Footer />
                </View>
            </View>
        );
    }

    protected onPressFooterTextLeft = () => {
        const previousIndex = this.state.activeIndex - 1;
        if (previousIndex >= 0) {
            this.setState({
                activeIndex: previousIndex,
            });
            this.carouselReference.snapToItem(previousIndex, true, true);
        }
    };

    protected onPressFooterTextRight = () => {
        const nextIndex = this.state.activeIndex + 1;
        if (nextIndex < this.props.items.length) {
            this.setState({
                activeIndex: nextIndex,
            });
            this.carouselReference.snapToItem(nextIndex, true, true);
        } else if (nextIndex === this.props.items.length) {
            this.props.lastIndexAction();
        }
    };
}
