import React from 'react';
import { ActivityIndicator } from 'react-native';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { LoadingIndicatorStyleSchema } from './loadingIndicator.style';
import Modal from './modal';

interface Props extends StyleProps {
    style?: Partial<LoadingIndicatorStyleSchema>;
}

interface State {
    isVisible: boolean;
}

export abstract class LoadingIndicatorHandler extends StyledComponent<Props, State> {
    protected static reference: LoadingIndicator = null;
    public static hide() {
        LoadingIndicator.reference.setState({ isVisible: false }, () => {
            LoadingIndicator.reference.startLoadingIndicatorTimeout();
        });
    }
    public static show() {
        LoadingIndicator.reference.setState({ isVisible: true });
    }

    public startLoadingIndicatorTimeout = () => {
        // Bug where sometimes there's an infinite spinner even after .hide is called, triggering a re-render again in hopes it will work later on.
        setTimeout(() => {
            if (!this.state.isVisible) {
                this.setState({ isVisible: false }, this.forceUpdate);
            }
        }, 1000);
    };
}

export class LoadingIndicator extends LoadingIndicatorHandler {
    public defaultStyle = defaultStyle;
    public name = 'LoadingIndicator';
    public style: LoadingIndicatorStyleSchema;

    constructor(props) {
        super(props);

        this.state = { isVisible: false };
        LoadingIndicator.reference = this;
    }

    public render() {
        return (
            <Modal
                isVisible={this.state.isVisible}
                onClose={() => {}}
                overlayBackgroundColor={this.style.overlay.backgroundColor}
                style={{ backdrop: this.style.overlay, rootContainer: this.style.rootContainer }}
            >
                <ActivityIndicator color={this.context.appContext.colorSchema.loadingIndicatorColor} size="large" />
            </Modal>
        );
    }
}
