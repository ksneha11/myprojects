import React from 'react';
import { NavigationParams, NavigationScreenProp } from 'react-navigation';
import AppComponent from '../../common/appComponent';
import { InAppBrowser } from '../../common/inAppBrowser';
import { StyleProps } from '../../styledComponent';

interface Props extends StyleProps {
    navigation: NavigationScreenProp<NavigationParams, any>;
}

export default class ContactInfoPortal extends AppComponent<Props> {
    public name = 'ContactInfoPortal';

    public render() {
        return <InAppBrowser goBack={this.props.navigation.pop} url={this.getUrl()} />;
    }

    // temporary function until post-init migration
    protected getUrl = (): string => {
        if (this.appContext.content.deeplinks.contactInfoPortal) {
            return this.appContext.content.deeplinks.contactInfoPortal;
        } else {
            // TODO: fix abstraction here and change warning ~ SEE CHANGE PCP
            this.logger.warn(`Invalid stateLob for ContactInfoPortal`);
            return '';
        }
    };
}
