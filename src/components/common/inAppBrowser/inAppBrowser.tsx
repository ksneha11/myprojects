import React from 'react';
import WebView from 'react-native-webview';
import { StyleProps } from '../../styledComponent';
import AppComponent from '../appComponent';
import { InAppBrowserView } from './';

interface Props extends StyleProps {
    children?: (parent: InAppBrowserView) => React.ReactNode;
    goBack?: noop;
    url: string;
    useSMCookie?: boolean;
}

const defaultProps = {
    useSMCookie: true,
};

export default class InAppBrowser extends AppComponent<Props> {
    public static defaultProps = defaultProps;
    protected browserRef: WebView;

    public render() {
        this.logger.info(`opening InAppBrowser with url ${this.props.url}`);

        return (
            <InAppBrowserView
                goBackBrowser={this.goBackBrowser}
                goForward={this.goForward}
                headers={this.getHeaders()}
                goBack={this.goBack}
                setBrowserRef={ref => (this.browserRef = ref)}
                style={this.style}
                {...this.props}
            />
        );
    }

    protected getCookie = () => {
        const cookie = this.appContext.getSessionHandler().siteminderSession;
        this.logger.info(`using cookie for webview: ${cookie}`);
        return cookie;
    };

    protected getHeaders = (): any => {
        return {
            Cookie: this.props.useSMCookie ? this.getCookie() : '',
        };
    };

    protected goBack = () => {
        this.navigateBack();
    };

    protected goBackBrowser = () => {
        if (this.browserRef) {
            this.browserRef.goBack();
        }
    };

    protected goForward = () => {
        if (this.browserRef) {
            this.browserRef.goForward();
        }
    };

    protected returnToApp = () => {
        // TODO: Use this.navigate.goBack when it exists
        this.props.goBack();
    };
}
