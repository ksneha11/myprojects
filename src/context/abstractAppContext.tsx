import { AppData, Languages, Provider, ServiceException } from 'atlas-services/src/models';
import { EventBus, ServiceEvent } from 'atlas-services/src/models/eventBus';
import {
    AccountService,
    AddressService,
    AdobeService,
    AnalyticsService,
    AppDataService,
    AppStatusIoService,
    ClaimsService,
    FUPService,
    HomeDeliveryService,
    IdCardsService,
    KeepAliveService,
    LoginService,
    LoginServiceFacade,
    LogoutService,
    LookUpService,
    MedicalProfilesService,
    MemberInfoService,
    MemberPreferencesService,
    MemberProfileService,
    OrdersService,
    PaymentMethodsService,
    PharmacyService,
    PlacePrescriptionOrderService,
    PlacesService,
    PrescriptionService,
    PriceAMedService,
    PrivacyService,
    RegistrationService,
    RegistrationServiceFacade,
    RegistrationV2Service,
    SecurityQuestionsService,
    ServiceConfig,
    ShippingOptionsService,
    SpecialtyMemberEnrollmentService,
    SpecialtyQuestionsService,
    SpecialtyShippingOptionsService,
    StaticContentService,
    TechnicalSupportService,
    TermsOfUseService,
    UsernameValidationService,
    ValidateAddressService,
    ValidateSpecialtyOrderService,
} from 'atlas-services/src/services';
import {
    AccountAdapter,
    AccountBalanceAdapter,
    AddressAdapter,
    CancelOrderAdapter,
    ClaimDetailsAdapter,
    ClaimsSummaryAdapter,
    FindPhysicianAdapter,
    FUPIdentifyMemberAdapter,
    FUPResetPasswordAdapter,
    FUPValidateAnswersAdapter,
    IdCardAdapter,
    LoginAdapter,
    LookUpAdapter,
    MailOrderAdapter,
    ManageAutoAdapter,
    MedicalProfilesAdapter,
    MemberPreferencesAdapter,
    MemberProfileAdapter,
    MultifactorLoginAdapter,
    OrdersAdapter,
    PaymentAdapter,
    PaymentHistoryAdapter,
    PaymentMethodAdapter,
    PharmacyAdapter,
    PrescriptionAdapter,
    PrescriptionOrderAdapter,
    RegistrationAdapter,
    RegistrationEligibilityAdapter,
    RegistrationEligibilityV2Adapter,
    RegistrationV2Adapter,
    RetailOrderAdapter,
    RetailPickupAdapter,
    SecurityQuestionsAdapter,
    ShippingOptionsAdapter,
    SpecialtyAccountsAdapter,
    SpecialtyMemberEnrollmentAdapter,
    SpecialtyQuestionAdapter,
    SpecialtyShippingOptionsAdapter,
    StatusPageIoAdapter,
    UpdateEmailAdapter,
    UpdatePasswordAdapter,
    ValidateSpecialtyOrderAdapter,
} from 'atlas-services/src/services/adapters';
import AccountRecoveryNumberV2Adapter from 'atlas-services/src/services/adapters/accountRecoveryNumberV2.adapter';
import FUPResetTempPasswordAdapter from 'atlas-services/src/services/adapters/fup.resetTempPassword.adapter';
import OtpAdapter from 'atlas-services/src/services/adapters/otp.adapter';
import TermsOfUseAcceptanceAdapter from 'atlas-services/src/services/adapters/termsOfUseAcceptance.adapter';
import ValidateOtpAdapter from 'atlas-services/src/services/adapters/validateOtp.adapter';
import { MiddlewareService, ServiceProvider, StatusIoServiceConfig } from 'atlas-services/src/services/middleware';
import {
    MockDataService,
    MockDataServiceConfig,
    MockDataServiceConfigUI,
    MockDataServiceUI,
} from 'atlas-services/src/services/middleware/mocks';
import { APP_INIT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import SessionHandler from 'atlas-services/src/services/sessionHandler';
import React from 'react';
import { Alert, ImageProps, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from 'react-navigation';
import { Subject } from 'rxjs';
import { AppInitializer, DefaultAppInitializer } from '.';
import generatedServiceConfig from '../../generated/serviceConfig.json';
import {
    AccessibilityAppStateActions,
    AccessibilityReducers,
    AccessRightsAppStateActions,
    AccessRightsReducers,
    AddressAppStateActions,
    AddressReducers,
    CartAppStateActions,
    ForceUpdateAppStateActions,
    FupAppStateActions,
    FupReducers,
    IdCardAppStateActions,
    IdCardReducers,
    LanguageAppStateActions,
    LanguageReducers,
    LocationAppStateActions,
    LocationReducers,
    LoginAppStateActions,
    LoginReducers,
    LoginSecurityAppStateActions,
    LogoutAppStateActions,
    LogoutReducers,
    MedicalProfileAppStateActions,
    MedicalProfileReducers,
    MemberCommunicationsAppStateActions,
    MemberCommunicationsReducers,
    MemberContextAppStateActions,
    MemberContextReducers,
    MemberProfileAppStateActions,
    MemberProfileReducers,
    OrdersAppStateActions,
    OrdersReducers,
    PayAccountBalanceAppStateActions,
    PayAccountBalanceReducers,
    PaymentAppStateActions,
    PaymentReducers,
    PharmacyAppStateActions,
    PharmacyReducers,
    PrescriberAppStateActions,
    PrescriberReducers,
    PrescriptionCartReducers,
    RegistrationAppStateActions,
    RegistrationReducers,
    SavingOpportunityAppStateActions,
    SavingOpportunityReducers,
    TwoFactorAuthenticationAppStateActions,
    TwoFactorAuthenticationReducers,
    UserAppStateActions,
    UserReducers,
} from '../actions';
import LoginSecurityActions, { LoginSecurityReducers } from '../actions/loginSecurity.appStateActions';
import { Biometry } from '../components/biometrics/biometrics';
import { LoadingIndicator } from '../components/common/loadingIndicator';
import { ErrorModal } from '../components/errorModal';
import { GlobalModal } from '../components/globalModal';
import StyledComponent, { StyleProps } from '../components/styledComponent';
import labelsES from '../context/content/labels.es.json';
import labels from '../context/content/labels.json';
import AppState from '../models/appState';
import { AppStateActions, Deeplinks, DefaultAppStateActions, FeatureNames, Features } from '../models/index';
import { ColorSchema, IconNames, ImageNames, StyleSheetSchema } from '../styles';
import { keyValues, Logger, merge } from '../utils';
import { getLogLevel, LogLevel } from '../utils/logger';
import { ApptentiveService, SurveyService } from '../utils/surveys';
import AppContextInterface from './appContextInterface';
import Content from './content/content';
import { getInitialAppState } from './initialAppState';
import { NavigationHandler } from './navigation';
import PushNotificationManager from './pushNotification/lib/pushNotificationManager';
import { PinSSLServiceProvider, ServiceExecutor } from './services';

function downWithTheHierarchy(styleOverridesHeirachal: object) {
    const flattenedObject = {};
    const componentNames = Object.keys(styleOverridesHeirachal);
    const transpile = (obj: object, path = '') => {
        const currentObj = {};
        keyValues(obj).forEach(([key, value]) => {
            if (componentNames.includes(key)) {
                const newPath = (path ? path + '.' : '') + key;
                const cleanValue = transpile(value, newPath);
                if (Object.keys(cleanValue).length) {
                    flattenedObject[newPath] = cleanValue;
                }
            } else {
                currentObj[key] = value;
            }
        });
        return currentObj;
    };
    transpile(styleOverridesHeirachal);
    return flattenedObject;
}

export declare type Labels = typeof labels;
interface ComponentOverrideProps extends StyleProps {
    context: StyledComponent;
}
class OverridableStyledComponent extends StyledComponent<ComponentOverrideProps> {}
export type ComponentOverride = typeof OverridableStyledComponent;

export default abstract class AbstractAppContext implements AppContextInterface {
    protected get _componentOverrides(): Map<string, ComponentOverride> {
        return new Map<string, ComponentOverride>();
    }

    public get appStateActions(): DefaultAppStateActions {
        return {
            ...this.getAccessRightsActions(),
            ...this.getAccessibilityActions(),
            ...this.getAddressActions(),
            ...this.getCartActions(),
            ...this.getForceUpdateActions(),
            ...this.getFUPActions(),
            ...this.getIdCardActions(),
            ...this.getLanguageActions(),
            ...this.getLocationActions(),
            ...this.getLoginActions(),
            ...this.getLoginSecurityActions(),
            ...this.getLogoutActions(),
            ...this.getMedicalProfileActions(),
            ...this.getMemberCommunicationsActions(),
            ...this.getMemberContextActions(),
            ...this.getMemberProfileActions(),
            ...this.getOrderActions(),
            ...this.getPayAccountBalanceActions(),
            ...this.getPaymentActions(),
            ...this.getPharmacyActions(),
            ...this.getPrescriberActions(),
            ...this.getRegistrationActions(),
            ...this.getSavingOpportunityActions(),
            ...this.getTwoFactorAuthenticationActions(),
            ...this.getUserDataActions(),
        };
    }
    public get content() {
        return this._content;
    }

    public get features() {
        if (!this._features) {
            this._features = this.getFeatures(this.appDataSubject, this.appDataSubjectEs);
        }
        return this._features;
    }

    public get labels(): Labels {
        return this._labels.get(this.state.selectedLanguage);
    }

    public get logger() {
        return this._logger;
    }

    public get state(): AppState {
        if (!this._appState) {
            this._appState = getInitialAppState();
        }
        return this._appState;
    }

    public set state(appState: AppState) {
        this._appState = appState;
    }

    public static flattenOverrides = downWithTheHierarchy;
    public static PROD_ENV: string = 'PROD';
    public readonly colorSchema: ColorSchema;
    public readonly styleOverrides: StyleSheetSchema;
    protected _appState: AppState;
    protected _content: Content;
    protected _deeplinks: Deeplinks;
    protected _features: Features;
    protected _globalModal: GlobalModal;
    protected _labels: Map<Languages, Labels> = new Map();
    protected _loadingIndicator;
    protected _logger: Logger = new Logger(
        generatedServiceConfig.logging.devMode,
        getLogLevel(generatedServiceConfig.logging.level)
    ); // try not to check in anything other than false/WARN
    protected analyticsService: AnalyticsService;
    // This stores the data that comes back from appInit and postInit
    protected readonly appDataSubject: Subject<AppData>;
    protected readonly appDataSubjectEs: Subject<AppData>;
    protected isSslPinningDisabled: boolean = false;
    protected isSslPinningDisabledProvider: Provider<boolean> = new Provider<boolean>(() => this.isSslPinningDisabled);
    protected mockDataServiceConfig: MockDataServiceConfig;
    protected mockMode: boolean = false;
    protected mockModeProvider: Provider<boolean> = new Provider<boolean>(() => this.mockMode);
    protected pushNotificationManager: PushNotificationManager;
    protected serviceExecutor: ServiceExecutor;
    protected sessionHandler: SessionHandler;
    protected surveyService: SurveyService;
    protected theme: any;
    protected updateAppState: (
        reducer: (appState: AppState, ...params) => Partial<AppState>,
        ...params
    ) => Promise<void>;

    constructor() {
        this.initializeErrorLogger();
        this.initializeUncaughtExceptionHandler();
        // initialize this with the default packaged with the app
        // override it in pre-init/post-init
        this._labels = new Map<Languages, Labels>([
            [Languages.EN, this.getLabels(Languages.EN)],
            [Languages.ES, this.getLabels(Languages.ES)],
        ]);
        this.appDataSubject = new Subject<AppData>();
        this.appDataSubjectEs = new Subject<AppData>();
        this._features = this.getFeatures(this.appDataSubject, this.appDataSubjectEs);
        this._content = this.getContent();
    }

    public _bind(
        updateAppState: (reducer: (appState: AppState, ...params) => Partial<AppState>, ...params) => Promise<void>
    ): AppInitializer {
        this.updateAppState = updateAppState;
        return this.getAppInitializer();
    }

    public _wrapApp(children: Children): Children {
        return <SafeAreaProvider>{children}</SafeAreaProvider>;
    }

    public getAnalyticsService(): AnalyticsService {
        if (!this.analyticsService) {
            this.analyticsService = new AdobeService(
                this.getAdobeId(),
                this.getAppId(),
                this.getEnvironment(),
                DeviceInfo.getUserAgent(),
                Platform.Version.toString()
            );
        }
        return this.analyticsService;
    }

    public getBiometrics(): JSX.Element {
        return <Biometry />;
    }

    public getBottomDrawer({ children }: { children: Children }): JSX.Element {
        return <>{children}</>;
    }

    public getComponentOverride(name: string): ComponentOverride {
        return this._componentOverrides.get(name);
    }

    public getContent() {
        return new Content(this.appDataSubject, this.appDataSubjectEs, this);
    }

    public getErrorModal(): JSX.Element {
        return <ErrorModal />;
    }

    public getGlobalModal(): JSX.Element {
        return <GlobalModal />;
    }

    public abstract getIcon(name: IconNames, iconProps?: any): JSX.Element;
    public abstract getImage(name: ImageNames, imageProps?: Partial<ImageProps>): JSX.Element;

    public getInjectedContent(): JSX.Element {
        return (
            <this.getBottomDrawer>
                <this.getLoadingIndicator />
                <this.getGlobalModal />
                <this.getBiometrics />
                <this.getErrorModal />
            </this.getBottomDrawer>
        );
    }

    public getLoadingIndicator(): JSX.Element {
        // haven't run into any issues yet with this being a singleton
        // don't believe this will cause any problems
        if (!this._loadingIndicator) {
            this._loadingIndicator = <LoadingIndicator />;
        }
        return this._loadingIndicator;
    }

    public abstract getNavigationHandler(): NavigationHandler;
    public abstract getRootNavigator(): NavigationContainer;

    public getServiceExecutor(): ServiceExecutor {
        // all apps should lazy load the service executor
        // the logout functionality and admin panel are tied to the service executor being lazy loaded
        // all app contexts need to implement their own create service executor function
        if (!this.serviceExecutor) {
            this.serviceExecutor = this.createServiceExecutor();
        }
        return this.serviceExecutor;
    }
    // public abstract getServiceExecutor(): ServiceExecutor;

    public getSessionHandler(): SessionHandler {
        if (!this.sessionHandler) {
            this.sessionHandler = new SessionHandler(generatedServiceConfig.baseUrl);
        }
        return this.sessionHandler;
    }

    public getSurveyService(): SurveyService {
        /*
         * currently the apps are using both foresee and apptentive
         * which means this isn't going to work how I want it to
         */
        if (!this.surveyService && this.features.isRendered(FeatureNames.APPTENTIVE)) {
            this.surveyService = this.createSurveyService();
        }
        return this.surveyService;
    }

    public inactivityWrapper(children: Children): JSX.Element {
        // by default, no inactivity timeout. overrideable by subclasses
        return <>{children}</>;
    }

    public isCurrentLocationRequired(): boolean {
        return false;
    }

    public isMockMode(): boolean {
        return this.mockMode;
    }

    protected createMockDataServiceConfig(mockModeProvider: Provider<boolean>) {
        return new MockDataServiceConfigUI(mockModeProvider);
    }

    protected abstract createServiceExecutor(): ServiceExecutor;
    protected createSurveyService(): SurveyService {
        return new ApptentiveService(this);
    }

    protected getAccessibilityActions(): AccessibilityAppStateActions {
        return {
            accessibility: {
                setScreenReaderEnabled: isScreenReaderEnabled =>
                    this.updateAppState(AccessibilityReducers.setScreenReaderEnabled, isScreenReaderEnabled),
            },
        };
    }

    protected getAccessRightsActions(): AccessRightsAppStateActions {
        return {
            accessRights: {
                setMyFamilyAccessRights: myFamilyAccessRights =>
                    this.updateAppState(AccessRightsReducers.setMyFamilyAccessRights, myFamilyAccessRights),
            },
        };
    }
    protected getAccountAdapter() {
        return new AccountAdapter();
    }

    protected getAccountBalanceAdapter() {
        return new AccountBalanceAdapter();
    }

    protected getAccountRecoveryNumberAdapter(): AccountRecoveryNumberV2Adapter {
        return new AccountRecoveryNumberV2Adapter();
    }

    protected getAccountService(middlewareService: MiddlewareService) {
        return new AccountService(
            middlewareService,
            this.getAccountAdapter(),
            this.getAccountBalanceAdapter(),
            this.getPaymentAdapter(),
            this.getPaymentHistoryAdapter(),
            this.getSpecialtyAccountsAdapter()
        );
    }

    protected getAddressActions(): AddressAppStateActions {
        return {
            address: {
                setDefaultAddress: defaultAddress =>
                    this.updateAppState(AddressReducers.setDefaultAddress, defaultAddress),
                setMemberAddresses: memberAddresses =>
                    this.updateAppState(AddressReducers.setMemberAddresses, memberAddresses),
                setSelectedAddress: selectedAddress =>
                    this.updateAppState(AddressReducers.setSelectedAddress, selectedAddress),
            },
        };
    }

    protected getAddressAdapter() {
        return new AddressAdapter();
    }

    protected getAddressService(middleware: MiddlewareService) {
        return new AddressService(middleware, this.getAddressAdapter());
    }

    protected abstract getAdobeId(): string;

    protected getAppDataService(middlewareService: MiddlewareService) {
        return new AppDataService(middlewareService, this.getOnAppInit(), this.getOnPostInit());
    }

    protected getAppId() {
        return generatedServiceConfig.headers['X-MADT-Appid'];
    }

    protected getAppInitializer() {
        return new DefaultAppInitializer(this);
    }

    protected getAppStatusIoService(): AppStatusIoService {
        return new AppStatusIoService(
            this.getAppStatusIoServiceConfig(),
            this.getAppStatusIoServiceAdapter(),
            this.mockModeProvider,
            this.logger
        );
    }

    protected getAppStatusIoServiceAdapter(): StatusPageIoAdapter {
        return new StatusPageIoAdapter();
    }

    protected getAppStatusIoServiceConfig(): StatusIoServiceConfig {
        // Placeholder for app-specific config
        return {} as StatusIoServiceConfig;
    }

    protected getCancelOrderAdapter() {
        return new CancelOrderAdapter();
    }

    protected getCartActions(): CartAppStateActions {
        const cartActions = new PrescriptionCartReducers();
        return {
            cart: {
                clearCart: () => this.updateAppState(cartActions.clearCart),
                loadPrescriptions: (actionablePrescriptions, nonActionablePrescriptions) =>
                    this.updateAppState(
                        cartActions.loadPrescriptions,
                        actionablePrescriptions,
                        nonActionablePrescriptions
                    ),
                setDeliveryAddress: deliveryAddress =>
                    this.updateAppState(cartActions.setDeliveryAddress, deliveryAddress),
                setDeliveryAddressSpecialty: specialtyDeliveryAddress =>
                    this.updateAppState(cartActions.setDeliveryAddressSpecialty, specialtyDeliveryAddress),
                setOrderForDelivery: isOrderForDelivery =>
                    this.updateAppState(cartActions.setOrderForDelivery, isOrderForDelivery),
                setPaymentMethod: paymentMethod => this.updateAppState(cartActions.setPaymentMethod, paymentMethod),
                setPickupAddress: pickupAddress => this.updateAppState(cartActions.setPickupAddress, pickupAddress),
                setShippingDate: shippingDate => this.updateAppState(cartActions.setShippingDate, shippingDate),
                setSpecialtyQuestions: specialtyQuestions =>
                    this.updateAppState(cartActions.setSpecialtyQuestions, specialtyQuestions),
                setStoreId: storeId => this.updateAppState(cartActions.setStoreId, storeId),
                togglePrescription: prescriptions => this.updateAppState(cartActions.togglePrescription, prescriptions),
                updateSelectedShippingOption: selectedShippingOption =>
                    this.updateAppState(cartActions.updateSelectedShippingOption, selectedShippingOption),
            },
        };
    }

    protected getClaimDetailsAdapter() {
        return new ClaimDetailsAdapter();
    }

    protected getClaimsService(middlewareService: MiddlewareService) {
        return new ClaimsService(middlewareService, this.getClaimDetailsAdapter(), this.getClaimsSummaryAdapter());
    }

    protected getClaimsSummaryAdapter() {
        return new ClaimsSummaryAdapter();
    }

    protected getEnvironment() {
        // TODO: pull this into the app from generated config
        // for now just hardcoding it to scaffold out the service
        /*
         *
         */
        // tslint:disable-next-line: no-string-literal
        if (generatedServiceConfig['environment']) {
            // tslint:disable-next-line: no-string-literal
            return generatedServiceConfig['environment'];
        }
        /*
         * FOR NOW WERE DOING THIS JUST TO UNBLOCK JAVALANCHE CURRENT DEVELOPMEMT
         * WORKED WITH JAY ON THIS FOR LIKE AN HOUR
         * SOMETHING SERIOUSLY WEIRD IS GOING ON ON JENKINS WHERE ITS NOT GENERATING THE ENVIRONMENT CONFIG CORRECTLY
         * WE CHECKED ALL PLACES IN THE WORKSPACE AND EVERYTHING LOOKS FINE
         * WE RAN THE EXACT PR CHECK COMMAND LOCALLY AND EVERYTHING WORKED FINE
         * ON THE SERVER IT TELL US THE FOLLOWING:
         * src/context/abstractAppContext.tsx(453,39): error TS2339: Property 'environment' does not exist on type '{ "baseUrl": string; "headers": { "X-MADT-AppVersion": string; "X-MADT-Appid": string; "apikey": string; }; }'.
         * AND YOU CAN SEE THE ENVIRONMENT IS ACTUALLY MISSING WHEN IT GENERATES THE CONFIG, EVEN THOUGH ITS THERE IN THE WORKSPACE
         * Generating Service Config for IngenioRx on SIT1
         **** JENKINS TEST - ENV CONFIG FOR APP IngenioRx = {"baseUrl":"https://mirx.api.ext.sit1.va.anthem.com/mobile/voyager-ingenio/ingeniorx/","certs":["mirx.api.ext.dev.va.anthem.com","mirx.api.ext.sit.va.anthem.com"],"headers":{"Content-Type":"application/json","X-MADT-AppVersion":"0.0.1","X-MADT-Appid":"INGRX","X-MADT-Token":""}}
         *
         * NO CLUE - JUST ADDING THIS FOR NOW IN HOPES IT PASSES THE PR CHECK AND UNBLOCKS JAVALANCHE ( AND EVERYBODY ELSE I GUESS )
         */
        return 'SIT1'; // FIXME!!!!!!!!!
    }

    /*
     * TODO: provide app specific overrides for these
     */
    protected getException(key: string, selectedLanguage: Languages): ServiceException {
        return this.content.exceptions.get(selectedLanguage).has(key)
            ? this.content.exceptions.get(selectedLanguage).get(key)
            : this.content.exceptions.get(selectedLanguage).get('500');
    }

    protected getFeatures(appDataSubject: Subject<AppData>, appDataSubjectEs: Subject<AppData>) {
        return new Features(this, appDataSubject, this.appDataSubjectEs);
    }

    protected getFindPhysicianAdapter(addressAdapter: AddressAdapter) {
        return new FindPhysicianAdapter(addressAdapter);
    }

    protected getForceUpdateActions(): ForceUpdateAppStateActions {
        return {
            forceUpdate: {
                setForceUpdate: () => this.updateAppState((appState: AppState) => appState),
            },
        };
    }

    protected getFUPActions(): FupAppStateActions {
        return {
            fup: {
                setMemberInfo: memberInfo => this.updateAppState(FupReducers.setMemberInfo, memberInfo),
                setSecurityQuestion: securityQuestions =>
                    this.updateAppState(FupReducers.setSecurityQuestion, securityQuestions),
                setUsername: username => this.updateAppState(FupReducers.setUsername, username),
            },
        };
    }

    protected getFUPIdentifyMemberAdapter() {
        return new FUPIdentifyMemberAdapter();
    }

    protected getFUPResetPasswordAdapter() {
        return new FUPResetPasswordAdapter();
    }

    protected getFUPResetTempPasswordAdapter() {
        return new FUPResetTempPasswordAdapter();
    }

    protected getFUPService(middlewareService: MiddlewareService) {
        return new FUPService(
            this.getFUPIdentifyMemberAdapter(),
            this.getFUPResetPasswordAdapter(),
            this.getFUPResetTempPasswordAdapter(),
            this.getFUPValidateAnswersAdapter(),
            this.getOtpAdapter(),
            this.getValidateOtpAdapter(),
            middlewareService
        );
    }

    protected getFUPValidateAnswersAdapter() {
        return new FUPValidateAnswersAdapter();
    }

    protected getHomeDeliveryService(middlewareService: MiddlewareService) {
        return new HomeDeliveryService(middlewareService, this.getFindPhysicianAdapter(this.getAddressAdapter()));
    }

    protected getIdCardActions(): IdCardAppStateActions {
        return {
            idCard: {
                setIdCards: idCards => this.updateAppState(IdCardReducers.setIdCards, idCards),
            },
        };
    }

    protected getIdCardAdapter() {
        return new IdCardAdapter();
    }

    protected getIdCardsService(middlewareService: MiddlewareService) {
        return new IdCardsService(middlewareService, this.getIdCardAdapter());
    }

    protected getKeepAliveService(middlewareService: MiddlewareService) {
        return new KeepAliveService(middlewareService);
    }

    protected getLabels(language: Languages): Labels {
        // @ts-ignore Ignoring differences between english and spanish for now
        // later on, this will check to ensure every english label has a spanish translation
        return language === Languages.EN ? labels : labelsES;
    }

    protected getLanguageActions(): LanguageAppStateActions {
        return {
            languages: {
                updateSelectedLanguage: selectedLanguage =>
                    this.updateAppState(LanguageReducers.updateSelectedLanguage, selectedLanguage),
            },
        };
    }

    protected getLocationActions(): LocationAppStateActions {
        return {
            location: {
                setCurrentLocation: currentLocation =>
                    this.updateAppState(LocationReducers.setCurrentLocation, currentLocation),
                setLocationRequestStatus: locationRequestStatus =>
                    this.updateAppState(LocationReducers.setLocationRequestStatus, locationRequestStatus),
            },
        };
    }

    protected getLoginActions(): LoginAppStateActions {
        return {
            login: {
                isLoggedIn: isLoggedIn => this.updateAppState(LoginReducers.isLoggedIn, isLoggedIn),
            },
        };
    }

    protected getLoginAdapter() {
        return new LoginAdapter();
    }

    protected getLoginSecurityActions(): LoginSecurityAppStateActions {
        return {
            loginSecurity: {
                isBiometricLogin: isBiometricLogin =>
                    this.updateAppState(LoginSecurityReducers.isBiometricLogin, isBiometricLogin),
            },
        };
    }

    protected getLoginService(middlewareService: MiddlewareService) {
        return new LoginService(
            this.getLoginAdapter(),
            middlewareService,
            this.getMultifactorLoginAdapter(),
            this.getOtpAdapter(),
            this.getValidateOtpAdapter()
        );
    }

    protected getLoginServiceFacade(middlewareService: MiddlewareService) {
        return new LoginServiceFacade(
            this.features.isRendered(FeatureNames.TWO_FACTOR_AUTHENTICATION),
            this.getLoginService(middlewareService)
        );
    }

    protected getLogoutActions(): LogoutAppStateActions {
        return {
            logout: {
                clearAppState: () =>
                    this.updateAppState(LogoutReducers.clearAppState).then(() => {
                        this.onLogout();
                    }),
            },
        };
    }

    protected getLogoutService(middlewareService: MiddlewareService) {
        return new LogoutService(middlewareService);
    }

    protected getLookUpAdapter() {
        return new LookUpAdapter();
    }

    protected getLookUpService(middlewareService: MiddlewareService) {
        return new LookUpService(middlewareService, this.getLookUpAdapter());
    }

    protected getMailOrderAdapter(): MailOrderAdapter {
        return new MailOrderAdapter();
    }

    protected getManageAutoAdapter(): ManageAutoAdapter {
        return new ManageAutoAdapter();
    }

    protected getMedicalProfileActions(): MedicalProfileAppStateActions {
        return {
            medicalProfiles: {
                setMedicalProfiles: medicalProfiles =>
                    this.updateAppState(MedicalProfileReducers.setMedicalProfiles, medicalProfiles),
            },
        };
    }

    protected getMedicalProfilesAdapter() {
        return new MedicalProfilesAdapter();
    }

    protected getMedicalProfilesService(middlewareService: MiddlewareService) {
        return new MedicalProfilesService(middlewareService, this.getMedicalProfilesAdapter());
    }

    // TODO: change this method signature to getMemberCommunicationActions
    protected getMemberCommunicationsActions(): MemberCommunicationsAppStateActions {
        return {
            memberCommunications: {
                setMemberCommercialEmail: memberCommercialEmail =>
                    this.updateAppState(MemberCommunicationsReducers.setMemberCommercialEmail, memberCommercialEmail),
                setMemberCommercialText: memberCommercialText =>
                    this.updateAppState(MemberCommunicationsReducers.setMemberCommercialText, memberCommercialText),
                setMemberCommercialVoice: memberCommercialVoice =>
                    this.updateAppState(MemberCommunicationsReducers.setMemberCommercialVoice, memberCommercialVoice),
                setMemberPreferences: memberPreferences =>
                    this.updateAppState(MemberCommunicationsReducers.setMemberPreferences, memberPreferences),
            },
        };
    }

    protected getMemberContextActions(): MemberContextAppStateActions {
        return {
            memberContext: {
                setMemberContext: memberContext =>
                    this.updateAppState(MemberContextReducers.setMemberContext, memberContext),
                setMemberInfo: memberInfo => this.updateAppState(MemberContextReducers.setMemberInfo, memberInfo),
            },
        };
    }

    protected getMemberInfoService(middlewareService: MiddlewareService) {
        return new MemberInfoService(middlewareService);
    }

    protected getMemberPreferencesAdapter() {
        return new MemberPreferencesAdapter();
    }

    protected getMemberPreferencesService(middlewareService: MiddlewareService) {
        return new MemberPreferencesService(middlewareService, this.getMemberPreferencesAdapter());
    }

    protected getMemberProfileActions(): MemberProfileAppStateActions {
        return {
            memberProfile: {
                setMemberProfile: memberProfile =>
                    this.updateAppState(MemberProfileReducers.setMemberProfile, memberProfile),
                setMemberTOUConsentStatus: (memberUid, consentStatus) =>
                    this.updateAppState(MemberProfileReducers.setMemberTOUConsentStatus, memberUid, consentStatus),
            },
        };
    }

    protected getMemberProfileAdapter() {
        return new MemberProfileAdapter();
    }

    protected getMemberProfileService(middlewareService: MiddlewareService) {
        return new MemberProfileService(
            middlewareService,
            this.getAccountRecoveryNumberAdapter(),
            this.getMemberProfileAdapter(),
            this.getUpdateEmailAdapter(),
            this.getUpdatePasswordAdapter()
        );
    }

    protected getMiddlewareService(
        mockDataService: MockDataService,
        mockDataServiceConfig: MockDataServiceConfig,
        serviceConfig: ServiceConfig,
        serviceProvider: ServiceProvider
    ): MiddlewareService {
        return new MiddlewareService(
            this.content.endpoints,
            serviceConfig,
            serviceProvider,
            mockDataService,
            mockDataServiceConfig,
            this.getSessionHandler()
        );
    }

    protected getMockDataService(): MockDataService {
        return new MockDataServiceUI();
    }

    /*
     * typically, you don't want these to be managed by the app context
     * if you wipe out the service executor, it should lazy load and refresh everything
     * putting in lazy loading like this prevents a clean service executor re-init
     * in this case, we don't want to swap out the mock data service config
     * we've added an admin panel that recreates the service layer on change
     * we don't want it to wipe out the changes we make in the admin panel
     * always use one real singleton instance of this
     */
    protected getMockDataServiceConfig(): MockDataServiceConfig {
        if (!this.mockDataServiceConfig) {
            this.mockDataServiceConfig = this.createMockDataServiceConfig(this.mockModeProvider);
        }
        return this.mockDataServiceConfig;
    }

    protected getMultifactorLoginAdapter(): MultifactorLoginAdapter {
        return new MultifactorLoginAdapter();
    }

    protected getOnAppInit() {
        return (appData: AppData, language: Languages = this.state.selectedLanguage) => {
            this.updateAppData(appData, language);
        };
    }

    protected getOnPostInit() {
        return (appData: AppData, language: Languages = this.state.selectedLanguage) => {
            this.updateAppData(appData, language);
        };
    }

    protected getOrderActions(): OrdersAppStateActions {
        return {
            orders: {
                setSelectedOrder: selectedOrder => this.updateAppState(OrdersReducers.setSelectedOrder, selectedOrder),
            },
        };
    }

    protected getOrdersAdapter() {
        return new OrdersAdapter(
            this.getAddressAdapter(),
            this.getPrescriptionAdapter(),
            this.getShippingOptionsAdapter()
        );
    }

    protected getOrdersService(middlewareService: MiddlewareService, eventBus: EventBus): OrdersService {
        return new OrdersService(
            middlewareService,
            eventBus,
            this.getCancelOrderAdapter(),
            this.getMailOrderAdapter(),
            this.getOrdersAdapter(),
            this.getRetailOrderAdapter()
        );
    }

    protected getOtpAdapter(): OtpAdapter {
        return new OtpAdapter();
    }

    protected getPayAccountBalanceActions(): PayAccountBalanceAppStateActions {
        return {
            payAccountBalance: {
                setAmountDue: amountDue => this.updateAppState(PayAccountBalanceReducers.setAmountDue, amountDue),
                setPaymentAmount: paymentAmount =>
                    this.updateAppState(PayAccountBalanceReducers.setPaymentAmount, paymentAmount),
                setPbmAccountBalance: pbmAccountBalance =>
                    this.updateAppState(PayAccountBalanceReducers.setPbmAccountBalance, pbmAccountBalance),
                setPbmAccounts: pbmAccounts =>
                    this.updateAppState(PayAccountBalanceReducers.setPbmAccounts, pbmAccounts),
                setSelectedPbmPaymentMethod: selectedPbmPaymentMethod =>
                    this.updateAppState(
                        PayAccountBalanceReducers.setSelectedPbmPaymentMethod,
                        selectedPbmPaymentMethod
                    ),
                setSelectedSpecialtyAccount: selectedSpecialtyAccount =>
                    this.updateAppState(
                        PayAccountBalanceReducers.setSelectedSpecialtyAccount,
                        selectedSpecialtyAccount
                    ),
                setSelectedSpecialtyPaymentMethod: selectedSpecialtyPaymentMethod =>
                    this.updateAppState(
                        PayAccountBalanceReducers.setSelectedSpecialtyPaymentMethod,
                        selectedSpecialtyPaymentMethod
                    ),
                setSpecialtyAccountBalance: specialtyAccountBalance =>
                    this.updateAppState(PayAccountBalanceReducers.setSpecialtyAccountBalance, specialtyAccountBalance),
                setSpecialtyAccounts: specialtyAccounts =>
                    this.updateAppState(PayAccountBalanceReducers.setSpecialtyAccounts, specialtyAccounts),
                setTotalAccountBalance: totalAccountBalance =>
                    this.updateAppState(PayAccountBalanceReducers.setTotalAccountBalance, totalAccountBalance),
            },
        };
    }

    protected getPaymentActions(): PaymentAppStateActions {
        return {
            payments: {
                setSelectedPaymentMethod: selectedPaymentMethod =>
                    this.updateAppState(PaymentReducers.selectedPaymentMethod, selectedPaymentMethod),
                setSelectedSpecialtyPaymentMethod: selectedSpecialtyPaymentMethod =>
                    this.updateAppState(
                        PaymentReducers.setSelectedSpecialtyPaymentMethod,
                        selectedSpecialtyPaymentMethod
                    ),
            },
        };
    }

    protected getPaymentAdapter(): PaymentAdapter {
        return new PaymentAdapter(this.getAddressAdapter());
    }

    protected getPaymentHistoryAdapter(): PaymentHistoryAdapter {
        return new PaymentHistoryAdapter();
    }

    protected getPaymentMethodAdapter(): PaymentMethodAdapter {
        return new PaymentMethodAdapter();
    }

    protected getPaymentMethodsService(middlewareService: MiddlewareService): PaymentMethodsService {
        return new PaymentMethodsService(middlewareService, this.getPaymentMethodAdapter());
    }

    protected getPharmacyActions(): PharmacyAppStateActions {
        return {
            pharmacies: {
                setDefaultPharmacy: defaultPharmacy =>
                    this.updateAppState(PharmacyReducers.setDefaultPharmacy, defaultPharmacy),
                setFilteredPharmacies: filteredPharmacies =>
                    this.updateAppState(PharmacyReducers.setFilteredPharmacies, filteredPharmacies),
                setPharmacies: pharmacies => this.updateAppState(PharmacyReducers.setPharmacies, pharmacies),
                setSelectedPharmacy: selectedPharmacy =>
                    this.updateAppState(PharmacyReducers.setSelectedPharmacies, selectedPharmacy),
            },
        };
    }

    // There's a potential race condition with this.content
    protected getPharmacyAdapter(): PharmacyAdapter {
        return new PharmacyAdapter(this.getAddressAdapter());
    }

    protected getPharmacyService(middlewareService: MiddlewareService): PharmacyService {
        return new PharmacyService(middlewareService, this.getPharmacyAdapter(), this.getRetailPickupAdapter());
    }

    protected getPlacePrescriptionOrderAdapter(): PrescriptionOrderAdapter {
        return new PrescriptionOrderAdapter(
            this.getAddressAdapter(),
            this.getPrescriptionAdapter(),
            this.getShippingOptionsAdapter(),
            this.getSpecialtyQuestionsAdapter()
        );
    }

    protected getPlacePrescriptionOrderService(
        middlewareService: MiddlewareService,
        eventBus: EventBus
    ): PlacePrescriptionOrderService {
        return new PlacePrescriptionOrderService(middlewareService, eventBus, this.getPlacePrescriptionOrderAdapter());
    }

    protected getPlacesService(middlewareService: MiddlewareService): PlacesService {
        return new PlacesService(middlewareService);
    }

    protected getPrescriberActions(): PrescriberAppStateActions {
        return {
            prescribers: {
                setApprovingPrescriber: approvingPrescriber =>
                    this.updateAppState(PrescriberReducers.setApprovingPrescriber, approvingPrescriber),
                setSearchedPrescribers: prescribers =>
                    this.updateAppState(PrescriberReducers.setSearchedPrescribers, prescribers),
            },
        };
    }

    protected getPrescriptionAdapter(): PrescriptionAdapter {
        return new PrescriptionAdapter();
    }

    protected getPrescriptionService(middlewareService: MiddlewareService, eventBus: EventBus): PrescriptionService {
        return new PrescriptionService(
            middlewareService,
            eventBus,
            this.getManageAutoAdapter(),
            this.getPrescriptionAdapter()
        );
    }

    protected getPriceAMedService(middlewareService: MiddlewareService) {
        return new PriceAMedService(middlewareService);
    }

    protected getPrivacyService(middlewareService: MiddlewareService) {
        return new PrivacyService(middlewareService);
    }

    protected getRegistrationActions(): RegistrationAppStateActions {
        return {
            registration: {
                clearRegistrationData: () => this.updateAppState(RegistrationReducers.clearRegistrationData),
                setAccountRecoveryNumber: (phoneNumber, phoneType, setEarly) =>
                    this.updateAppState(
                        RegistrationReducers.setAccountRecoveryNumber,
                        phoneNumber,
                        phoneType,
                        setEarly
                    ),
                setDateOfBirth: dateOfBirth => this.updateAppState(RegistrationReducers.setDateOfBirth, dateOfBirth),
                setEmail: emailAddress => this.updateAppState(RegistrationReducers.setEmailAddress, emailAddress),
                setPassword: password => this.updateAppState(RegistrationReducers.setPassword, password),
                setRegistrationEligibility: registrationEligibility =>
                    this.updateAppState(RegistrationReducers.setRegistrationEligibility, registrationEligibility),
                setSecurityQuestions: securityQuestions =>
                    this.updateAppState(RegistrationReducers.setSecurityQuestions, securityQuestions),
                setUsername: username => this.updateAppState(RegistrationReducers.setUsername, username),
            },
        };
    }

    protected getRegistrationAdapter(): RegistrationAdapter {
        return new RegistrationAdapter();
    }

    protected getRegistrationEligibilityAdapter(): RegistrationEligibilityAdapter {
        return new RegistrationEligibilityAdapter();
    }

    protected getRegistrationEligibilityV2Adapter(): RegistrationEligibilityV2Adapter {
        return new RegistrationEligibilityV2Adapter();
    }

    protected getRegistrationServiceFacade(middlewareService: MiddlewareService): RegistrationServiceFacade {
        return new RegistrationServiceFacade(
            this.features.isRendered(FeatureNames.TWO_FACTOR_AUTHENTICATION),
            this.getRegistrationV1Service(middlewareService),
            this.getRegistrationV2Service(middlewareService)
        );
    }

    protected getRegistrationV1Service(middlewareService: MiddlewareService): RegistrationService {
        return new RegistrationService(
            middlewareService,
            this.getRegistrationAdapter(),
            this.getRegistrationEligibilityAdapter()
        );
    }

    protected getRegistrationV2Adapter(): RegistrationV2Adapter {
        return new RegistrationV2Adapter();
    }

    protected getRegistrationV2Service(middlewareService: MiddlewareService): RegistrationV2Service {
        return new RegistrationV2Service(
            middlewareService,
            this.getOtpAdapter(),
            this.getRegistrationV2Adapter(),
            this.getRegistrationEligibilityV2Adapter(),
            this.getValidateOtpAdapter()
        );
    }

    protected getRetailOrderAdapter(): RetailOrderAdapter {
        return new RetailOrderAdapter();
    }

    protected getRetailPickupAdapter(): RetailPickupAdapter {
        return new RetailPickupAdapter();
    }

    protected getSavingOpportunityActions(): SavingOpportunityAppStateActions {
        return {
            savingOpportunity: {
                setOptedOutPrescriptionId: prescriptionId =>
                    this.updateAppState(SavingOpportunityReducers.setOptedOutPrescriptionId, prescriptionId),
                setProcessedPrescription: processedPrescription =>
                    this.updateAppState(SavingOpportunityReducers.setProcessedPrescription, processedPrescription),
                setSelectedPrescription: selectedPrescription =>
                    this.updateAppState(SavingOpportunityReducers.setSelectedPrescription, selectedPrescription),
                setSelectedRetailPrescription: selectedRetailPrescription =>
                    this.updateAppState(
                        SavingOpportunityReducers.setSelectedRetailPrescription,
                        selectedRetailPrescription
                    ),
                updateSelectedShippingType: selectedShippingType =>
                    this.updateAppState(SavingOpportunityReducers.updateSelectedShippingType, selectedShippingType),
            },
        };
    }

    protected getSecurityQuestionsAdapter(): SecurityQuestionsAdapter {
        return new SecurityQuestionsAdapter();
    }

    protected getSecurityQuestionsService(middlewareService: MiddlewareService): SecurityQuestionsService {
        return new SecurityQuestionsService(middlewareService, this.getSecurityQuestionsAdapter());
    }

    // gets the actual service context (headers, etc.) required by the service executor
    protected abstract getServiceConfig(): ServiceConfig;

    protected getServiceExceptionHandler(): (caught: ServiceException) => ServiceException {
        return (caught: ServiceException) => {
            const exception: ServiceException = this.getException(caught.errorCode, this.state.selectedLanguage);
            return {
                errorCode: exception.errorCode,
                errorMessage: exception.errorMessage,
                errorTitle: exception.errorTitle,
                hasFooter: exception.hasFooter,
                links: exception.links,
                primaryButtonTitle: exception.primaryButtonTitle,
                secondaryButtonTitle: exception.secondaryButtonTitle,
                tertiaryButtonTitle: exception.tertiaryButtonTitle,
            };
        };
    }

    protected getServiceProvider(serviceConfig: ServiceConfig): ServiceProvider {
        return new PinSSLServiceProvider(this.logger, serviceConfig, this.isSslPinningDisabledProvider);
    }

    protected getShippingOptionsAdapter(): ShippingOptionsAdapter {
        return new ShippingOptionsAdapter(this.getAddressAdapter());
    }

    protected getShippingOptionsService(middlewareService: MiddlewareService): ShippingOptionsService {
        return new ShippingOptionsService(middlewareService, this.getShippingOptionsAdapter());
    }

    protected getSpecialtyAccountsAdapter(): SpecialtyAccountsAdapter {
        return new SpecialtyAccountsAdapter();
    }

    protected getSpecialtyMemberEnrollmentAdapter(): SpecialtyMemberEnrollmentAdapter {
        return new SpecialtyMemberEnrollmentAdapter();
    }

    protected getSpecialtyMemberEnrollmentService(
        middlewareService: MiddlewareService
    ): SpecialtyMemberEnrollmentService {
        return new SpecialtyMemberEnrollmentService(middlewareService, this.getSpecialtyMemberEnrollmentAdapter());
    }

    protected getSpecialtyQuestionsAdapter(): SpecialtyQuestionAdapter {
        return new SpecialtyQuestionAdapter();
    }

    protected getSpecialtyQuestionsService(middlewareService: MiddlewareService): SpecialtyQuestionsService {
        return new SpecialtyQuestionsService(middlewareService, this.getSpecialtyQuestionsAdapter());
    }

    protected getSpecialtyShippingOptionsAdapter(): SpecialtyShippingOptionsAdapter {
        return new SpecialtyShippingOptionsAdapter();
    }

    protected getSpecialtyShippingOptionsService(
        middlewareService: MiddlewareService
    ): SpecialtyShippingOptionsService {
        return new SpecialtyShippingOptionsService(middlewareService, this.getSpecialtyShippingOptionsAdapter());
    }

    protected getStaticContentService(middlewareService: MiddlewareService) {
        return new StaticContentService(middlewareService);
    }

    protected getTechnicalSupportService(middlewareService: MiddlewareService) {
        return new TechnicalSupportService(middlewareService);
    }

    protected getTermsOfUseAcceptanceAdapter(): TermsOfUseAcceptanceAdapter {
        return new TermsOfUseAcceptanceAdapter();
    }

    protected getTermsOfUseService(middlewareService: MiddlewareService) {
        return new TermsOfUseService(middlewareService, this.getTermsOfUseAcceptanceAdapter());
    }

    protected getTwoFactorAuthenticationActions(): TwoFactorAuthenticationAppStateActions {
        return {
            twoFactorAuthenticationData: {
                clearTwoFactorData: () => this.updateAppState(TwoFactorAuthenticationReducers.clearTwoFactorData),
                setContactInfo: (contactInfo, memberUid?) =>
                    this.updateAppState(TwoFactorAuthenticationReducers.setContactInfo, contactInfo, memberUid),
                setSelectedContactInfo: selectedContactInfo =>
                    this.updateAppState(TwoFactorAuthenticationReducers.setSelectedContactInfo, selectedContactInfo),
                setUsernamePassword: (username, password) =>
                    this.updateAppState(TwoFactorAuthenticationReducers.setUsernamePassword, username, password),
            },
        };
    }

    protected getUpdateEmailAdapter(): UpdateEmailAdapter {
        return new UpdateEmailAdapter();
    }

    protected getUpdatePasswordAdapter(): UpdatePasswordAdapter {
        return new UpdatePasswordAdapter();
    }

    protected getUserDataActions(): UserAppStateActions {
        return {
            userData: {
                // TODO: fix naming convention - should be setUsername
                changeUsername: username => this.updateAppState(UserReducers.changeUsername, username),
                setPassword: password => this.updateAppState(UserReducers.setPassword, password),
            },
        };
    }

    protected getUsernameValidationService(middlewareService: MiddlewareService) {
        return new UsernameValidationService(middlewareService);
    }

    protected getValidateAddressService(middlewareService: MiddlewareService) {
        return new ValidateAddressService(middlewareService);
    }

    protected getValidateOtpAdapter() {
        return new ValidateOtpAdapter();
    }

    protected getValidateSpecialtyOrderAdapter() {
        return new ValidateSpecialtyOrderAdapter();
    }

    protected getValidateSpecialtyOrderService(middlewareService: MiddlewareService) {
        return new ValidateSpecialtyOrderService(middlewareService, this.getValidateSpecialtyOrderAdapter());
    }

    protected initializeErrorLogger() {
        // TODO: implement logger
    }

    protected initializeUncaughtExceptionHandler() {
        // TODO:  Better solution, this makes it so you don't have to comment out the lines but doesn't solve the underlying race condition
        setTimeout(
            () =>
                setJSExceptionHandler((e, isFatal) => {
                    const errorMessage = `Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}`;
                    // write uncaught exception out to implemented logging solution
                    this.logger.error(`Uncaught exception: ${errorMessage}`);
                    if (isFatal) {
                        // reporter(e);
                        Alert.alert(
                            'Unexpected error occurred',
                            `${errorMessage}. We have reported this to our team ! Please close the app and start again!`,
                            [
                                {
                                    text: 'Close',
                                },
                            ]
                        );
                    } else {
                        // don't know the format of this uncaught exception, don't want to just see [Object object] in console
                        // if it's a string it should work fine, if it's an object we'll see all of it
                        this.logger.warn('handling uncaught exception: ' + JSON.stringify(e)); // So that we can see it in the ADB logs in case of Android if needed
                    }
                }, false),
            500
        );
    }

    protected async onLogout() {
        // TODO:  Figure out a way to unmount all components past login
        this.sessionHandler = null;
        this._features = this.getFeatures(this.appDataSubject, this.appDataSubjectEs);
        // Resets reference to service executor, and therefore middleware service
        // This clears out all cache, because getServiceExecutor news up a new reference if there isn't one already
        this.serviceExecutor = null;
        this.getServiceExecutor().execute(APP_INIT, {
            payload: this.state.selectedLanguage,
            showLoadingIndicator: false,
        });
    }

    protected updateAppData(appData: AppData, language: Languages = Languages.EN) {
        if (language === Languages.EN) {
            this.appDataSubject.next(appData);
        } else {
            this.appDataSubjectEs.next(appData);
        }
        this.updateLabels(appData.labels, language);
    }

    protected updateLabels(labelOverrides: Labels, language: Languages) {
        const existingLabels = this._labels.get(language);
        const mergedLabels = merge(existingLabels, labelOverrides);
        this._labels.set(language, mergedLabels);
    }
}
