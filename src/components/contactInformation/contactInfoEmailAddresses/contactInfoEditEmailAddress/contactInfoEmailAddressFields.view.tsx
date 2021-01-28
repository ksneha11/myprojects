import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { ScreenLevelSuccess } from '../../../common';
import ChangesNotSavedModal from '../../../common/changesNotSavedModal';
import { EmailAddress } from '../../../registration/emailAddress';
import StyledComponent, { StyleProps } from '../../../styledComponent';
import { ContactInfoEditEmailAddressStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    bannerVisible: boolean;
    children?: (parent: ContactInfoEditEmailAddressView) => React.ReactNode;
    confirmEmailLabel?: string;
    emailAddress?: string;
    emailAddressLabel?: string;
    emailAddressScreenTitle: string;
    emailAddressSubHeading?: string;
    isChangesNotSavedModalVisible: boolean;
    onPressCancel: noop;
    onPressCancelUnsavedChangesModal: noop;
    onPressContinueUnsavedChangesModal: noop;
    onPressDismissSuccessBanner: noop;
    onPressSubmit: noop;
    saveEnabled: boolean;
    setEmailInfo: (email: string, isValid: boolean) => void;
    style?: Partial<ContactInfoEditEmailAddressStyleSchema>;
    validateConfirmEmailOnMount?: boolean;
}

export const defaultProps = {
    children: ({ SuccessBanner, EmailAddressFields, props }: ContactInfoEditEmailAddressView) => {
        return (
            <>
                <SuccessBanner />
                <EmailAddressFields />
                <ChangesNotSavedModal
                    isVisible={props.isChangesNotSavedModalVisible}
                    onPressCancel={props.onPressCancelUnsavedChangesModal}
                    onPressContinue={props.onPressContinueUnsavedChangesModal}
                />
            </>
        );
    },
};

export default class ContactInfoEditEmailAddressView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ContactInfoEditEmailAddress';
    public style: ContactInfoEditEmailAddressStyleSchema;

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public EmailAddressFields = () => {
        const labels = this.labels.contactInformation.emailAddress.editEmailAddress;
        return (
            <EmailAddress
                emailAddressValue={this.props.emailAddress}
                emailAddressLabel={this.props.emailAddressLabel ?? labels.accountEmailAdress}
                confirmEmailAddressLabel={this.props.confirmEmailLabel ?? labels.confirmEmailAddress}
                emailAddressScreenTitleLabel={this.props.emailAddressScreenTitle}
                emailAddressSubHeading={this.props.emailAddressSubHeading ?? labels.subHeading}
                emailAddressPrimaryButtonLabel={labels.save}
                emailAddressSecondaryButtonLabel={labels.cancel}
                onPressCancel={this.props.onPressCancel}
                onChangeEmailAddress={this.props.setEmailInfo}
                onPressSubmit={this.props.onPressSubmit}
                saveEnabled={this.props.saveEnabled}
                style={{
                    emailField: this.style.emailField,
                    formFieldContainer: this.style.formFieldContainer,
                }}
                validateConfirmEmailOnMount={this.props.validateConfirmEmailOnMount}
            />
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public SuccessBanner = () => {
        return (
            <ScreenLevelSuccess
                isVisible={this.props.bannerVisible}
                message={this.labels.contactInformation.emailAddress.successMessage}
                onDismissAlert={this.props.onPressDismissSuccessBanner}
            />
        );
    };
}
