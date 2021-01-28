import JailMonkey from 'jail-monkey';
import React from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { DialogModal } from '../common';
import StyledComponent, { StyleProps } from '../styledComponent';

interface Props extends StyleProps {
    children?: (component: JailbreakAlert) => React.ReactNode;
}

interface State {
    isModalVisible: boolean;
}

const defaultProps = {
    children: ({ JailbreakAlertModal }: JailbreakAlert): React.ReactNode => <JailbreakAlertModal />,
};

export default class JailbreakAlert extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public name = 'JailbreakAlert';

    public constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        };
    }

    public componentDidMount() {
        this.shouldDisplayModal();
    }

    public JailbreakAlertModal = () => {
        const labels = this.labels.login.jailbreakAlert;
        return (
            <DialogModal
                bodyText={Platform.select({ android: labels.bodyAndroid, ios: labels.bodyIOS })}
                isSingleButton
                isVisible={this.state.isModalVisible}
                onClose={() => {}}
                onPressPrimaryButton={() => {}}
                primaryButtonTitle={labels.primaryButton}
                title={labels.title}
            />
        );
    };

    public render() {
        return this.props.children(this);
    }

    /* 
        Despite being synchronous, DeviceInfo.isEmulatorSync() errors if run outside of an async method 
        Not using the sync version avoids this issue altogether
        https://github.com/react-native-community/react-native-device-info/issues/776
    */
    protected shouldDisplayModal = async () => {
        const isLocalDevelopment = await DeviceInfo.isEmulator();
        if (!isLocalDevelopment && JailMonkey.isJailBroken()) {
            this.setState({ isModalVisible: true });
        }
    };
}
