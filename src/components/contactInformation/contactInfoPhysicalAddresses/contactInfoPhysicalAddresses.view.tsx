import Address from 'atlas-services/src/models/address';
import React from 'react';
import { SafeAreaView, ScrollView, View, } from 'react-native';
import { HorizontalRule } from '../..';
import { IconNames } from '../../../styles';
import { BodyCopy, H1, MenuItem, P } from '../../common';
import { MenuSectionHeader } from '../../common/menuPages';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { ContactInfoPhysicalAddressesStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: ContactInfoPhysicalAddressesView) => React.ReactNode;
    onPortalLinkPressed: noop;
    style?: Partial<ContactInfoPhysicalAddressesStyleSchema>;
}

export const defaultProps = {
    children: ({ Header, Heading, SubHeading, Addresses, LinkToPortal }: ContactInfoPhysicalAddressesView) => {
        return (
            <>
                <ScrollView>
                    <Header>
                        <Heading />
                        <SubHeading />
                    </Header>
                    <Addresses />
                    <LinkToPortal />
                </ScrollView>
            </>
        );
    },
};

export default class ContactInfoPhysicalAddressesView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ContactInfoPhysicalAddresses';
    public style: ContactInfoPhysicalAddressesStyleSchema;

    public Address = ({ addressHeading, address, notOnFile }) => {
        let displayAddress = notOnFile;

        if (address.streetAddress1) {
            const streetAddress2 = `${address.streetAddress2.trim() && '\n' + address.streetAddress2}`;
            const zipCode =
                address.zipCode.length > 5
                    ? address.zipCode.slice(0, 5) + '-' + address.zipCode.slice(5)
                    : address.zipCode;
            const cityStateZip = `\n${address.city} ${address.state}, ${zipCode}`;
            displayAddress = address.streetAddress1 + streetAddress2 + cityStateZip;
        }

        return (
            <>
                <MenuSectionHeader text={addressHeading} />
                <P style={{ paragraph: this.style.address }}>{displayAddress}</P>
            </>
        );
    };

    public Addresses = ({ children }: { children?: Children }) => {
        return (
            <View>
                <this.Address
                    addressHeading={this.labels.contactInformation.physicalAddresses.addresses.home.label}
                    address={this.appState.memberProfile.addresses.home}
                    notOnFile={this.labels.contactInformation.physicalAddresses.addresses.home.notOnFile}
                />
                <this.Address
                    addressHeading={this.labels.contactInformation.physicalAddresses.addresses.mailing.label}
                    address={this.appState.memberProfile.addresses.mailing}
                    notOnFile={this.labels.contactInformation.physicalAddresses.addresses.mailing.notOnFile}
                />
                {children || null}
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

    public Header = ({ children }: { children?: Children }) => {
        return <View style={this.style.header}>{children || null}</View>;
    };

    public Heading = () => <H1>{this.labels.contactInformation.physicalAddresses.header.heading}</H1>;

    public LinkToPortal = () => {
        return (
            <View style={this.style.linkToPortalRootContainer}>
                <MenuItem
                    iconRight={IconNames.EXTERNAL_LINK}
                    onPress={this.props.onPortalLinkPressed}
                    style={{
                        rootContainer: this.style.linkToPortalMenuItemRootContainer,
                        safeAreaViewWrapper: this.style.linkToPortalSafeAreaViewWrapper,
                        title: this.style.linkToPortalText,
                        titleContainer: this.style.linkToPortalContainer,
                    }}
                    title={this.labels.contactInformation.physicalAddresses.linkToPortal}
                />
                <HorizontalRule style={{ horizontalRule: this.style.horizontalRuleContainer }} />
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public SubHeading = () => {
        return (
            <BodyCopy style={{ bodyCopy: this.style.paragraph }}>
                {this.labels.contactInformation.physicalAddresses.header.subHeading}
            </BodyCopy>
        );
    };
}
