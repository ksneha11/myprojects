import { UPDATE_MEMBER_PREFERENCES } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { Keyboard } from 'react-native';
import { isPhoneNumberInvalid } from '../../../../utils';
import { BottomDrawerHandler } from '../../../bottomDrawer/bottomDrawerHandler';
import AppComponent from '../../../common/appComponent';
import { PharmacyVoiceNumberView, ViewProps } from './';

export interface Props extends Partial<ViewProps> {
    children: (PharmacyVoiceNumberView: PharmacyVoiceNumberView) => React.ReactNode;
    onPharmacyPhoneSaveSuccess: noop;
    onPharmacyVoiceNumberSaveSuccess: noop;
    onPressCancel?: noop;
    onPressSave?: noop;
}

export interface State {
    changesNotSavedModalVisible: boolean;
    hasUnsavedChanges: boolean;
    isVoiceInputValid: boolean;
    voiceInput: string;
}

const defaultProps: Partial<Props> = {};

export default class PharmacyVoiceNumber<P extends Props = Props, S extends State = State> extends AppComponent<P, S> {
    public static defaultProps = defaultProps;

    constructor(props: P) {
        super(props);
        this.state = {
            changesNotSavedModalVisible: false,
            hasUnsavedChanges: false,
            isVoiceInputValid: false,
            voiceInput: props.voiceInput ?? '',
        } as S;
    }

    public componentDidMount() {
        BottomDrawerHandler.setShouldClose(
            () => {
                return !this.isChangeUnsaved();
            },
            () => this.setState({ changesNotSavedModalVisible: true })
        );
    }

    public numbersOnly = (string: string) => {
        return string.replace(/\D/g, '');
    };

    public render() {
        return (
            <PharmacyVoiceNumberView
                areAllFieldsValid={this.state.isVoiceInputValid}
                voiceInput={this.state.voiceInput}
                onPressCancel={this.onPressCancel}
                onFieldUpdate={this.onChangeVoiceInput}
                isVoiceInputValid={this.state.isVoiceInputValid}
                isChangesNotSavedModalVisible={this.state.changesNotSavedModalVisible}
                onPressCancelUnsavedChangesModal={this.onPressCancelUnsavedChangesModal}
                onPressContinueUnsavedChangesModal={this.onPressContinueUnsavedChangesModal}
                getErrorMessage={this.getErrorMessage}
                onPressSave={this.onPressSave}
            />
        );
    }

    protected checkValidNumber = () => {
        this.setState({
            isVoiceInputValid: !isPhoneNumberInvalid(this.state.voiceInput),
        });
    };

    protected getErrorMessage(isDirty: boolean, isValid: boolean, isFocused: boolean, errorMessage: string): string {
        if (isDirty && !isValid && !isFocused) {
            return errorMessage;
        }
        return '';
    }

    protected isChangeUnsaved = (): boolean => {
        return !!this.state.voiceInput;
    };

    protected onChangeVoiceInput = (voiceNumber: string) => {
        this.shouldKeyboardClose(voiceNumber) && Keyboard.dismiss();
        this.setState({
            hasUnsavedChanges: true,
            isVoiceInputValid: !isPhoneNumberInvalid(voiceNumber),
            voiceInput: voiceNumber,
        });
    };

    protected onPressCancel = () => {
        if (this.isChangeUnsaved()) {
            this.setState({ changesNotSavedModalVisible: true });
        } else {
            BottomDrawerHandler.hide();
        }
    };

    protected onPressCancelUnsavedChangesModal = () => {
        this.setState({ changesNotSavedModalVisible: false });
    };

    protected onPressContinueUnsavedChangesModal = () => {
        this.setState({ changesNotSavedModalVisible: false });
        setTimeout(() => {
            BottomDrawerHandler.hide();
        }, 100);
    };

    protected onPressSave = async () => {
        await this.appContext
            .getServiceExecutor()
            .execute(UPDATE_MEMBER_PREFERENCES, {
                payload: { pharmacySettings: { phoneNumber: this.numbersOnly(this.state.voiceInput) } },
            })
            .then(res => {
                this.props.onPharmacyVoiceNumberSaveSuccess();
            });
    };

    protected shouldKeyboardClose = phoneNumber => {
        return phoneNumber && phoneNumber.replace(/\D/g, '').length === 10;
    };
}
