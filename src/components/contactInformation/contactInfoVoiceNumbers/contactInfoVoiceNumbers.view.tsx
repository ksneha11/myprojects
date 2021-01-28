import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { FeatureNames } from '../../../models/features';
import { IconNames } from '../../../styles';
import { formatPhoneNumber } from '../../../utils';
import { AddTextLink, BodyCopy, H1, MenuItem, TextLink } from '../../common';
import StyledComponent, { StyleProps } from '../../styledComponent';
import ContactInfoField from '../contactInfoField';
import { ProfileSectionHeader } from './';
import { ContactInfoVoiceNumbersStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: ContactInfoVoiceNumbersView) => React.ReactNode;
    formatPhoneNumber?: (phoneNumber: string) => string;
    getVoiceNumber: () => string;
    onPressAddPharmacyNumber: noop;
    onPressAddVoiceNumber: noop;
    onPressEditPharmacyNumber: noop;
    onPressEditVoiceNumber: noop;
    pharmacyNumber: string;
    style?: Partial<ContactInfoVoiceNumbersStyleSchema>;
}

export const defaultProps = {
    children: ({
        PharmacyNumber,
        PharmacySectionHeader,
        ScreenTitle,
        SectionHeader,
        SubHeading,
        TitleContainer,
        VoiceNumber,
    }: ContactInfoVoiceNumbersView) => {
        return (
            <>
                <TitleContainer>
                    <ScreenTitle />
                    <SubHeading />
                </TitleContainer>
                <SectionHeader />
                <VoiceNumber />
                <PharmacySectionHeader />
                <PharmacyNumber />
            </>
        );
    },
    formatPhoneNumber,
};

export default class ContactInfoVoiceNumbersView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ContactInfoVoiceNumbers';
    public style: ContactInfoVoiceNumbersStyleSchema;

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public PharmacyHeader = () => {
        return <ProfileSectionHeader text={this.labels.contactInfoVoiceNumbers.accountPharmacyNumber} />;
    };

    public PharmacyNumber = () => {
        let formattedPhoneNumber;
        const pharmacyNumber = this.props.pharmacyNumber;
        if (pharmacyNumber) {
            formattedPhoneNumber = this.props.formatPhoneNumber(pharmacyNumber);
        }

        return (
            this.PharmacyFeatureFlag() && (
                <View style={this.style.contactPhoneContainer}>
                    <ContactInfoField
                        field={formattedPhoneNumber || this.labels.contactInfoVoiceNumbers.addPharmacyVoiceNumber}
                        isAdd={!formattedPhoneNumber}
                        onPressAdd={this.props.onPressAddPharmacyNumber}
                        onPressEdit={this.props.onPressEditPharmacyNumber}
                    />
                </View>
            )
        );
    };

    public PharmacySectionHeader = () => {
        return (
            this.PharmacyFeatureFlag() && (
                <ProfileSectionHeader text={this.labels.contactInfoVoiceNumbers.voicePharmacyNumber} />
            )
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public ScreenTitle = () => (
        <H1 style={{ h1: this.style.title }}>{this.labels.contactInfoVoiceNumbers.screenTitle}</H1>
    );

    public SectionHeader = () => {
        return <ProfileSectionHeader text={this.labels.contactInfoVoiceNumbers.accountVoiceNumber} />;
    };

    public SectionLink = () => {
        return (
            <View style={this.style.addContainer}>
                {this.getIcon(IconNames.FORM_ADD_ITEM_ICON, {
                    style: this.style.iconLeft,
                })}

                <TextLink
                    accessibilityRole="button"
                    onPress={this.props.onPressAddVoiceNumber}
                    style={{ textLink: this.style.addVoiceNumberTextLink }}
                >
                    {this.labels.contactInfoVoiceNumbers.addAccountVoiceNumber}
                </TextLink>
            </View>
        );
    };

    public SubHeading = () => {
        return (
            <BodyCopy style={{ paragraph: this.style.paragraph }}>
                {this.labels.contactInfoVoiceNumbers.subHeading}
            </BodyCopy>
        );
    };

    public TitleContainer = ({ children }: { children?: Children }) => {
        return <View style={this.style.titleContainer}>{children || null}</View>;
    };

    public VoiceNumber = () => {
        let formattedPhoneNumber;
        const voiceNumber = this.props.getVoiceNumber();
        if (voiceNumber) {
            formattedPhoneNumber = this.props.formatPhoneNumber(voiceNumber);
        }

        return (
            <View style={this.style.contactPhoneContainer}>
                <ContactInfoField
                    field={formattedPhoneNumber || this.labels.contactInfoVoiceNumbers.addAccountVoiceNumber}
                    isAdd={!formattedPhoneNumber}
                    onPressAdd={this.props.onPressAddVoiceNumber}
                    onPressEdit={this.props.onPressEditVoiceNumber}
                />
            </View>
        );
    };

    protected PharmacyFeatureFlag = () => {
        return this.features.isRendered([FeatureNames.PHARMACY, FeatureNames.PHARMACY_PBM]);
    };
}
