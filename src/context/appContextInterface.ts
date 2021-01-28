import { AnalyticsService } from 'atlas-services/src/services';
import SessionHandler from 'atlas-services/src/services/sessionHandler';
import { ImageProps } from 'react-native';
import { NavigationContainer } from 'react-navigation';
import { AppInitializer } from '.';
import { DefaultAppStateActions, Features } from '../models';
import AppState from '../models/appState';
import { ColorSchema, IconNames, ImageNames, StyleSheetSchema } from '../styles';
import { Logger } from '../utils';
import { SurveyService } from '../utils/surveys';
import { ComponentOverride, Labels } from './abstractAppContext';
import { AppContent } from './content/content';
import { NavigationHandler } from './navigation';
import { ServiceExecutor } from './services';

/*
 * this is an interface for all the brand specific features that will be used throughout the app
 * the app will take a brand specific implementation of the AppContext as a prop and use that throughout the system
 */
export default interface AppContextInterface {
    appStateActions: DefaultAppStateActions;
    colorSchema: ColorSchema;
    content: AppContent;
    readonly features: Features;
    labels: Labels;
    logger: Logger;
    state: AppState;
    styleOverrides: StyleSheetSchema;
    /*
     * this function isn't meant to be consumed by the components in Atlas
     * this is specifically to bind the appContext to global AppState, which is held outside of the app context
     */
    _bind(
        updateAppState: (reducer: (appState: AppState, ...params) => Partial<AppState>, ...params) => Promise<void>
    ): AppInitializer;
    /*
     * this function isnt meant to be consumed by the components in Atlas
     * this is specifically for adding components/contexts that wrap the entire app
     * this is to be used in the index.js file, wrapping the actual <App> call
     * this will allow individual apps to include libraries we don't need at the atlas level that require wrapping teh entire App in a context
     */
    _wrapApp(children: Children): Children;
    getAnalyticsService(): AnalyticsService;
    getBiometrics?(): JSX.Element;
    getBottomDrawer?({ children }: { children: Children }): JSX.Element;
    /**
     * Use in a component to allow overriding children on an app level.  An app can provide a custom implementation of children,
     * and that will be used everywhere it is called rather than the default children
     * Use in default props only!  Easiest use is adding "appContext.getComponentOverride(name)?.(context) ?? [regular default children]" in default props
     * @param {string} name Component name, should typically be passed as this.name
     */
    getComponentOverride(name: string): ComponentOverride;
    getErrorModal(): JSX.Element;
    getGlobalModal?(): JSX.Element;
    getIcon(name: IconNames, iconProps?: any): JSX.Element;
    getImage(name: ImageNames, imageProps?: Partial<ImageProps>): JSX.Element;
    getInjectedContent?(): JSX.Element;
    getLoadingIndicator(): JSX.Element;
    getNavigationHandler(): NavigationHandler;
    getRootNavigator(): NavigationContainer;
    getServiceExecutor(): ServiceExecutor;
    getSessionHandler(): SessionHandler;
    getSurveyService(): SurveyService;
    inactivityWrapper(children: Children): JSX.Element;
    isCurrentLocationRequired(): boolean;
    isMockMode(): boolean;
}
