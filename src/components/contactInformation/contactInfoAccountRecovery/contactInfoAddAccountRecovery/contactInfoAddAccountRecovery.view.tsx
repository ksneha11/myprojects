import React from 'react';
import { ScreenLevelSuccess } from '../../../common';
import StyledComponent from '../../../styledComponent';
import AddRecoveryNumberView, {
    Props as ParentProps,
} from '../../../twoFactorAuthentication/addRecoveryNumber/addRecoveryNumber.view';

export interface Props extends ParentProps {
    bannerVisible: boolean;
    onPressDismissSuccessBanner: noop;
}

export default class ContactInfoAddAccountRecoveryView extends StyledComponent<Props> {
    public render() {
        return (
            <>
                <this.SuccessBanner />
                <AddRecoveryNumberView {...this.props}>
                    {({ Header, SubHeader, OptionContainer, InputContainer, ButtonContainer }) => {
                        const recoveryLabels = this.labels.contactInformation.accountRecoveryNumber;
                        return (
                            <>
                                <Header title={recoveryLabels.addAccountRecovery.screenTitle} />
                                <SubHeader subHeading={recoveryLabels.addAccountRecovery.subHeading} />
                                <OptionContainer
                                    radioLabel1={recoveryLabels.radioOptionText}
                                    radioLabel2={recoveryLabels.radioOptionVoice}
                                />
                                <InputContainer />
                                <ButtonContainer
                                    primaryButtonTitleText={recoveryLabels.saveButtonText}
                                    secondaryButtonTitleText={recoveryLabels.backButtonText}
                                />
                            </>
                        );
                    }}
                </AddRecoveryNumberView>
            </>
        );
    }

    public SuccessBanner = () => {
        return (
            <ScreenLevelSuccess
                isVisible={this.props.bannerVisible}
                message={this.labels.contactInformation.accountRecoveryNumber.successMessage}
                onDismissAlert={this.props.onPressDismissSuccessBanner}
            />
        );
    };
}
