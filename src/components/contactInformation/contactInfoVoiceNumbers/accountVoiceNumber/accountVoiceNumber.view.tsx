import React, { useState } from 'react';
import { BackHandler, SafeAreaView, View } from 'react-native';
import { BodyCopy, FormButtons, FormField, H1, H5, InputWrapper, ScreenLevelSuccess } from '../../../common';
import ChangesNotSavedModal from '../../../common/changesNotSavedModal';
import StyledComponent, { StyleProps } from '../../../styledComponent';
import { AccountVoiceNumberStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    bannerVisible: boolean;
    children?: (parent: AccountVoiceNumberView) => React.ReactNode;
    isChangesNotSavedModalVisible: boolean;
    isSaveDisabled: boolean;
    onChangeVoiceNumber?: (voiceNumber: string) => void;
    onNumberBlurText?: () => void;
    onPressCancel?: () => void;
    onPressCancelUnsavedChangesModal?: noop;
    onPressContinueUnsavedChangesModal?: noop;
    onPressDismissSuccessBanner: noop;
    onPressSave?: () => void;
    style?: Partial<AccountVoiceNumberStyleSchema>;
    voiceErrorText: string;
    voiceNumber?: string;
    voiceNumberLabel?: string;
    voiceNumberPrimaryButtonLabel?: string;
    voiceNumberScreenTitle?: string;
    voiceNumberSecondaryButtonLabel?: string;
    voiceNumberSubHeading?: string;
    voiceNumberUpdateSuccessLabel?: string;
}

export const defaultProps = {
    children: ({
        TitleContainer,
        ScreenTitle,
        SubHeading,
        VoiceNumberInput,
        ButtonContainer,
        SuccessBanner,
        props,
        style,
    }: AccountVoiceNumberView) => {
        return (
            <>
                <InputWrapper>
                    <SuccessBanner />
                    <View style={style.inputContainer}>
                        <TitleContainer>
                            <ScreenTitle />
                        </TitleContainer>
                        <SubHeading />
                        <VoiceNumberInput />
                        <ButtonContainer />
                        <ChangesNotSavedModal
                            isVisible={props.isChangesNotSavedModalVisible}
                            onPressCancel={props.onPressCancelUnsavedChangesModal}
                            onPressContinue={props.onPressContinueUnsavedChangesModal}
                        />
                    </View>
                </InputWrapper>
            </>
        );
    },
};

export default class AccountVoiceNumberView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'AccountVoiceNumber';
    public style: AccountVoiceNumberStyleSchema;

    public ButtonContainer = () => {
        const { isSaveDisabled } = this.props;
        return (
            <FormButtons
                isPrimaryDisabled={isSaveDisabled}
                onPrimaryButtonOnPress={this.props.onPressSave}
                onSecondaryButtonOnPress={this.props.onPressCancel}
                primaryButtonTitle={this.props.voiceNumberPrimaryButtonLabel}
                secondaryButtonTitle={this.props.voiceNumberSecondaryButtonLabel}
            />
        );
    };

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public ScreenTitle = () => <H1 style={{ h1: this.style.title }}>{this.props.voiceNumberScreenTitle}</H1>;

    public SubHeading = () => {
        return (
            <BodyCopy style={{ paragraph: this.style.paragraph }}>
                {this.props.voiceNumberSubHeading || this.labels.contactInfoVoiceNumbers.subHeading}
            </BodyCopy>
        );
    };

    public SuccessBanner = () => {
        return (
            <ScreenLevelSuccess
                isVisible={this.props.bannerVisible}
                message={this.props.voiceNumberUpdateSuccessLabel}
                onDismissAlert={this.props.onPressDismissSuccessBanner}
            />
        );
    };

    public TitleContainer = ({ children }: { children?: Children }) => {
        return <View style={this.style.titleContainer}>{children || null}</View>;
    };

    public VoiceNumberInput = () => {
        const labels = this.labels.contactInfoVoiceNumbers;
        return (
            <FormField
                accessible
                accessibilityLabel={labels.accountVoiceNumber}
                accessibilityRole="button"
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={this.style.formFieldContainer}
                label={this.props.voiceNumberLabel || labels.accountVoiceNumber}
                keyboardType="phone-pad"
                maxLength={14}
                onBlur={this.props.onNumberBlurText}
                errorMessage={this.props.voiceErrorText}
                onChangeText={this.props.onChangeVoiceNumber}
                value={this.props.voiceNumber}
            />
        );
    };

    protected getErrorMessage(isDirty: boolean, isValid: boolean, errorMessage: string): string {
        if (isDirty) {
            return isValid ? `` : errorMessage;
        } else {
            return ``;
        }
    }
}
