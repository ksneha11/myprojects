import React from 'react';
import { merge } from '../../../../utils';
import {
    default as ContactInfoAddAccountRecovery,
    defaultProps as parentDefaultProps,
    Props as ParentProps,
    State as ParentState,
} from '../../contactInfoAccountRecovery/contactInfoAddAccountRecovery/contactInfoAddAccountRecovery';
import { ContactInfoEditAccountRecoveryView, ViewProps } from './';

export interface State extends ParentState {
    bannerVisible: boolean;
}

interface Props extends ParentProps, Partial<ViewProps> {}

const defaultProps = merge(parentDefaultProps, {});

class ContactInfoEditAccountRecovery extends ContactInfoAddAccountRecovery {
    public static defaultProps = defaultProps;

    public render() {
        return (
            <ContactInfoEditAccountRecoveryView
                bannerVisible={this.state.bannerVisible}
                getErrorMessage={this.getErrorMessage}
                isConfirmationModalVisible={this.state.isConfirmationModalVisible}
                isContinueButtonDisabled={this.isContinueButtonDisabled}
                onPressCancel={this.onPressCancel}
                onPressContinue={this.onPressContinue}
                onPressOption={this.onPressOption}
                onFieldUpdate={this.onFieldUpdate}
                onPressConfirmationModalClose={this.onPressConfirmationModalClose}
                onPressConfirmationModalContinue={this.onPressConfirmationModalContinue}
                onPressDismissSuccessBanner={this.onPressDismissSuccessBanner}
                phoneNumber={this.state.phoneNumber}
                style={this.style}
                type={this.state.type}
                {...this.props}
            />
        );
    }
}

export default ContactInfoEditAccountRecovery;
