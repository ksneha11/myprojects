import { Languages, MemberContext } from 'atlas-services/src/models';
import { LOGIN, POST_INIT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { LoginActions } from '../../context/navigation/actions';
import { getRememberedUsername, setRememberedUsername } from '../../context/storage/rememberedUsername.storage';
import { FeatureNames } from '../../models';
import MyDeviceInfo from '../../utils/myDeviceInfo';
import { BiometryHandler } from '../biometrics/biometrics';
import AppComponent from '../common/appComponent';
import { GlobalModal } from '../globalModal';
import LoginView from './login.view';

export interface State {
    password: string;
    passwordErrorMessage: string;
    rememberUsername: boolean;
    username: string;
    usernameErrorMessage: string;
}

// TODO: REMOVE
const TEMP_PASSWORD_ERROR_CODE = 'auth.401.06';

export default class Login<P = {}, S extends State = State> extends AppComponent<P, S> {
    protected hasShownInactivityModal: boolean = false;

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordErrorMessage: '',
            rememberUsername: false,
            username: '',
            usernameErrorMessage: '',
        } as S;
    }

    public componentDidMount() {
        getRememberedUsername().then(savedUsername => {
            this.setState({
                rememberUsername: !!savedUsername,
                username: savedUsername || '',
            });
        });
        if (this.appState.memberContext?.stateLob) {
            // TODO: Add this as a hook in app context, AKA Remove It, please.
            // Temp fix so it doesn't clear the first time coming to this page
            this.appStateActions.logout.clearAppState();
            this.trackEvent(Login);
        }
    }

    public render() {
        this.shouldDisplayInactivityModal();
        return (
            <LoginView
                onChangePassword={this.onChangePassword}
                onChangeUsername={this.onChangeUsername}
                onFocusPassword={this.onFocusPassword}
                onPressCloseInactivityModal={() => this.onPressCloseInactivityModal()}
                onPressRegister={this.onPressRegister}
                onPressRememberMyUsername={this.onPressRememberMyUsername}
                onPressSubmit={this.onPressSubmit}
                password={this.state.password}
                passwordErrorMessage={this.state.passwordErrorMessage}
                rememberUsername={this.state.rememberUsername}
                username={this.state.username}
                usernameErrorMessage={this.state.usernameErrorMessage}
            />
        );
    }

    protected login = async () => {
        const payload = {
            deviceFingerprint: this.features.isRendered(FeatureNames.TWO_FACTOR_AUTHENTICATION)
                ? await MyDeviceInfo.getDeviceFingerprint()
                : undefined,
            endUserIPAddress: this.features.isRendered(FeatureNames.TWO_FACTOR_AUTHENTICATION)
                ? await MyDeviceInfo.getIPAddress()
                : undefined,
            password: this.state.password,
            username: this.state.username,
        };
        const memberContext: MemberContext = await this.appContext.getServiceExecutor().execute(LOGIN, {
            errorConfig: {
                showModal: (errorCode: string) => {
                    return errorCode !== TEMP_PASSWORD_ERROR_CODE;
                },
            },
            payload,
        });
        await this.appStateActions.memberContext.setMemberContext(memberContext);
        if (memberContext.stateLob) {
            this.appContext.getAnalyticsService().setStateLob(memberContext.stateLob);
        }
    };

    protected offLanguagePostInit = () => {
        this.appContext.getServiceExecutor().execute(POST_INIT, {
            errorConfig: { showModal: () => false },
            payload: this.appState.selectedLanguage === Languages.EN ? Languages.ES : Languages.EN,
            showLoadingIndicator: false,
        });
    };

    protected onBiometricLogin = (username: string, password: string, isBiometricLogin?: boolean) => {
        this.setState({ username, password });
        this.appStateActions.loginSecurity.isBiometricLogin(isBiometricLogin || false);
        this.onPressSubmit();
    };

    protected onChangePassword = (password: string) => {
        const errorMessageLabel = this.labels.login.formFieldErrorMessage.passwordErrorMessage;
        const passwordErrorMessage = !!password ? '' : errorMessageLabel;
        this.setState({ password, passwordErrorMessage });
    };

    protected onChangeUsername = (username: string) => {
        const errorMessageLabel = this.labels.login.formFieldErrorMessage.usernameErrorMessage;
        const usernameErrorMessage = !!username ? '' : errorMessageLabel;
        this.setState({ username: username.trim(), usernameErrorMessage });
    };

    protected onFocusPassword = async event => {
        await BiometryHandler.loginWithBiometrics(this.state.username, this.onBiometricLogin);
    };

    protected onPressCloseInactivityModal = () => {
        this.navigate(LoginActions.INACTIVITY_MODAL_LOGIN_PRESSED, { isInactivityTimeout: false });
    };

    protected onPressRegister = () => this.navigate(LoginActions.REGISTRATION_PRESSED);

    protected onPressRememberMyUsername = () =>
        this.setState(prevState => ({ rememberUsername: !prevState.rememberUsername }));

    protected onPressSubmit = async () => {
        const { rememberUsername, username, password } = this.state;
        this.appStateActions.userData.changeUsername(username);
        this.trackEvent(Login, Login.name);
        if (this.validateUsernamePassword(username, password)) {
            try {
                await this.login();
                this.appStateActions.userData.setPassword(password);
                this.persistUsername(rememberUsername, username);
                if (this.appState.memberContext.multifactorRequired) {
                    this.appStateActions.twoFactorAuthenticationData.setContactInfo(
                        this.appState.memberContext.twoFaContactInfo
                    );
                    this.appStateActions.twoFactorAuthenticationData.setUsernamePassword(username, password);
                    if (this.appState.memberContext.twoFaContactInfo?.length) {
                        this.navigate(LoginActions.LOGIN_PRESSED_2FA);
                    } else {
                        this.navigate(LoginActions.TWO_FACTOR_AUTHENTICATION_SECURITY_QUESTION_PRESSED);
                    }
                } else {
                    this.offLanguagePostInit();
                    await this.postInit();
                    if (this.features.isRendered(FeatureNames.BIOMETRIC_LOGIN)) {
                        this.appStateActions.login.isLoggedIn(true);
                        await BiometryHandler.handlePostAuth(username, password, this.postLoginNavigation);
                    } else {
                        await this.postLoginNavigation();
                    }
                }
            } catch (error) {
                if (error?.errorCode === TEMP_PASSWORD_ERROR_CODE) {
                    this.persistUsername(rememberUsername, username);
                    this.navigate(LoginActions.LOGIN_WITH_TEMP_PASSWORD_PRESSED);
                } else {
                    this.logger.warn(error);
                }
                this.setState({ password: '' });
            }
        }
    };

    protected persistUsername(rememberUsername: boolean, username: string) {
        setRememberedUsername(username, !rememberUsername);
    }

    /**
     * The logic for handling Post Init data happens inside AppContext.
     */
    protected postInit = async () =>
        this.appContext.getServiceExecutor().execute(POST_INIT, { payload: this.appState.selectedLanguage });

    protected postLoginNavigation = async () => {
        this.appStateActions.login.isLoggedIn(true);
        this.navigate(LoginActions.LOGIN_PRESSED);
        this.launchForeSeeSurvey();
    };

    protected shouldDisplayInactivityModal = (): void => {
        if (this.getNavigationParams('isInactivityTimeout') && !this.hasShownInactivityModal) {
            const labels = this.labels.login.inactivityModal;
            this.hasShownInactivityModal = true;

            GlobalModal.show({
                bodyText: labels.body,
                title: labels.title,
            });
        }
    };

    protected validateUsernamePassword(username, password) {
        const labels = this.labels.login.formFieldErrorMessage;
        if (username && password) {
            return true;
        } else {
            this.setState({
                passwordErrorMessage: password.length === 0 ? labels.passwordErrorMessage : '',
                usernameErrorMessage: username.length === 0 ? labels.usernameErrorMessage : '',
            });
            return false;
        }
    }
}
