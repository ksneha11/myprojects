import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { P, PrimaryButton } from '..';
import StyledComponent, { GradientProps } from '../styledComponent';
import defaultStyle, { GradientAdvertisementStyleSchema } from './gradientAdvertisement.style';

export interface Props extends GradientProps {
    advertisementText?: string;
    angle?: number;
    buttonText?: string;
    colors: string[];
    onButtonPress?: noop;
    style?: Partial<GradientAdvertisementStyleSchema>;
}

export const defaultProps = {};

export default class GradientAdvertisement extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'GradientAdvertisement';
    public style: GradientAdvertisementStyleSchema;

    public render() {
        return (
            <View>
                <LinearGradient
                    angle={this.props.angle}
                    colors={this.props.colors}
                    style={this.style.rootContainer}
                    useAngle={!!this.props.angle}
                >
                    <P style={{ paragraph: this.style.contentText }}>{this.props.advertisementText}</P>
                    <>
                        {this.props.buttonText && (
                            <PrimaryButton
                                onPress={this.props.onButtonPress}
                                style={{ button: this.style.button, text: this.style.buttonText }}
                                title={this.props.buttonText}
                            />
                        )}
                    </>
                </LinearGradient>
            </View>
        );
    }
}
