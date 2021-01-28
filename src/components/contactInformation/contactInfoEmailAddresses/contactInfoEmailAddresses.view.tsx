import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { BodyCopy, H1 } from '../../common';
import { MenuSectionHeader } from '../../common/menuPages';
import StyledComponent, { StyleProps } from '../../styledComponent';
import ContactInfoField from '../contactInfoField';
import { ContactInfoEmailAddressesStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: ContactInfoEmailAddressesView) => React.ReactNode;
    emailAddress?: string;
    onPressAddEmailAddress?: noop;
    onPressEditEmailAddress?: noop;
    style?: Partial<ContactInfoEmailAddressesStyleSchema>;
}

export const defaultProps = {
    children: ({
        TitleContainer,
        ScreenTitle,
        SubHeading,
        ContactEmail,
        labels,
        style,
    }: ContactInfoEmailAddressesView) => {
        return (
            <>
                <TitleContainer>
                    <ScreenTitle />
                    <SubHeading />
                </TitleContainer>
                <MenuSectionHeader
                    text={labels.contactInformation.emailAddress.accountEmailSectionHeader}
                    style={style}
                />
                <ContactEmail />
            </>
        );
    },
};

export default class ContactInfoEmailAddressesView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ContactInfoEmailAddresses';
    public style: ContactInfoEmailAddressesStyleSchema;

    public ContactEmail = () => {
        let emailAddress = this.props.emailAddress;
        // apparently if the user doesn't have an email address, the agg layer returns ' ' rather than ''
        if (emailAddress) {
            emailAddress = emailAddress.trim();
        }

        return (
            <>
                <View style={this.style.contactEmailContainer}>
                    <ContactInfoField
                        isAdd={!emailAddress}
                        field={emailAddress || this.labels.contactInformation.emailAddress.noAccountEmailAddressFound}
                        onPressAdd={this.props.onPressAddEmailAddress}
                        onPressEdit={this.props.onPressEditEmailAddress}
                    />
                </View>
            </>
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

    // TODO: Should be plural with pharmacy
    public ScreenTitle = () => <H1>{this.labels.emailAddress.screenTitle}</H1>;

    public SubHeading = () => {
        return <BodyCopy>{this.labels.contactInformation.emailAddress.subHeading}</BodyCopy>;
    };

    public TitleContainer = ({ children }: { children?: Children }) => {
        return <View style={this.style.emailTitleContainer}>{children || null}</View>;
    };
}
