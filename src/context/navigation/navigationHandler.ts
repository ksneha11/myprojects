import { NavigationBackActionPayload, NavigationContainerComponent, NavigationState } from 'react-navigation';
import NavigationAction from './navigationAction';

export type Navigator = NavigationContainerComponent;

export default interface NavigationHandler {
    __provideNavigator(navigator: Navigator): void;
    getParams(key: string): any;
    navigate(action: NavigationAction): void;
    navigateBack(key?: NavigationBackActionPayload): void;
    setParams(params: { [key: string]: any }): void;
}
