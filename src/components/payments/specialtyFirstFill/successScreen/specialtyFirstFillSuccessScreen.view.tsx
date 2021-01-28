import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { P, PageTitle, PrimaryButton, SecondaryButton } from '../../../common';
import StyledComponent, { StyleProps } from '../../../styledComponent';
import { defaultStyle, SpecialtyFirstFillSuccessScreenSchema } from './';

export interface Props extends StyleProps {
    children?: (parent: SpecialtyFirstFillSuccessScreenView) => React.ReactNode;
    onPressOk?: () => void;
    onPressSubmitAgain?: () => void;
    style?: Partial<SpecialtyFirstFillSuccessScreenSchema>;
}

export const defaultProps = {
    children: ({ ButtonContainer, TextContainer }: SpecialtyFirstFillSuccessScreenView) => {
        return (
            <>
                <TextContainer />
                <ButtonContainer />
            </>
        );
    },
};

export default class SpecialtyFirstFillSuccessScreenView extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'SpecialtyFirstFillSuccessScreen';
    public style: SpecialtyFirstFillSuccessScreenSchema;

    public ButtonContainer = () => {
        const labels = this.labels.pharmacy.specialtyFirstFillSuccessScreen.buttonContainer;
        return (
            <View style={this.style.contentMargin}>
                <PrimaryButton onPress={this.props.onPressOk} title={labels.primaryButtonTitle} />
                <View style={this.style.secondaryButton}>
                    <SecondaryButton onPress={this.props.onPressSubmitAgain} title={labels.secondaryButtonTitle} />
                </View>
            </View>
        );
    };

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public TextContainer = () => {
        const labels = this.labels.pharmacy.specialtyFirstFillSuccessScreen.textContainer;
        return (
            <View>
                <PageTitle text={labels.pageTitle} />
                <View style={this.style.contentMargin}>
                    <P>
                        {labels.weWillContactYourPrescriber}
                        {labels.weWillContactYou}
                    </P>
                </View>
            </View>
        );
    };
}
