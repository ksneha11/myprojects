import { AccountInfo, PersonInfo } from 'atlas-services/src/models';
import { GET_SPECIALTY_ACCOUNTS } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { AutomaticPaymentsDisabledView, ViewProps } from '.';
import { PaymentActions } from '../../../context/navigation/actions';
import AppComponent from '../../common/appComponent';

interface State {
    memberName: string;
    specialtyAccounts: AccountInfo[];
}
interface Props extends Partial<ViewProps> {
    selectedSpecialtyAccount: AccountInfo;
}

const defaultProps = {};

class AutomaticPaymentsDisabled extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;

    constructor(props: any) {
        super(props);
        this.state = {
            memberName: '',
            specialtyAccounts: [],
        };
    }

    public componentDidMount = () => {
        this.getSpecialtyAccounts();
        this.getMemberName();
    };

    public render() {
        return (
            <AutomaticPaymentsDisabledView
                memberName={this.state.memberName}
                onReturnToHomePressed={this.onPressReturnToHome}
                onSetUpAdditionalMembersPressed={this.onPressSetUpAdditionalMembers}
                onSetUpPressed={this.onPressSetUpSingleMember}
                primaryButtonTitle={this.labels.automaticPaymentsDisabled.returnToHome}
                specialtyAccounts={this.state.specialtyAccounts}
                style={this.style}
            />
        );
    }

    protected getMemberName = () => {
        let memberName = '';
        const accountHolder: PersonInfo =
            this.props.selectedSpecialtyAccount?.accountHolder ||
            this.logger.warn('No account holder information found') ||
            ({} as PersonInfo);
        if (accountHolder) {
            memberName = `${accountHolder.firstName || ''} ${accountHolder.lastName || ''}`;
        }
        this.setState({
            memberName,
        });
    };

    protected getSpecialtyAccounts = () => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_SPECIALTY_ACCOUNTS)
            .then((specialtyAccounts: AccountInfo[]) => {
                this.setState({ specialtyAccounts });
            });
    };

    protected onPressReturnToHome = () => {
        this.navigate(PaymentActions.GO_HOME_PRESSED);
    };

    protected onPressSetUpAdditionalMembers = () => {
        this.navigate(PaymentActions.SPECIALTY_PAY_NOW_MULTIPLE_MEMBERS_PRESSED);
    };

    protected onPressSetUpSingleMember = () => {
        this.navigate(PaymentActions.MANAGE_AUTO_SPECIALTY_PRESSED, {
            selectedMemberUid: this.props.selectedSpecialtyAccount.memberUid,
        });
    };
}

export default AutomaticPaymentsDisabled;
