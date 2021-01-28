import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { H2, HorizontalRule, P } from '../..';
import { formatPhoneNumber } from '../../../utils';
import { PhoneLink, PrimaryButton } from '../../common';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { defaultStyle, SpecialtyPaperPrescriptionSchema } from './index';

export interface Props extends StyleProps {
    children?: (parent: SpecialtyPaperPrescriptionView) => React.ReactNode;
    enableNextButton: boolean;
    formatPhoneNumber?: (phoneNumber: string) => string;
    nextButtonPressed?: () => void;
    onPressPharmacySearch?: () => void;
    onRadioButtonSelection?: (index: number) => void;
    pbmPhoneNumber: string;
    selectedRadioButtonIndex: number;
    style?: Partial<SpecialtyPaperPrescriptionSchema>;
}

export const defaultProps = {
    children: ({
        EmailContainer,
        FindButton,
        HelpText,
        InstructionText,
        SectionDivider,
    }: SpecialtyPaperPrescriptionView) => {
        return (
            <>
                <InstructionText />
                <FindButton />
                <SectionDivider />
                <EmailContainer />
                <SectionDivider />
                <HelpText />
            </>
        );
    },
    formatPhoneNumber,
    pbmPhoneNumber: '',
};

export default class SpecialtyPaperPrescriptionView extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'SpecialtyPaperPrescription';
    public style: SpecialtyPaperPrescriptionSchema;

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public EmailContainer = () => {
        const labels = this.labels.pharmacy.specialtyPaperPrescription.emailContainer;
        return (
            <View style={this.style.emailContainer}>
                <P>{labels.title}</P>
                <H2 style={{ h2: this.style.emailAddress }}>{labels.subTitle}</H2>
            </View>
        );
    };

    public FindButton = () => {
        return (
            <View style={this.style.findButtonContainer}>
                <PrimaryButton
                    onPress={this.props.onPressPharmacySearch}
                    title={this.labels.pharmacy.specialtyPaperPrescription.findButton}
                />
            </View>
        );
    };

    // TODO:
    // this is used in multiple places
    // can pull out into its own component
    public HelpText = (): JSX.Element => {
        const labels = this.labels.pharmacy.specialtyPaperPrescription.helpText;
        return (
            <View style={this.style.helpText}>
                <H2>{labels.haveQuestions} </H2>
                <P>{labels.contactUs} </P>
                <PhoneLink isUnderlined phoneNumber={this.props.pbmPhoneNumber}>
                    {this.props.formatPhoneNumber(this.props.pbmPhoneNumber)}
                </PhoneLink>
            </View>
        );
    };

    public InstructionText = () => {
        return (
            <View style={this.style.instructionText}>
                <P>{this.labels.pharmacy.specialtyPaperPrescription.instructionText}</P>
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
}
