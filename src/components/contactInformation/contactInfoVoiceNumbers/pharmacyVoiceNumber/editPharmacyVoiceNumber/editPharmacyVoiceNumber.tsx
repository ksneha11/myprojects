import isEqual from 'lodash.isequal';
import React from 'react';
import {
    defaultProps as parentDefaultProps,
    PharmacyVoiceNumber,
    Props as ParentProps,
    State as ParentState,
} from '..';
import EditPharmacyVoiceNumberView from './editPharmacyVoiceNumber.view';

export interface State extends ParentState {}

export interface Props extends ParentProps {
    children: (EditPharmacyVoiceNumberView: EditPharmacyVoiceNumberView) => React.ReactNode;
}

const defaultProps: Partial<Props> = {};

export default class EditPharmacyVoiceNumber extends PharmacyVoiceNumber<Props, State> {
    public static defaultProps = defaultProps;
    protected initialVoiceInput: string;

    constructor(props: Props) {
        super(props);
        this.initialVoiceInput = props.voiceInput;
    }

    public render() {
        return (
            <EditPharmacyVoiceNumberView
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

    protected getErrorMessage(isDirty: boolean, isValid: boolean, isFocused: boolean, errorMessage: string): string {
        if (isDirty && !isValid && !isFocused) {
            return errorMessage;
        }
        return '';
    }

    protected isChangeUnsaved = (): boolean => {
        return !isEqual(this.initialVoiceInput, this.state.voiceInput);
    };
}
