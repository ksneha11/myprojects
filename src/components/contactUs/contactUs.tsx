import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { formatPhoneNumber } from '../../utils';
import { BodyCopy, EmailLink, H1, H5, PhoneLink } from '../common';
import StyledComponent, { StyleProps } from '../styledComponent';
import { ContactUsStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: ContactUsView) => React.ReactNode;
    formatPhoneNumber: (phoneNumber: string) => string;
    style?: Partial<ContactUsStyleSchema>;
}

export const defaultProps = {
    children: ({ HowToReach, Title }: ContactUsView) => {
        return (
            <>
                <Title />
                <HowToReach />
            </>
        );
    },
    formatPhoneNumber,
};

export default class ContactUsView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ContactUs';
    public style: ContactUsStyleSchema;

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public HowToReach = () => {
        const contactLabels = this.labels.contactUs.howToReach;
        return (
            <View>
                <BodyCopy>
                    {this.formatLabel(
                        contactLabels.emailPhone,
                        <EmailLink emailAddress={contactLabels.emailAddress}>{contactLabels.emailAddress}</EmailLink>,
                        <PhoneLink phoneNumber={contactLabels.phone}>
                            {this.props.formatPhoneNumber(contactLabels.phone)}
                        </PhoneLink>
                    )}
                </BodyCopy>
                <H5 style={{ h5: this.style.sectionHeader }}>{contactLabels.mailingAddress.title}</H5>
                <BodyCopy style={{ bodyCopy: this.style.address }}>{contactLabels.mailingAddress.content}</BodyCopy>
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public Title = () => {
        return <H1>{this.labels.contactUs.title}</H1>;
    };
}
