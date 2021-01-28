import React from 'react';
import ModalConfig from '../../models/modalConfig';
import AppComponent from '../common/appComponent';
import { GlobalModalView, ViewProps } from './';

interface State {
    bodyText: Children;
    isVisible: boolean;
    onPressBackdrop: noop;
    onPressPrimaryButton: noop;
    onPressSecondaryButton: noop;
    primaryButtonTitle: string;
    secondaryButtonTitle: string;
    title: string;
}

interface Props extends Partial<ViewProps> {}

const defaultProps = {};

export abstract class GlobalModalHandler extends AppComponent<Props, State> {
    protected static reference: GlobalModalHandler = null;

    public static hide() {
        GlobalModalHandler.reference.hide();
    }

    public static show(modalConfig: ModalConfig) {
        GlobalModalHandler.reference.show(modalConfig);
    }

    protected abstract hide();

    protected abstract show(modalConfig: ModalConfig);
}

export default class GlobalModal extends GlobalModalHandler {
    public static defaultProps = defaultProps;
    constructor(props: any) {
        super(props);
        this.state = {
            bodyText: '',
            isVisible: false,
            onPressBackdrop: () => {
                this.setState({ isVisible: false });
            },
            onPressPrimaryButton: GlobalModalHandler.hide,
            onPressSecondaryButton: () => {},
            primaryButtonTitle: '',
            secondaryButtonTitle: '',
            title: '',
        };
        GlobalModalHandler.reference = this;
    }

    public componentDidMount(): void {
        // TODO figure out a better way. appContext is not initialized in the constructor, so we need to put this in the didMount function
        this.setState({ primaryButtonTitle: this.appContext.labels.errorModal.primaryText });
    }

    public hide = () => {
        this.setState({
            bodyText: '',
            isVisible: false,
            onPressPrimaryButton: GlobalModalHandler.hide,
            onPressSecondaryButton: () => {},
            primaryButtonTitle: this.appContext.labels.errorModal.primaryText,
            secondaryButtonTitle: '',
            title: '',
        });
    };

    public render() {
        return (
            <GlobalModalView
                bodyText={this.state.bodyText}
                isVisible={this.state.isVisible}
                onClose={this.state.onPressBackdrop}
                onPressPrimaryButton={this.state.onPressPrimaryButton}
                onPressSecondaryButton={this.state.onPressSecondaryButton}
                primaryButtonTitle={this.state.primaryButtonTitle}
                secondaryButtonTitle={this.state.secondaryButtonTitle}
                title={this.state.title}
                {...this.props}
                style={this.style}
            />
        );
    }

    public show = (modalConfig: ModalConfig) => {
        this.setState({
            bodyText: modalConfig.bodyText,
            isVisible: true,
            onPressBackdrop: modalConfig.onPressBackdrop || this.state.onPressBackdrop,
            onPressPrimaryButton: modalConfig.onPressPrimaryButton || this.state.onPressPrimaryButton,
            onPressSecondaryButton: modalConfig.onPressSecondaryButton || this.state.onPressSecondaryButton,
            primaryButtonTitle: modalConfig.primaryButtonTitle || this.appContext.labels.errorModal.primaryText,
            secondaryButtonTitle: modalConfig.secondaryButtonTitle,
            title: modalConfig.title,
        });
    };
}
