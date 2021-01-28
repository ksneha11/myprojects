export enum LoginActions {
    COMMUNITY_PRESSED = 'InYourCommunityPressed',
    EMAIL_CANCEL_PRESSED = 'EmailCancelPressed',
    EMAIL_CONTINUE_PRESSED = 'EmailContinuePressed',
    FIND_A_DOCTOR_PRESSED = 'FindADoctorPressed',
    FIND_A_DOCTOR_PLAN_PRESSED = 'FindADoctorPlanPressed',
    FIND_A_DOCTOR_STATE_PRESSED = 'FindADoctorStatePressed',
    FORGOT_PASSWORD_PRESSED = 'ForgotPasswordPressed',
    FORGOT_USERNAME_PRESSED = 'ForgotUsernamePressed',
    FORGOT_USERNAME_PASSWORD_PRESSED = 'ForgotUsernamePasswordPressed',
    GO_TO_LOGIN = 'GoToLogin', // Not triggered by user action, navigation for when appinit finishes
    LOGGED_IN_INACTIVITY_THRESHOLD_MET = 'LoggedInInactivityThresholdMet',
    LOGIN_PRESSED = 'LoginPressed',
    LOGIN_PRESSED_2FA = 'LoginPressed2FA',
    LOGIN_PRESSED_TOU_REQUIRED = 'LoginPressedTOURequired',
    LOGIN_WITH_TEMP_PASSWORD_PRESSED = 'LoginWithTempPasswordPressed',
    INACTIVITY_MODAL_LOGIN_PRESSED = 'InactivityModalLoginPressed',
    MORE_MENU_PRESSED = 'MoreMenuPressed',
    REGISTRATION_PRESSED = 'RegistrationPressed',
    TWO_FACTOR_AUTHENTICATION = 'TwoFactorAuthentication',
    TWO_FACTOR_AUTHENTICATION_SECURITY_CODE = 'LoginTwoFactorAuthenticationSecurityCode',
    TWO_FACTOR_AUTHENTICATION_SECURITY_QUESTION_PRESSED = 'LoginTwoFactorAuthenticationSecurityQuestionPressed',
    REGISTRATION_DIVERSION = 'RegistrationDiversion',
}
