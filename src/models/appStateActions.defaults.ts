import {
    AccessibilityAppStateActions,
    AccessRightsAppStateActions,
    AddressAppStateActions,
    CartAppStateActions,
    ForceUpdateAppStateActions,
    FupAppStateActions,
    IdCardAppStateActions,
    LanguageAppStateActions,
    LocationAppStateActions,
    LoginAppStateActions,
    LoginSecurityAppStateActions,
    LogoutAppStateActions,
    MedicalProfileAppStateActions,
    MemberCommunicationsAppStateActions,
    MemberContextAppStateActions,
    MemberProfileAppStateActions,
    OrdersAppStateActions,
    PayAccountBalanceAppStateActions,
    PaymentAppStateActions,
    PharmacyAppStateActions,
    PrescriberAppStateActions,
    RegistrationAppStateActions,
    SavingOpportunityAppStateActions,
    TwoFactorAuthenticationAppStateActions,
    UserAppStateActions,
} from '../actions';

/*
 * Atlas is going to be broken apart into
 *  Atlas core which holds the framework
 *  individual Atlas features
 *
 * it's not guaranteed that every app using AppStateActions will use the same ones that we currently support in the default app context
 *
 * for now, until we do this breaking apart, we'll type it to the defaults, and the user can extend
 */
export default interface DefaultAppStateActions
    extends Partial<AccessibilityAppStateActions>,
        Partial<AccessRightsAppStateActions>,
        Partial<AddressAppStateActions>,
        Partial<CartAppStateActions>,
        Partial<ForceUpdateAppStateActions>,
        Partial<FupAppStateActions>,
        Partial<IdCardAppStateActions>,
        Partial<LanguageAppStateActions>,
        Partial<LocationAppStateActions>,
        Partial<LoginAppStateActions>,
        Partial<LoginSecurityAppStateActions>,
        Partial<LogoutAppStateActions>,
        Partial<MedicalProfileAppStateActions>,
        Partial<MemberCommunicationsAppStateActions>,
        Partial<MemberContextAppStateActions>,
        Partial<MemberProfileAppStateActions>,
        Partial<OrdersAppStateActions>,
        Partial<PayAccountBalanceAppStateActions>,
        Partial<PaymentAppStateActions>,
        Partial<PharmacyAppStateActions>,
        Partial<PrescriberAppStateActions>,
        Partial<RegistrationAppStateActions>,
        Partial<SavingOpportunityAppStateActions>,
        Partial<TwoFactorAuthenticationAppStateActions>,
        Partial<UserAppStateActions> {}
