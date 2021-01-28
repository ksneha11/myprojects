import React from 'react';
import { BenefitsActions } from '../../context/navigation/actions';
import AppComponent from '../common/appComponent';
import { InAppBrowser } from '../common/inAppBrowser';

export default class RenewalWebsite extends AppComponent {
    public name = 'RenewalWebsite';

    public render() {
        return (
            <InAppBrowser
                goBack={() => this.navigate(BenefitsActions.WEBVIEW_GO_BACK_PRESSED)}
                url={this.getNavigationParams('url')}
                useSMCookie={this.getNavigationParams('useSMCookie')}
            />
        );
    }
}
