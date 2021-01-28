import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { H2, HorizontalRule, P } from '../..';
import { PrimaryButton, RadioButtonGroup, TextLink } from '../../common';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { defaultStyle, SpecialtyFirstFillSchema } from './index';

export interface Props extends StyleProps {
    children?: (parent: SpecialtyFirstFillView) => React.ReactNode;
    nextButtonClicked?: () => void;
    onCancelPress?: () => void;
    onRadioButtonSelection?: (index: number) => void;
    radioButtonSelectedStatus: boolean;
    selectedRadioButtonIndex: number;
    style?: Partial<SpecialtyFirstFillSchema>;
}

export const defaultProps = {
    children: ({
        SpecialtyOptionsTitle,
        RadioButtonContainer,
        NextAndCancelButtons,
        SectionDivider,
        HelpText,
    }: SpecialtyFirstFillView) => {
        return (
            <>
                <SpecialtyOptionsTitle />
                <RadioButtonContainer />
                <NextAndCancelButtons />
                <SectionDivider />
                <HelpText />
            </>
        );
    },
};

export default class SpecialtyFirstFillView extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'SpecialtyFirstFill';
    public style: SpecialtyFirstFillSchema;

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public HelpText = (): JSX.Element => {
        const labels = this.labels.pharmacy.specialtyFirstFill.helpText;
        return (
            <View style={this.style.helpText}>
                <H2>{labels.question} </H2>
                <P>{labels.contactUs} </P>
                <P style={{ paragraph: this.style.contactNumber }}>{labels.contactNumber}</P>
            </View>
        );
    };

    // TODO: rename this, will lose context in any app where text isn't next or cancel
    public NextAndCancelButtons = () => {
        const labels = this.labels.pharmacy.specialtyFirstFill.nextAndCancelButtons;
        return (
            <View style={this.style.buttonsContainer}>
                <PrimaryButton
                    isDisabled={this.props.radioButtonSelectedStatus}
                    onPress={this.props.nextButtonClicked}
                    title={labels.primaryButtonTitle}
                />
                <View style={this.style.cancelButton}>
                    <TextLink onPress={this.props.onCancelPress}>{labels.cancel}</TextLink>
                </View>
            </View>
        );
    };

    public RadioButtonContainer = () => {
        const labels = this.labels.pharmacy.specialtyFirstFill.radioButtonContainer;
        return (
            <View style={this.style.radioButtonContentContainer}>
                <RadioButtonGroup
                    activeIndex={this.props.selectedRadioButtonIndex}
                    onPress={this.props.onRadioButtonSelection}
                    radioButtonItems={[labels.paperPrescription, labels.noPaperPrescription]}
                />
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public SectionDivider = (): JSX.Element => {
        const style = this.style;
        return (
            <View style={style.divider}>
                <HorizontalRule />
            </View>
        );
    };

    public SpecialtyOptionsTitle = () => {
        return (
            <View style={this.style.radioButtonTitle}>
                <P>{this.labels.pharmacy.specialtyFirstFill.specialtyOptionsTitle}</P>
            </View>
        );
    };
}
