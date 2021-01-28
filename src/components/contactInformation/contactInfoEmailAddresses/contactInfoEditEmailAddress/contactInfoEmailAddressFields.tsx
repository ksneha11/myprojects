import { UPDATE_MEMBER_PREFERENCES } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { BackHandler } from 'react-native';
import { ProfileActions } from '../../../../context/navigation/actions';
import AppComponent from '../../../common/appComponent';
import { ContactInfoEmailAddressFieldsView } from './';
import { Props as ViewProps } from './contactInfoEmailAddressFields.view';

export interface State {
    bannerVisible: boolean;
    emailAddress: string;
    hasUnsavedChanges: boolean;
    isChangesNotSavedModalVisible: boolean;
    isEmailValid: boolean;
    saveEnabled: boolean;
    validateConfirmEmailOnMount?: boolean;
}
export interface Props extends Partial<ViewProps> {
    emailAddressScreenTitle: string;
    onNoChanges?: () => void;
    onSubmitPharmacyEmailAddress?: () => void;
}

const defaultProps = {};

class ContactInfoEditEmailAddress<P extends Props = Props, S extends State = State> extends AppComponent<P, S> {
    public static defaultProps = defaultProps;

    constructor(props: P) {
        super(props);
        this.state = {
            bannerVisible: false,
            emailAddress: props.emailAddress || '',
            hasUnsavedChanges: false,
            isChangesNotSavedModalVisible: false,
            isEmailValid: true,
            saveEnabled: false,
        } as S;
    }

    public componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onPressCancel);
        this.setNavigationParams({ onPressBack: this.onPressCancel });
    }

    public componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onPressCancel);
        this.setNavigationParams({ onPressBack: null });
    }

    public render() {
        return (
            <ContactInfoEmailAddressFieldsView
                bannerVisible={this.state.bannerVisible}
                confirmEmailLabel={this.props.confirmEmailLabel}
                emailAddressLabel={this.props.emailAddressLabel}
                emailAddressSubHeading={this.props.emailAddressSubHeading}
                isChangesNotSavedModalVisible={this.state.isChangesNotSavedModalVisible}
                onPressCancel={this.onPressCancel}
                onPressCancelUnsavedChangesModal={this.onPressCancelUnsavedChangesModal}
                onPressContinueUnsavedChangesModal={this.onPressContinueUnsavedChangesModal}
                onPressSubmit={this.onPressSubmit}
                onPressDismissSuccessBanner={this.onPressDismissSuccessBanner}
                saveEnabled={this.state.saveEnabled}
                setEmailInfo={this.setEmailInfo}
                {...this.props}
            />
        );
    }

    protected getPayload = (): any => {
        return {
            gbdSettings: {
                emailAddress: this.state.emailAddress,
            },
            optIn: false,
        };
    };

    protected goBack = () => {
        this.navigate(ProfileActions.EMAIL_ADDRESSES_PRESSED);
    };

    protected onPressCancel = () => {
        if (this.state.hasUnsavedChanges) {
            this.setState({ isChangesNotSavedModalVisible: true });
            return true;
        } else {
            this.navigate(ProfileActions.EMAIL_ADDRESSES_PRESSED);
        }
    };

    protected onPressCancelUnsavedChangesModal = () => {
        this.setState({ isChangesNotSavedModalVisible: false });
    };

    protected onPressContinueUnsavedChangesModal = () => {
        this.setState({ isChangesNotSavedModalVisible: true });
        this.goBack();
    };

    protected onPressDismissSuccessBanner = () => {
        this.setState({ bannerVisible: false });
    };

    protected onPressSubmit = () => {
        this.trackEvent({ name: 'ContactInfoEditEmailAddress' }, 'save');
        this.appContext
            .getServiceExecutor()
            .execute(UPDATE_MEMBER_PREFERENCES, {
                payload: this.getPayload(),
            })
            .then(res => {
                this.onSaveSucess();
            });
    };

    protected onSaveSucess = () => {
        this.setState({ hasUnsavedChanges: false, bannerVisible: true, saveEnabled: false });
    };

    protected setEmailInfo = (emailAddress: string, isValid: boolean) => {
        if (emailAddress !== this.state.emailAddress) {
            this.setState({ emailAddress, hasUnsavedChanges: true, saveEnabled: true });
        }
    };
}

export default ContactInfoEditEmailAddress;
