import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { P, PrimaryButton, TextLink } from '..';
import { IconNames } from '../../styles';
import { InputWrapper } from '../common';
import MaskableFormField from '../common/form/maskableFormField';
import { default as StyledComponent, StyleProps } from '../styledComponent';
import JailbreakAlert from './jailbreakAlert';
import { default as defaultStyle, LoginStyleSchema } from './login.style';

export interface Props extends StyleProps {
    children?: <C extends AtlasLoginView>(parent: C) => React.ReactNode;
    onChangePassword: (password: string) => void;
    onChangeUsername: (username: string) => void;
    onFocusPassword;
    onPressCloseInactivityModal: noop;
    onPressRegister: noop;
    onPressRememberMyUsername: noop;
    onPressSubmit: noop;
    password: string;
    passwordErrorMessage: string;
    rememberUsername: boolean;
    username: string;
    usernameErrorMessage: string;
}

// Need to type default props for TS errors in extending a component
const defaultProps: Partial<Props> = {
    children: ({ Password, Registration, SubmitButton, Username }: AtlasLoginView): React.ReactNode => (
        <>
            <Username />
            <Password />
            <SubmitButton />
            <Registration />
            <JailbreakAlert />
        </>
    ),
};

export default class AtlasLoginView<ChildProps extends Props = Props> extends StyledComponent<ChildProps> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'LoginView';
    public style: LoginStyleSchema;

    public Password = () => {
        return (
            <MaskableFormField
                containerStyle={this.style.passwordContainer}
                errorMessage={this.props.passwordErrorMessage}
                label={this.labels.login.password}
                maskOnIconName={IconNames.MASK_ON_FORM_FIELD_ICON}
                maskOffIconName={IconNames.MASK_OFF_FORM_FIELD_ICON}
                onChangeText={this.props.onChangePassword}
                value={this.props.password}
                onFocus={this.props.onFocusPassword}
                style={{
                    errorMessage: this.style.errorMessage,
                    formFieldLabel: this.style.formFieldLabel,
                    warningIcon: this.style.warningIcon,
                }}
            />
        );
    };

    public Registration = () => {
        const labels = this.labels.login.registration;
        return (
            <View style={this.style.register}>
                <P>{labels.notSignedUp} </P>
                <TextLink
                    accessibilityRole="button"
                    onPress={this.props.onPressRegister}
                    style={{ textLink: this.style.registerText }}
                >
                    {labels.register}
                </TextLink>
            </View>
        );
    };

    public render() {
        return (
            <SafeAreaView style={this.style.safeArea}>
                <InputWrapper contentContainerStyle={this.style.rootContainer}>
                    {this.props.children(this)}
                </InputWrapper>
            </SafeAreaView>
        );
    }

    public SubmitButton = () => {
        return (
            <View style={this.style.submitButtonContainer}>
                <PrimaryButton
                    style={{ buttonContainer: this.style.buttonContainer }}
                    className="Login.PrimaryButton"
                    onPress={this.props.onPressSubmit}
                    title={this.labels.login.submitButton}
                />
            </View>
        );
    };

    public Username = () => {
        return (
            <MaskableFormField
                containerStyle={this.style.usernameContanier}
                errorMessage={this.props.usernameErrorMessage}
                label={this.labels.login.username}
                maskOnIconName={IconNames.MASK_ON_FORM_FIELD_ICON}
                maskOffIconName={IconNames.MASK_OFF_FORM_FIELD_ICON}
                onChangeText={this.props.onChangeUsername}
                value={this.props.username}
            />
        );
    };
}
