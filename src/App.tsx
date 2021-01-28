import { AnalyticsService } from 'atlas-services/src/services';
import { diff } from 'deep-object-diff';
import isEqual from 'lodash.isequal';
import React from 'react';
import { YellowBox } from 'react-native';
import {
    NavigationAction,
    NavigationActions,
    NavigationContainer,
    NavigationRoute,
    NavigationState,
    StackActions,
} from 'react-navigation';
import { AppContextInterface, AppInitializer } from './context';
import { NavigationHandler } from './context/navigation';
import { AppStateActions } from './models';
import AppState from './models/appState';
import { getActiveRoute } from './utils';
import './utils/fixTimerBug'; // TODO: why's this here?

// tslint:disable-next-line: interface-name
interface Props {
    appContext: AppContextInterface;
}

interface State {
    appContext: AppContextInterface;
    updateAppState: (appContext: AppContextInterface) => void;
}

YellowBox.ignoreWarnings([
    'Each child',
    'Remote debugger',
    'VirtualizedList',
    'Module RNPinch',
    'Network request failed',
]);

export const AppContext = React.createContext({
    appContext: {} as AppContextInterface,
    updateAppState: (appContext: AppContextInterface) => {},
});

export default class App extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        // State also contains the updater function so it will
        // be passed down into the context provider
        this.state = {
            appContext: this.props.appContext,
            updateAppState: this.updateAppState,
        };
    }

    public async componentDidMount() {
        const appInitializer: AppInitializer = this.props.appContext._bind(this.callStateUpdate);
        appInitializer.onComponentDidMount();
    }

    public componentDidUpdate = (prevProps: Props, prevState: State) => {
        const currentAppState = this.state.appContext.state;
        const prevAppState = prevState.appContext.state;
        if (!isEqual(currentAppState, prevAppState)) {
            // tslint:disable-next-line: no-console
            console.groupCollapsed([]);
            // tslint:disable-next-line: no-console
            console.log(currentAppState);
            // tslint:disable-next-line: no-console
            console.groupEnd();
        }
    };

    public render() {
        const { appContext } = this.props;
        const RootNavigator: NavigationContainer = appContext.getRootNavigator();
        const navigationHandler: NavigationHandler = appContext.getNavigationHandler();
        return (
            <AppContext.Provider value={this.state}>
                {appContext.getInjectedContent()}
                {appContext.inactivityWrapper(
                    <RootNavigator
                        onNavigationStateChange={(previousPage, currentPage, action) => {
                            const prevRoute = getActiveRoute(previousPage);
                            const currentRoute = getActiveRoute(currentPage);
                            if (prevRoute !== currentRoute) {
                                let message = `Navigated from ${prevRoute.routeName} to ${currentRoute.routeName}`;
                                if (currentRoute.params && Object.keys(currentRoute.params).length) {
                                    message += ` with navigation params ${JSON.stringify(currentRoute.params)}`;
                                }
                                appContext.logger.info(message);
                            }
                            this.trackEvent(previousPage, currentPage, action);
                        }}
                        ref={navigator => {
                            navigationHandler.__provideNavigator(navigator);
                        }}
                        screenProps={this.props}
                    />
                )}
            </AppContext.Provider>
        );
    }

    /*
     * TODO - Need to figure a better way to exclude pages that we do not need to track.
     * One way is to move this to atlas-services but currently atlas-services does not have navigation
     * We might able to create a similar navigation types in atlas-services and perform the same logic over there.
     */
    public trackEvent(previousPage: NavigationState, currentPage: NavigationState, action: NavigationAction) {
        const analyticsService: AnalyticsService = this.props.appContext.getAnalyticsService();
        const previousPageName: string = (getActiveRoute(previousPage) as NavigationRoute).routeName;
        const currentPageName: string = (getActiveRoute(currentPage) as NavigationRoute).routeName;
        if (
            action.type === NavigationActions.NAVIGATE &&
            analyticsService.shouldTrack(previousPageName, currentPageName)
        ) {
            analyticsService.track({ name: previousPageName }, action.routeName);
        } else if (action.type === StackActions.COMPLETE_TRANSITION) {
            analyticsService.track({ name: currentPageName });
        } else if (action.type === StackActions.RESET) {
            analyticsService.track({ name: previousPageName }, currentPageName);
        } else if (action.type === StackActions.POP) {
            analyticsService.track({ name: previousPageName }, 'BackButton');
        }
    }

    public updateAppState = (appContext: AppContextInterface) => {
        this.setState(state => ({
            appContext,
        }));
    };

    // this must stay an arrow function
    // this gets passed into app context, we don't want any weird implicit binding issues
    protected callStateUpdate = async (
        reducer: (appState: AppState, ...params) => Partial<AppState>,
        ...params
    ): Promise<void> => {
        return new Promise(resolve => {
            this.setState(
                previousAppState => {
                    const updatedAppState = {
                        ...previousAppState.appContext.state,
                        // TODO: future enhancement
                        // i *think* we can modify this to strongly type the reducers
                        // if we pass the previous app state + the params, we can pass all those into the reducer function and keep it strongly typed
                        // the reducer function will return the app state, we can merge that
                        // i think that will work
                        // leaving a note here for future enhancement
                        ...reducer(previousAppState.appContext.state, ...params),
                    };
                    this.logAppStateChange(previousAppState.appContext.state, reducer, updatedAppState);
                    previousAppState.appContext.state = updatedAppState;
                    return previousAppState;
                },
                () => resolve()
            );
        });
    };

    // TODO: Extract this function into a separate logging class as part of a separate story
    // TODO: this should be configurable or only show on debug - it makes the logs hard to parse in a lot of cases
    protected logAppStateChange = (prevState, reducer, updatedAppState) => {
        const functionString: string = reducer.toString();
        const argumentString: string =
            functionString.substring(functionString.lastIndexOf('(') + 1, functionString.lastIndexOf(')')) || '';
        const splitArguments: string[] = argumentString.split(',');
        // FIXME: figure out the correct regex for the replacement; /\{\}/ did not work
        const sectionName: string = splitArguments
            .pop()
            .replace('{', '')
            .replace('}', '')
            .trim();
        // tslint:disable-next-line: no-console
        console.group('Application State Updated: ', sectionName);
        // tslint:disable-next-line: no-console
        console.log('%c prev state\t\t', 'color: gray; font-weight: bold', prevState);
        // tslint:disable-next-line: no-console
        console.log('%c next state\t\t', 'color: green; font-weight: bold', updatedAppState);
        // tslint:disable-next-line: no-console
        console.log('%c difference\t\t', 'color: darkcyan; font-weight: bold', diff(prevState, updatedAppState));
        // tslint:disable-next-line: no-console
        console.groupEnd();

        // this ensures logcat receives meaningful logging information
        // tslint:disable-next-line: no-console
        console.groupCollapsed(`Logcat-Application State Updated: ${sectionName}`);
        // tslint:disable-next-line: no-console
        console.log(`Prev state\t\t ${JSON.stringify(prevState)}`);
        // tslint:disable-next-line: no-console
        console.log(`Next state\t\t ${JSON.stringify(updatedAppState)}`);
        // tslint:disable-next-line: no-console
        console.log(`Difference\t\t ${JSON.stringify(diff(prevState, updatedAppState))}`);
        // tslint:disable-next-line: no-console
        console.groupEnd();
    };
}
