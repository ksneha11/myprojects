import { NavigationActions, NavigationBackActionPayload } from 'react-navigation';
import { getActiveRoute } from '../../utils/';
import NavigationAction from './navigationAction';
import { default as NavigationHandler, Navigator } from './navigationHandler';

export default abstract class AbstractNavigationHandler implements NavigationHandler {
    // @ts-ignore
    protected navigator: Navigator;

    // can't do this during instantiation ~ limitation on the framework itself
    // otherwise would make this a protected readonly variable that gets passed into the constructor
    public __provideNavigator(navigator: Navigator) {
        this.navigator = navigator;
    }

    public getParams(key: string) {
        // @ts-ignore the type is wrong
        const currentParams = this.navigator && getActiveRoute(this.navigator.state.nav).params;
        return currentParams && currentParams[key];
    }

    // typescript gotcha ~ for whatever reason typescript compiler is making me declare this as abstract
    public abstract navigate(action: NavigationAction);

    public navigateBack(key?: NavigationBackActionPayload) {
        this.navigator.dispatch(NavigationActions.back(key));
    }

    public setParams(params: { [key: string]: any }) {
        this.navigator.dispatch(
            // @ts-ignore the type is wrong
            NavigationActions.setParams({ key: getActiveRoute(this.navigator.state.nav).key, params })
        );
    }
}
