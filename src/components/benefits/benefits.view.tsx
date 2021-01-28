import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { HorizontalRule } from '..';
import { FeatureNames } from '../../models';
import { BodyCopy, CallUsSection, H1, P, TextLink } from '../common';
import GradientHeader from '../common/gradientHeader';
import StyledComponent, { StyleProps } from '../styledComponent';
import { BenefitsStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: BenefitsView) => React.ReactNode;
    onPressBenefitsWebview: (url: string) => void;
    style?: Partial<BenefitsStyleSchema>;
    title?: (style: BenefitsStyleSchema) => JSX.Element;
}

export const defaultProps = {
    children: ({
        ContactUs,
        DentalCare,
        HeaderSection,
        MedicalCare,
        PharmacyCare,
        style,
        TitleContainer,
        VisionCare,
    }: BenefitsView) => {
        return (
            <>
                <TitleContainer />
                <ScrollView showsVerticalScrollIndicator={false} style={style.contentContainer}>
                    <HeaderSection />
                    <MedicalCare />
                    <PharmacyCare />
                    <DentalCare />
                    <VisionCare />
                    <ContactUs />
                </ScrollView>
            </>
        );
    },
};

export default class BenefitsView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'Benefits';
    public style: BenefitsStyleSchema;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    public BenefitsSection = ({ content, title }: { content: string; title: string }) => {
        return (
            <View style={this.style.benefitsSection}>
                <P style={{ paragraph: this.style.benefitsSectionHeader }}>{title}</P>
                <BodyCopy style={{ bodyCopy: this.style.benefitsSectionContent }}>{content}</BodyCopy>
                <HorizontalRule />
            </View>
        );
    };

    public ContactUs = () => {
        return (
            <View style={this.style.contactUsContainer}>
                <CallUsSection phoneNumber={this.labels.benefits.callUsSection.memberServicesNumber} />
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

    public DentalCare = () => {
        const dentalCareLabels = this.labels.benefits.dentalCare;
        return (
            <>
                {this.features.isRendered(FeatureNames.BENEFITS_DENTAL_CARE) && (
                    <this.BenefitsSection content={dentalCareLabels.content} title={dentalCareLabels.title} />
                )}
            </>
        );
    };

    public HeaderSection = ({
        subheader = this.labels.benefits.headerSection.subheader,
        subheaderLink = this.labels.benefits.headerSection.subheaderLink,
        subheaderLinkText = this.labels.benefits.headerSection.subheaderLinkText,
        header = this.labels.benefits.headerSection.header,
    }: {
            header?: string;
            subheader?: string;
            subheaderLink?: string;
            subheaderLinkText?: string;
        }) => {
        return (
            <View style={this.style.headerContainer}>
                <H1>{header}</H1>
                <BodyCopy>
                    {this.formatLabel(
                        subheader,
                        <TextLink
                            onPress={() => this.props.onPressBenefitsWebview(subheaderLink)}
                            style={{ textLink: this.style.subheader }}
                        >
                            {subheaderLinkText}
                        </TextLink>
                    )}
                </BodyCopy>
            </View>
        );
    };

    public MedicalCare = () => {
        const medicalCareLabels = this.labels.benefits.medicalCare;
        return (
            <>
                {this.features.isRendered(FeatureNames.BENEFITS_MEDICAL_CARE) && (
                    <this.BenefitsSection content={medicalCareLabels.content} title={medicalCareLabels.title} />
                )}
            </>
        );
    };

    public PharmacyCare = () => {
        const pharmacyLabels = this.labels.benefits.pharmacyCare;
        return (
            <>
                {this.features.isRendered(FeatureNames.BENEFITS_PHARMACY) && (
                    <this.BenefitsSection content={pharmacyLabels.content} title={pharmacyLabels.title} />
                )}
            </>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public TitleContainer = () => {
        return <GradientHeader title={this.labels.benefits.titleContainer.title} />;
    };

    public VisionCare = () => {
        const visionLabels = this.labels.benefits.visionCare;
        return (
            <>
                {this.features.isRendered(FeatureNames.BENEFITS_VISION) && (
                    <this.BenefitsSection content={visionLabels.content} title={visionLabels.title} />
                )}
            </>
        );
    };
}
