import { AccountRecoveryNumber } from 'atlas-services/src/models';
import { GET_ACCOUNT_RECOVERY_NUMBER } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { ProfileActions } from '../../../context/navigation/actions';
import AppComponent from '../../common/appComponent';
import { ContactInfoAccountRecoveryView, ViewProps } from './';

interface State {
    accountRecoveryNumber: AccountRecoveryNumber;
}
interface Props extends ViewProps {}

const defaultProps = {};

class ContactInfoAccountRecovery extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;

    constructor(props: Props) {
        super(props);

        this.state = {
            accountRecoveryNumber: {
                phoneNumber: '',
                phoneType: null,
            },
        };
    }

    public render() {
        return (
            <>
                <ContactInfoAccountRecoveryView
                    onPressAddAccountRecovery={this.onPressAddAccountRecovery}
                    onPressEditAccountRecovery={this.onPressEditAccountRecovery}
                    accountRecoveryNumber={this.state.accountRecoveryNumber}
                    {...this.props}
                    style={this.style}
                />
                <NavigationEvents onDidFocus={this.getMemberPreferences} />
            </>
        );
    }

    protected getMemberPreferences = (): void => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_ACCOUNT_RECOVERY_NUMBER)
            .then(response => {
                this.setState({ accountRecoveryNumber: response });
            });
    };

    protected onPressAddAccountRecovery = () => {
        this.navigate(ProfileActions.ADD_ACCOUNT_RECOVERY_NUMBER_PRESSED);
    };

    protected onPressEditAccountRecovery = () => {
        this.navigate(ProfileActions.EDIT_ACCOUNT_RECOVERY_NUMBER_PRESSED, {
            accountRecoveryNumber: this.state.accountRecoveryNumber,
        });
    };
}

export default ContactInfoAccountRecovery;
