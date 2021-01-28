import { LOGOUT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { MoreMenuHotActions, ProfileActions } from '../../../context/navigation/actions';
import AppComponent from '../appComponent';
import MenuPagesView, { defaultProps as viewDefaultProps, Props as ViewProps } from './menuPages.view';

export interface Props extends ViewProps {}

export const defaultProps = {
    ...viewDefaultProps,
};

export default class MenuPages extends AppComponent<Partial<Props>> {
    public static defaultProps = defaultProps;

    public render() {
        return (
            <MenuPagesView onMenuItemPress={(action, param) => this.onMenuItemPress(action, param)} {...this.props} />
        );
    }

    protected handleNavigation = (action: string, param: {} = {}) => {
        if (Object.entries(param).length !== 0) {
            this.navigate(action, param);
        } else {
            this.navigate(action);
        }
    };

    protected onMenuItemPress = (action: string, param?: {}) => {
        const logoutActions: string[] = [MoreMenuHotActions.LOGOUT_PRESSED, ProfileActions.LOGOUT_PRESSED];
        if (action) {
            logoutActions.includes(action) ? this.onPressLogout(action) : this.handleNavigation(action, param);
        }
    };

    protected onPressLogout = (action: string) => {
        // todo: if the logout call here changes to do something useful, rethink our error handling strategy
        this.appContext
            .getServiceExecutor()
            .execute(LOGOUT, {
                errorConfig: { showModal: () => false },
            })
            .finally(() => this.navigate(action));
    };
}
