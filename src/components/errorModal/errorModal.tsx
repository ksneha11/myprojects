import { ServiceException } from 'atlas-services/src/models';
import React from 'react';
import { Platform } from 'react-native';
import { StaticContentActions } from '../../context/navigation/actions';
import { ErrorConfig, Pressable } from '../../models';
import AppComponent from '../common/appComponent';
import { StyleProps } from '../styledComponent';
import { ErrorModalView } from './';

interface State {
    footerText: string;
    isVisible: boolean;
    links: Pressable[];
    message: string;
    primaryButtonTitle: string;
    returnToLogin?: boolean;
    secondaryButtonTitle: string;
    tertiaryButtonTitle: string;
    title: string;
}
export interface Props extends StyleProps {}

const defaultProps = {};

// If you want to set the title, content, or primary, secondary, or tertiary button text, that's set in the ServiceExceptions.json file.
// You can set whether the modal is displayed and what actions are taken when the user taps the primary or secondary button
export abstract class ErrorHandler<P extends Props = Props> extends AppComponent<P, State> {
    public static getFooterText;
    public static getOnPressBackground;
    public static getOnPressFooter;
    public static getPrimaryButtonAction;
    public static getSecondaryButtonAction;
    public static getTertiaryButtonAction;
    protected static reference: ErrorHandler = null;
    public static hide() {
        ErrorHandler.reference.hide();
    }

    public static show(errorBody: ServiceException, errorConfig: ErrorConfig) {
        ErrorHandler.reference.show(errorBody, errorConfig);
    }
    protected abstract hide();

    protected abstract show(errorBody: ServiceException, errorConfig: ErrorConfig);
}

class ErrorModal<P extends Props = Props> extends ErrorHandler<P> {
    public static defaultProps = defaultProps;
    public name = 'ErrorModal';

    protected onPressBackground: noop;
    protected onPressFooter: noop;
    protected primaryButtonAction: noop;
    protected secondaryButtonAction: noop;
    protected tertiaryButtonAction: noop;

    constructor(props: P) {
        super(props);
        this.state = {
            footerText: '',
            isVisible: false,
            links: null,
            message: '',
            primaryButtonTitle: '',
            returnToLogin: false,
            secondaryButtonTitle: '',
            tertiaryButtonTitle: '',
            title: '',
        };
        ErrorHandler.reference = this;
    }

    public render() {
        return (
            <ErrorModalView
                onPressFooter={this.onPressFooter}
                footerText={this.state.footerText}
                links={this.state.links}
                isVisible={this.state.isVisible}
                message={this.state.message}
                onClose={this.onClose}
                onPressLink={this.onPressLink}
                onPressModalPrimaryButton={this.primaryButtonAction}
                onPressModalSecondaryButton={this.secondaryButtonAction}
                onPressModalTertiaryButton={this.tertiaryButtonAction}
                primaryButtonTitle={
                    this.state.primaryButtonTitle ? this.state.primaryButtonTitle : this.labels.errorModal.primaryText
                }
                secondaryButtonTitle={this.state.secondaryButtonTitle}
                tertiaryButtonTitle={this.state.tertiaryButtonTitle}
                title={this.state.title}
                {...this.props}
                style={this.style || {}}
            />
        );
    }

    protected hide = () => {
        this.setState({ isVisible: false });
    };

    protected onClose = () => {
        if (this.onPressBackground) {
            this.onPressBackground();
        }
        this.hide();
    };

    protected onPressLink = (url: string) => {
        this.setState({ isVisible: false }, () =>
            this.navigate(StaticContentActions.EXTERNAL_URL_PRESSED, { externalUrl: url })
        );
    };

    protected show(errorBody: ServiceException, errorConfig: ErrorConfig) {
        const {
            onPressBackground,
            onPressFooter,
            primaryButtonAction,
            secondaryButtonAction,
            tertiaryButtonAction,
        } = errorConfig;
        this.onPressBackground = () => onPressBackground && onPressBackground(errorBody.errorCode);
        this.onPressFooter = () => onPressFooter && onPressFooter(errorBody.errorCode);
        this.primaryButtonAction = () => {
            if (primaryButtonAction) {
                primaryButtonAction(errorBody.errorCode);
            }
            this.hide();
        };
        this.secondaryButtonAction = () => {
            if (secondaryButtonAction) {
                secondaryButtonAction(errorBody.errorCode);
            }
            this.hide();
        };
        this.tertiaryButtonAction = () => {
            if (tertiaryButtonAction) {
                tertiaryButtonAction(errorBody.errorCode);
            }
            this.hide();
        };
        setTimeout(
            () => {
                this.setState({
                    footerText: errorBody.hasFooter && errorConfig.footerText(errorBody.errorCode),
                    isVisible: true,
                    links: errorBody.links,
                    message: errorBody.errorMessage,
                    primaryButtonTitle: errorBody.primaryButtonTitle,
                    secondaryButtonTitle: errorBody.secondaryButtonTitle,
                    tertiaryButtonTitle: errorBody.tertiaryButtonTitle,
                    title: errorBody.errorTitle,
                });
            },
            /* The setTimeout for iOS fixes a niche issue where the iOS error modals occasionally won't show */
            // TODO - find the race condition for iOS and fix it
            Platform.OS === 'ios' ? 500 : 0
        );
    }
}

export default ErrorModal;
