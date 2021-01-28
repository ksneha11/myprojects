import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { inputPhoneNumberFormatter } from '../../../../utils';
import { BodyCopy, FormButtons, FormField, H1 } from '../../../common';
import ChangesNotSavedModal from '../../../common/changesNotSavedModal';
import StyledComponent, { StyleProps } from '../../../styledComponent';
import { defaultStyle, PharmacyVoiceNumberStyleSchema } from './index';

export interface Props extends StyleProps {
    areAllFieldsValid: boolean;
    children?: (parent: PharmacyVoiceNumberView) => React.ReactNode;
    getErrorMessage: (isDirty: boolean, isValid: boolean, isFocused: boolean, errorMessage: string) => string;
    isChangesNotSavedModalVisible: boolean;
    isVoiceInputValid: boolean;
    onFieldUpdate: (phoneNumber: string) => void;
    onPressCancel: noop;
    onPressCancelUnsavedChangesModal: noop;
    onPressContinueUnsavedChangesModal: noop;
    onPressSave: noop;
    style?: Partial<PharmacyVoiceNumberStyleSchema>;
    voiceInput: string;
}

export const defaultProps: Partial<Props> = {
    children: ({
        ButtonContainer,
        VoiceInput,
        ScreenTitle,
        SubHeading,
        UnsavedChangesModalContainer,
    }: PharmacyVoiceNumberView) => {
        return (
            <>
                <ScreenTitle />
                <SubHeading />
                <VoiceInput />
                <ButtonContainer />
                <UnsavedChangesModalContainer />
            </>
        );
    },
};

export default class PharmacyVoiceNumberView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'PharmacyVoiceNumber';
    public style: PharmacyVoiceNumberStyleSchema;

    public ButtonContainer = () => {
        const buttonLabels = this.labels.contactInfoVoiceNumbers.addPharmacyVoiceNumberView.buttonRow;
        return (
            <FormButtons
                isPrimaryDisabled={!this.props.areAllFieldsValid}
                primaryButtonTitle={buttonLabels.submit}
                onPrimaryButtonOnPress={this.props.onPressSave}
                secondaryButtonTitle={buttonLabels.cancel}
                onSecondaryButtonOnPress={this.props.onPressCancel}
            />
        );
    };

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={this.style.safeAreaContainer}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public ScreenTitle = () => {
        return <H1>{this.labels.contactInfoVoiceNumbers.addPharmacyVoiceNumberView.title}</H1>;
    };

    public SubHeading = () => {
        return <BodyCopy>{this.labels.contactInfoVoiceNumbers.addPharmacyVoiceNumberView.subeading}</BodyCopy>;
    };

    public UnsavedChangesModalContainer = ({ isEditScreen = false }: { isEditScreen?: boolean }) => {
        return (
            <ChangesNotSavedModal
                isEditScreen={isEditScreen}
                isVisible={this.props.isChangesNotSavedModalVisible}
                onPressCancel={this.props.onPressCancelUnsavedChangesModal}
                onPressContinue={this.props.onPressContinueUnsavedChangesModal}
            />
        );
    };

    public VoiceInput = ({
        formLabel = this.labels.contactInfoVoiceNumbers.addPharmacyVoiceNumberView.inputField,
    }: {
        formLabel?: string;
    }) => {
        const [isFocused, setIsFocused] = useState(false);
        const [isDirty, setIsDirty] = useState(false);
        return (
            <FormField
                errorMessage={this.props.getErrorMessage(
                    isDirty,
                    this.props.isVoiceInputValid,
                    isFocused,
                    this.labels.contactInfoVoiceNumbers.addPharmacyVoiceNumberView.validNumber
                )}
                keyboardType={'number-pad'}
                label={formLabel}
                onChangeText={this.props.onFieldUpdate}
                containerStyle={this.style.formFieldContainer}
                value={inputPhoneNumberFormatter(this.props.voiceInput)}
                maxLength={14}
                onBlur={() => setIsFocused(false)}
                onFocus={() => {
                    setIsFocused(true);
                    setIsDirty(true);
                }}
            />
        );
    };
}
