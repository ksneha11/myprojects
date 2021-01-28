import { AccountRecoveryNumber } from 'atlas-services/src/models';
import { OtpSubType } from 'atlas-services/src/models/otpSubType';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { inputPhoneNumberFormatter } from '../../../utils';
import { BodyCopy, H1 } from '../../common';
import { MenuSectionHeader } from '../../common/menuPages';
import StyledComponent, { StyleProps } from '../../styledComponent';
import ContactInfoField from '../contactInfoField';
import { ContactInfoAccountRecoveryStyleSchema, defaultStyle } from './';

export interface Props extends StyleProps {
    accountRecoveryNumber: AccountRecoveryNumber;
    children?: (parent: ContactInfoAccountRecoveryView) => React.ReactNode;
    onPressAddAccountRecovery: noop;
    onPressEditAccountRecovery: noop;
    style?: Partial<ContactInfoAccountRecoveryStyleSchema>;
}

export const defaultProps = {
    children: ({
        MenuSectionHeaderText,
        TitleContainer,
        ScreenTitle,
        SubHeading,
        RecoveryNumber,
        labels,
        props,
        style,
    }: ContactInfoAccountRecoveryView) => {
        return (
            <>
                <TitleContainer>
                    <ScreenTitle />
                    <SubHeading />
                </TitleContainer>
                <MenuSectionHeaderText />
                <RecoveryNumber />
            </>
        );
    },
};

export default class ContactInfoAccountRecoveryView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ContactInfoAccountRecovery';
    public style: ContactInfoAccountRecoveryStyleSchema;

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public MenuSectionHeaderText = () => {
        const { accountRecoveryNumber } = this.props;
        let text = '';
        if (accountRecoveryNumber.phoneNumber) {
            const phoneType = this.props.accountRecoveryNumber.phoneType;
            const sectionLabel = this.labels.contactInformation.accountRecoveryNumber;
            text = phoneType === OtpSubType.VOICE ? sectionLabel.sectionHeaderVoice : sectionLabel.sectionHeaderText;
        } else {
            text = this.labels.contactInformation.accountRecoveryNumber.sectionHeader;
        }

        return <MenuSectionHeader text={text} style={this.style} />;
    };

    public RecoveryNumber = () => {
        const { accountRecoveryNumber } = this.props;
        const phoneNumber = accountRecoveryNumber ? accountRecoveryNumber.phoneNumber : null;
     
        return (
            <>
                <View style={this.style.contactNumberContainer}>
                    <ContactInfoField
                        isAdd={!accountRecoveryNumber || !accountRecoveryNumber.phoneNumber}
                        field={
                            inputPhoneNumberFormatter(phoneNumber) ||
                            this.labels.contactInformation.accountRecoveryNumber.noNumberFound
                        }
                        onPressAdd={this.props.onPressAddAccountRecovery}
                        onPressEdit={this.props.onPressEditAccountRecovery}
                    />
                </View>
            </>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public ScreenTitle = () => <H1>{this.labels.contactInformation.accountRecoveryNumber.screenTitle}</H1>;

    public SubHeading = () => {
        return <BodyCopy>{this.labels.contactInformation.accountRecoveryNumber.subHeading}</BodyCopy>;
    };

    public TitleContainer = ({ children }: { children?: Children }) => {
        return <View style={this.style.accountRecoveryTitleContainer}>{children || null}</View>;
    };
}
