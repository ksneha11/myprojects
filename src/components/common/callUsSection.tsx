import React from 'react';
import { Linking, Platform, View } from 'react-native';
import { BodyCopy, H5, PhoneLink } from '.';
import IconNames from '../../styles/iconNames';
import { formatPhoneNumber } from '../../utils';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { CallUsSectionStyleSchema } from './callUsSection.style';

interface Props extends StyleProps {
    children?: (parent: CallUsSection) => React.ReactNode;
    content?: string;
    formatPhoneNumber?: (phoneNumber: string) => string;
    icon?: IconNames;
    phoneNumber?: string;
    style?: Partial<CallUsSectionStyleSchema>;
    title?: string;
}

const defaultProps = {
    children: ({ Icon, PhoneNumber, props, Title }: CallUsSection) => {
        return (
            <>
                <Icon />
                <View>
                    <Title title={props.title} />
                    <PhoneNumber content={props.content} phoneNumber={props.phoneNumber} />
                </View>
            </>
        );
    },
    formatPhoneNumber,
    icon: IconNames.BENEFITS_CONTACT_US,
};

export default class CallUsSection extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'CallUsSection';
    public style: CallUsSectionStyleSchema;

    public Icon = () => {
        return (
            <View style={this.style.contactUsIconContainer}>
                {this.getIcon(this.props.icon, { onPress: this.onPressIcon, style: this.style.contactUsIcon })}
            </View>
        );
    };

    public PhoneNumber = ({
        content = this.labels.callUsSection.tty,
        phoneNumber = this.labels.callUsSection.memberServicesNumber,
    }: {
        content?: string;
        phoneNumber: string;
    }) => {
        return (
            <View style={this.style.contactUsPhoneContainer}>
                <PhoneLink style={{ textLink: this.style.contactUsPhoneLink }}>
                    {this.props.formatPhoneNumber(phoneNumber)}
                </PhoneLink>
                <BodyCopy style={{ bodyCopy: this.style.contactUsPhoneText }}> {content}</BodyCopy>
            </View>
        );
    };

    public render() {
        return <View style={this.style.rootContainer}>{this.props.children(this)}</View>;
    }

    public Title = ({ title = this.labels.callUsSection.title }: { title?: string }) => {
        return <H5>{title}</H5>;
    };

    protected onPressIcon = () => {
        const url = `${Platform.OS === 'ios' ? 'telprompt:' : 'tel:'}${this.props.phoneNumber}`;
        Linking.openURL(url).catch(error => this.logger.warn(error));
    };
}
