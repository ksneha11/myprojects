import React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { TextLink } from '../..';
import { IconNames } from '../../../styles';
import StyledComponent, { StyleProps } from '../../styledComponent';
import Icon from '../icon';
import AppStatusBar from '../statusBar';
import { defaultStyle, InAppBrowserStyleSchema } from './index';

// TODO: use real import
// https://stackoverflow.com/questions/44597732/how-to-clear-react-native-webview-cookies
// tslint:disable-next-line: no-implicit-dependencies no-var-requires
const RCTNetworking = require('RCTNetworking');

export interface Props extends StyleProps {
    children?: (parent: InAppBrowserView) => React.ReactNode;
    goBack: noop;
    goBackBrowser: noop;
    goForward: noop;
    headers?: any;
    onMessage?: (data: any) => void;
    setBrowserRef: (component: WebView) => void;
    style?: Partial<InAppBrowserStyleSchema>;
    url: string;
}

interface State {
    isLoading: boolean;
}

export const defaultProps = {
    children: ({ LoadingIndicator, NavBar, WebViewContainer }: InAppBrowserView) => {
        return (
            <>
                <AppStatusBar lightBackground />
                <NavBar />
                <LoadingIndicator />
                <WebViewContainer />
            </>
        );
    },
};

export default class InAppBrowserView extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'InAppBrowser';
    public style: InAppBrowserStyleSchema;

    constructor(props: Props) {
        super(props);

        this.state = {
            isLoading: true,
        };
    }

    public componentDidMount() {
        /*
         * if this line isn't here, the browser will keep all the previous cookies
         * we need to move this to a logout callback to make sure we don't keep the cookies in the app
         */
        // TODO: move this to on logout function
        RCTNetworking.clearCookies(() => {});
    }

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public LoadingIndicator = () => {
        return (
            <View
                style={{
                    ...this.style.loadingIndicator,
                    ...(!this.state.isLoading && this.style.loadingIndicatorDone),
                }}
            >
                <ActivityIndicator
                    animating={this.state.isLoading}
                    color={this.context.appContext.colorSchema.loadingIndicatorColor}
                    size="large"
                />
            </View>
        );
    };

    public NavBar = () => {
        const navLabels = this.labels.inAppBrowser.navBar;
        return (
            <SafeAreaView style={this.style.navBar}>
                <TextLink
                    accessibilityLabel={navLabels.accessibilityLabels.backLabel}
                    onPress={this.props.goBack}
                    style={{ textLink: this.style.navBarBack }}
                >
                    {this.labels.inAppBrowser.navBar.back}
                </TextLink>
                <View style={this.style.navBarArrows}>
                    <Icon
                        accessibilityLabel={navLabels.accessibilityLabels.backBrowser}
                        accessibilityRole="button"
                        onPress={this.props.goBackBrowser}
                        name={IconNames.NAVIGATE_BACK}
                        style={{ rootItem: this.style.navBarArrow }}
                    />
                    <Icon
                        accessibilityLabel={navLabels.accessibilityLabels.forwardBrowser}
                        accessibilityRole="button"
                        onPress={this.props.goForward}
                        name={IconNames.LIST_ITEM_NAVIGATE_ICON}
                        style={{ rootItem: this.style.navBarArrow }}
                    />
                </View>
            </SafeAreaView>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public WebViewContainer = () => {
        return (
            <View style={this.style.webViewContainer}>
                {/* Don't display anything if the URL is empty, instead of spinning forever; */}
                {this.props.url ? (
                    <WebView
                        onLoadEnd={() => this.setState({ isLoading: false })}
                        onLoadStart={() => {
                            setTimeout(() => {
                                this.setState({ isLoading: false });
                            }, 15000);
                            return this.setState({ isLoading: true });
                        }}
                        onMessage={event => this.onMessage(event)}
                        originWhitelist={['*']}
                        ref={this.props.setBrowserRef}
                        source={{ uri: this.props.url, headers: this.props.headers || {} }}
                    />
                ) : (
                    this.logger.warn(`Url not recognized: ${this.props.url}`)
                )}
            </View>
        );
    };

    protected onMessage = event => {
        const { onMessage } = this.props;
        if (onMessage) {
            this.props.onMessage(event.nativeEvent.data);
        }
    };
}
