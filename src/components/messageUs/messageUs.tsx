import React from 'react';
import { NavigationParams, NavigationScreenProp } from 'react-navigation';
import AppComponent from '../common/appComponent';
import { InAppBrowser } from '../common/inAppBrowser';
import { StyleProps } from '../styledComponent';
interface Props extends StyleProps {
    navigation: NavigationScreenProp<NavigationParams, any>;
}

export default class MessageUs extends AppComponent<Props> {
    public name = 'MessageUs';

    public render() {
        return <InAppBrowser goBack={this.props.navigation.pop} url={this.getUrl()} />;
    }

    // Temporary function until we get post-init done
    protected getUrl = (): string => {
        if (this.appContent.deeplinks.messageUs) {
            return this.appContent.deeplinks.messageUs;
        } else {
            // TODO: fix abstraction here and change warning ~ SEE CHANGE PCP
            this.logger.warn(`Could not open Message Us deeplink for state ${this.appState.memberContext.stateLob}`);
            return '';
        }
    };
}
