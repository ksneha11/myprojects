import { AccountRecovery } from 'atlas-services/src/models/registrationData';
import { UPDATE_ACCOUNT_RECOVERY_NUMBER } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { ProfileActions } from '../../../../context/navigation/actions';
import { isPhoneNumberInvalid, merge } from '../../../../utils';
import { GlobalModalHandler } from '../../../globalModal/globalModal';
import {
    default as AddRecoveryNumber,
    defaultProps as parentDefaultProps,
    Props as ParentProps,
    State as ParentState,
} from '../../../twoFactorAuthentication/addRecoveryNumber/addRecoveryNumber';
import { ContactInfoAddAccountRecoveryView, ViewProps } from './';

export interface State extends ParentState {
    bannerVisible: boolean;
}
export interface Props extends ParentProps, Partial<ViewProps> {}

export const defaultProps = merge(parentDefaultProps, {});

class ContactInfoAddAccountRecovery extends AddRecoveryNumber<Props, State> {
    public static defaultProps = defaultProps;
    protected originalRecoveryNumber: AccountRecovery;

    constructor(props: Props) {
        super(props);
        this.originalRecoveryNumber = props.defaultAccountRecoveryNumber ?? { phoneNumber: '', phoneType: null };
        this.state = {
            bannerVisible: false,
            isConfirmationModalVisible: false,
            phoneNumber: props.defaultAccountRecoveryNumber.phoneNumber,
            type: props.defaultAccountRecoveryNumber.phoneType ?? null,
        };
    }

    public render() {
        return (
            <ContactInfoAddAccountRecoveryView
                bannerVisible={this.state.bannerVisible}
                getErrorMessage={this.getErrorMessage}
                isConfirmationModalVisible={this.state.isConfirmationModalVisible}
                isContinueButtonDisabled={this.isContinueButtonDisabled}
                isEmbeddedView={this.props.isEmbeddedView}
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

    protected globalModalSetup = () => {
        const modalLabels = this.labels.changesNotSavedModal;
        GlobalModalHandler.show({
            bodyText: modalLabels.body,
            onPressPrimaryButton: () => {
                this.navigate(ProfileActions.ACCOUNT_RECOVERY_NUMBER_PRESSED);
                GlobalModalHandler.hide();
            },
            onPressSecondaryButton: () => GlobalModalHandler.hide(),
            primaryButtonTitle: modalLabels.buttonContainer.primaryButtonTitle,
            secondaryButtonTitle: modalLabels.buttonContainer.secondaryButtonTitle,
            title: modalLabels.title,
        });
    };

    protected goBack = () => {
        this.navigate(ProfileActions.ACCOUNT_RECOVERY_NUMBER_PRESSED);
    };

    protected isChangeUnsaved = () => {
        return (
            this.state.phoneNumber !== this.originalRecoveryNumber.phoneNumber ||
            this.state.type !== this.originalRecoveryNumber.phoneType
        );
    };

    protected isContinueButtonDisabled = () => {
        return (
            !this.state.type ||
            !this.state.phoneNumber ||
            isPhoneNumberInvalid(this.state.phoneNumber) ||
            (this.state.type === this.originalRecoveryNumber.phoneType &&
                this.state.phoneNumber === this.originalRecoveryNumber.phoneNumber)
        );
    };

    protected onPressCancel = () => {
        if (this.isChangeUnsaved()) {
            this.globalModalSetup();
        } else {
            this.navigate(ProfileActions.ACCOUNT_RECOVERY_NUMBER_PRESSED);
        }
    };

    protected onPressContinue = async () => {
        const payload = { phoneNumber: this.state.phoneNumber, phoneType: this.state.type };
        await this.appContext
            .getServiceExecutor()
            .execute(UPDATE_ACCOUNT_RECOVERY_NUMBER, {
                payload,
            })
            .then(res => {
                this.originalRecoveryNumber = payload;
                this.setState({ bannerVisible: true });
            });
    };

    protected onPressDismissSuccessBanner = () => {
        this.setState({ bannerVisible: false });
    };
}

export default ContactInfoAddAccountRecovery;
