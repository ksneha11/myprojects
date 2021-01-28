import { Languages } from 'atlas-services/src/models';
import { APP_INIT, ServiceEndpoint } from 'atlas-services/src/services/middleware/serviceEndpoint';
import { AccessibilityInfo, NativeModules, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { AppContextInterface } from '.';
import { getInitialAppState } from '../context/initialAppState';
import { NavigationAction as AtlasNavigationAction } from '../context/navigation';
import { deleteBiometrics } from '../context/storage/appBiometrics.storage';
import { getFirstLoadDone, setFirstLoadDone } from '../context/storage/firstload.storage';
import { removeRememberedUserName } from '../context/storage/rememberedUsername.storage';
import { getSelectedLanguage, setSelectedLanguage } from '../context/storage/selectedLanguage.storage';
import { FeatureNames } from '../models';
import { currentLocation } from '../utils';
import { SurveyEvents } from '../utils/surveys';
import { LoginActions } from './navigation/actions';

export default interface AppInitializer {
    onComponentDidMount();
}

export class DefaultAppInitializer implements AppInitializer {
    constructor(protected readonly appContext: AppContextInterface) {}

    public onComponentDidMount() {
        this.setDefaultLanguage();
        // TODO: this seems sketchy to me
        // they want the survey to register app launch before we get to the login page
        // calling it before app init but not sure if this is right
        // TODO: FIXME: - this SHOULD probably wait until the survey promise resolve/reject to do app init
        // not 100% sure how they wnt to handle this yet
        // checking in for now and just going to let it be until we get on the call with these guys
        // need to figure out what to do with Foresee here once we do that

        // Check if Survey (AppTentive) is enabled the same way AppComponents do
        if (this.appContext.features.isRendered(FeatureNames.APPTENTIVE)) {
            this.appContext.getSurveyService().launchSurvey(SurveyEvents.APP_LAUNCH);
        }
        this.appInitCall();
        AccessibilityInfo.addEventListener(
            // @ts-ignore TS doesn't recognize eventName although it works
            'screenReaderChanged',
            this.appContext.appStateActions.accessibility.setScreenReaderEnabled
        );
        AccessibilityInfo.fetch().then(this.appContext.appStateActions.accessibility.setScreenReaderEnabled);
    }

    protected appInitCall = async () => {
        // we need to hit AppInit and only hide the splash screen once app init returns
        const selectedLanguage = this.appContext.state.selectedLanguage;
        // TODO: Fix.  Temporary fix in case the user gets to the login screen while they're still logged in, clearing context for app init call
        await this.appContext.appStateActions.memberContext.setMemberContext({ ...getInitialAppState().memberContext });

        if (await this.isFirstLaunch()) {
            this.setLanguageForAppFirstLoad();
            await this.doFirstLaunchActivities();
        }
        this.appContext
            .getServiceExecutor()
            .execute(APP_INIT, { payload: selectedLanguage })
            // This will be removed once all apps use appinit/real services
            // A retry modal will also need to be implemented, so the .finally can be removed
            .finally(() => {
                if (this.appContext.isCurrentLocationRequired() && !this.appContext.state.isCurrentLocationRequested) {
                    currentLocation(
                        location => {
                            this.onCurrentLocationSuccess(location);
                            this.navigateToLogin();
                        },
                        () => {
                            this.onCurrentLocationFailure();
                            this.navigateToLogin();
                        }
                    );
                } else {
                    this.navigateToLogin();
                }
            });
        // get app init of non-selected language, to store if the user switches languages
        this.callNonSelectedLanguage(APP_INIT, selectedLanguage);
    };

    protected callNonSelectedLanguage = (serviceEndpoint: ServiceEndpoint, selectedLanguage: Languages) => {
        this.appContext.getServiceExecutor().execute(serviceEndpoint, {
            payload: selectedLanguage === Languages.EN ? Languages.ES : Languages.EN,
            showLoadingIndicator: false,
        });
    };

    protected async deleteStaleKeyChainEntries() {
        // if stale data left from last installation
        // KeyChain data is not deleted after uninstallation, so it has to be deleted
        // explicitly
        try {
            await deleteBiometrics();
            await removeRememberedUserName();
        } catch (e) {
            this.appContext.logger.warn('Error in deleteStaleKeyChainEntries', e);
        }
    }

    protected async doFirstLaunchActivities() {
        if (Platform.OS === 'ios') {
            await this.deleteStaleKeyChainEntries();
        }
        await setFirstLoadDone();
    }

    protected async isFirstLaunch(): Promise<boolean> {
        const firstLoadDone = await getFirstLoadDone();
        this.appContext.logger.info(`First load, ${!firstLoadDone}`);
        return !firstLoadDone;
    }

    protected navigateToLogin = () => {
        SplashScreen.hide();
        this.appContext.getNavigationHandler().navigate(new AtlasNavigationAction(LoginActions.GO_TO_LOGIN));
    };

    protected onCurrentLocationFailure = () => {
        this.appContext.appStateActions.location.setLocationRequestStatus(true);
    };

    protected onCurrentLocationSuccess = location => {
        this.appContext.appStateActions.location.setCurrentLocation(location);
        this.appContext.appStateActions.location.setLocationRequestStatus(true);
    };

    // TODO: need help with this
    protected async setDefaultLanguage() {
        const selectedLanguage: Languages = await getSelectedLanguage();
        if (selectedLanguage) {
            if (selectedLanguage !== this.appContext.state.selectedLanguage) {
                this.appContext.appStateActions.languages.updateSelectedLanguage(selectedLanguage);
            }
        } else {
            setSelectedLanguage(Languages.EN);
        }
    }

    protected setLanguageForAppFirstLoad = () => {
        const appLanguage =
            Platform.OS === 'ios'
                ? NativeModules.SettingsManager.settings.AppleLocale
                : NativeModules.I18nManager.localeIdentifier;
        if (appLanguage === 'es_US') {
            this.appContext.appStateActions.languages.updateSelectedLanguage(Languages.ES);
        }
    };
}
