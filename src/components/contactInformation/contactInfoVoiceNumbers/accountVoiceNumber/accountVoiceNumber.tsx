import { MemberPreferences } from 'atlas-services/src/models';
import { Preferences } from 'atlas-services/src/models/memberPreferences';
import { UPDATE_MEMBER_PREFERENCES } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { BackHandler, Keyboard } from 'react-native';
import { ProfileActions } from '../../../../context/navigation/actions';
import { isPhoneNumberInvalid } from '../../../../utils';
import { formatPhoneNumber } from '../../../../utils/inputFormatters';
import { inputPhoneNumberFormatter } from '../../../../utils/phoneNumberFormatter';
import AppComponent from '../../../common/appComponent';
import { default as AccountVoiceNumberView, Props as ViewProps } from './accountVoiceNumber.view';

export interface State {
    bannerVisible: boolean;
    hasUnsavedChanges: boolean;
    isChangesNotSavedModalVisible: boolean;
    originalVoiceNumber: string;
    voiceErrorText: string;
    voiceNumber: string;
}

interface Props extends Partial<ViewProps> {
    formatPhoneNumber?: (phoneNumber: string) => string;
    getVoiceNumber: () => string;
    inputPhoneNumberFormatter?: (phoneNumber: string) => string;
    isPhoneNumberInvalid?: (phoneNumber: string) => boolean;
    onChangeAccountVoiceNumber?: (voiceNumber: string, isVaild: boolean) => void;
    optIn?: boolean;
}

export const defaultProps = {
    formatPhoneNumber,
    inputPhoneNumberFormatter,
    isPhoneNumberInvalid,
};

export default class AccountVoiceNumber extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;
    constructor(props: any) {
        super(props);
        this.state = {
            bannerVisible: false,
            hasUnsavedChanges: false,
            isChangesNotSavedModalVisible: false,
            originalVoiceNumber: '',
            voiceErrorText: '',
            voiceNumber: '',
        };
    }

    public componentDidMount() {
        const voiceNumber = this.props.getVoiceNumber();
        this.setState({
            voiceNumber: this.props.formatPhoneNumber(voiceNumber),
        });
        BackHandler.addEventListener('hardwareBackPress', this.onPressCancel);
        this.setNavigationParams({ onPressBack: this.onPressCancel });
    }

    public componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onPressCancel);
        this.setNavigationParams({ onPressBack: null });
    }

    public render() {
        return (
            <AccountVoiceNumberView
                bannerVisible={this.state.bannerVisible}
                onPressCancel={this.onPressCancel}
                onPressSave={this.onPressSave}
                onChangeVoiceNumber={this.onChangeVoiceNumber}
                onNumberBlurText={this.onVoiceBlurText}
                voiceErrorText={this.state.voiceErrorText}
                isChangesNotSavedModalVisible={this.state.isChangesNotSavedModalVisible}
                isSaveDisabled={this.props.isPhoneNumberInvalid(this.state.voiceNumber)}
                onPressCancelUnsavedChangesModal={this.onPressCancelUnsavedChangesModal}
                onPressContinueUnsavedChangesModal={this.onPressContinueUnsavedChangesModal}
                onPressDismissSuccessBanner={this.onPressDismissSuccessBanner}
                voiceNumber={this.state.voiceNumber}
                {...this.props}
            />
        );
    }

    protected goBack = () => {
        this.navigate(ProfileActions.VOICE_NUMBERS_PRESSED);
    };

    protected onChangeVoiceNumber = (voiceNumber: string) => {
        const formattedVoiceNumber = this.props.inputPhoneNumberFormatter(voiceNumber);
        this.setState(
            {
                hasUnsavedChanges: true,
                voiceNumber: formattedVoiceNumber,
            },
            () => this.onChangeVoiceNumberCallback(voiceNumber)
        );
    };

    protected onChangeVoiceNumberCallback = (voiceNumber: string) => {
        if (this.props.onChangeAccountVoiceNumber) {
            this.props.onChangeAccountVoiceNumber(voiceNumber, this.state.hasUnsavedChanges);
        }
    };

    protected onPressCancel = () => {
        // Needs returns for Android back button to function properly
        if (this.state.hasUnsavedChanges && !this.state.voiceErrorText) {
            this.setState({ isChangesNotSavedModalVisible: true });
            return true;
        }
        this.navigate(ProfileActions.VOICE_NUMBERS_PRESSED);
        return false;
    };

    protected onPressCancelUnsavedChangesModal = () => {
        this.setState({ isChangesNotSavedModalVisible: false });
    };

    protected onPressContinueUnsavedChangesModal = () => {
        this.setState({ isChangesNotSavedModalVisible: false });
        this.goBack();
    };

    protected onPressDismissSuccessBanner = () => {
        this.setState({ bannerVisible: false });
    };

    protected onPressSave = () => {
        this.trackEvent({ name: 'ContactInfoEditVoiceNumbers' }, 'save');
        const voiceNumber = this.state.voiceNumber.replace(/\D/g, '');
        this.appContext
            .getServiceExecutor()
            .execute(UPDATE_MEMBER_PREFERENCES, {
                payload: {
                    gbdSettings: {
                        phoneNumber: voiceNumber,
                    },
                    optIn: this.props.optIn,
                },
            })
            .then(res => {
                this.setState({ hasUnsavedChanges: false, bannerVisible: true });
            });
        Keyboard.dismiss();
    };

    protected onVoiceBlurText = () => {
        const phoneInvalid = this.props.isPhoneNumberInvalid(this.state.voiceNumber);
        this.setState({
            voiceErrorText: phoneInvalid ? this.labels.profile.memberInformation.voiceNumber.voiceErrorText : '',
        });
    };
}
