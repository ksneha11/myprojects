import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { H1 } from '..';
import { setAccessibilityFocus } from '../../utils';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { GradientHeaderStyleSchema } from './gradientHeader.style';

interface GradientCoordinate {
    x: number;
    y: number;
}

interface Props extends StyleProps {
    children?: React.ReactNode;
    gradientColors?: string[];
    gradientEnd?: GradientCoordinate;
    gradientStart?: GradientCoordinate;
    setAccessibilityFocus?: boolean;
    style?: Partial<GradientHeaderStyleSchema>;
    title?: string;
}

const defaultProps = {
    gradientEnd: { x: 1, y: 0 },
    gradientStart: { x: 0, y: 0 },
    setAccessibilityFocus: true,
};

export default class GradientHeader extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public linearGradientRef;
    public name = 'GradientHeader';
    public style: GradientHeaderStyleSchema;
    protected hasRecievedFocus: boolean = false;

    public componentDidMount() {
        this.setAccessibilityFocus();
    }

    public render() {
        return (
            <>
                <View ref={ref => (this.linearGradientRef = ref)} style={this.style.shadowContainer}>
                    <LinearGradient
                        colors={this.getGradientColors()}
                        end={this.props.gradientEnd}
                        start={this.props.gradientStart}
                        style={this.style.rootContainer}
                    >
                        {this.props.title && <H1 style={{ h1: this.style.title }}>{this.props.title}</H1>}
                        {this.props.children}
                    </LinearGradient>
                </View>
            </>
        );
    }

    protected getGradientColors = () => {
        const gradientColors = this.appContext.colorSchema.pages.bannerHeading;
        return this.props.gradientColors || [gradientColors.gradientStart, gradientColors.gradientEnd];
    };

    protected setAccessibilityFocus = () => {
        if (this.linearGradientRef && !this.hasRecievedFocus) {
            setAccessibilityFocus(this.linearGradientRef);
            this.hasRecievedFocus = true;
        }
    };
}
