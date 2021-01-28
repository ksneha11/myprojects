import { NavigationBackActionPayload } from 'react-navigation';
import { AppContextInterface } from '../../context';
import { NavigationAction, NavigationHandler } from '../../context/navigation';
import { FeatureNames } from '../../models';
import AppState from '../../models/appState';
import { Foresee } from '../../utils';
import StyledComponent from '../styledComponent';

/**
 * Class which makes the app context available (this.context).
 * @extends StyledComponent
 * provides the utility setAppState and a wrapper for navigationHandler.navigate
 * new components needing this functionality should extend AppComponent
 */

export default class AppComponent<
    P = {},
    S = {},
    C extends AppContextInterface = AppContextInterface
> extends StyledComponent<P, S, C> {
    public getNavigationParams(key: string): any {
        const navigationHandler: NavigationHandler = this.context.appContext.getNavigationHandler();
        return navigationHandler.getParams(key);
    }

    // not sure how often these surveys are going to be used, but it seems like they'll be in a number
    // of components going forward
    // going to put the launch survey action in here

    // Survey is AppTentive right now.

    public launchForeSeeSurvey = () => {
        if (this.features.isRendered(FeatureNames.FORESEE)) {
            new Foresee(this.appContext).launchSurvey();
        }
    }

    public launchSurvey = (surveyEvent?: string) => {
        const surveyEnabled = this.features.isRendered(FeatureNames.APPTENTIVE);
        if (surveyEnabled) {
            this.appContext.getSurveyService().launchSurvey(surveyEvent);
        } else {
            this.logger.info('launch survey was called but no survey is enabled - this may be unintentional');
        }
    };

    // todo: replace this with a direct link to app's navigationHandler.navigate
    public navigate(navigationAction: string, navigationParams?: any) {
        const navigationHandler: NavigationHandler = this.context.appContext.getNavigationHandler();
        navigationHandler.navigate(new NavigationAction(navigationAction, navigationParams));
    }

    public navigateBack(key?: NavigationBackActionPayload) {
        const navigationHandler: NavigationHandler = this.context.appContext.getNavigationHandler();
        return navigationHandler.navigateBack(key);
    }

    /**
     *
     * @deprecated
     */
    public setAppState(updater: (appState: AppState) => AppState) {
        this.appContext.state = updater({ ...this.appState });
        this.context.updateAppState(this.appContext);
    }

    public setNavigationParams(params: any) {
        const navigationHandler: NavigationHandler = this.context.appContext.getNavigationHandler();
        navigationHandler.setParams(params);
    }
}
