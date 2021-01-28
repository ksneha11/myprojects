import { AccountInfo, Address, RecurringPaymentMethod } from 'atlas-services/src/models';
import { GET_SPECIALTY_ACCOUNTS } from 'atlas-services/src/services/middleware/serviceEndpoint';
import { SpecialtyPaymentActions } from '../../context/navigation/actions';
import { _omit } from '../../utils';
import AbstractChangePaymentMethods, {
    defaultProps as PbmDefaultProps,
    Props as PbmProps,
    State as PbmState,
} from './abstractChangePaymentMethod';

// Notes:
// Removed isSpecialty as a Prop anything extending this should already know it's specialty
// Should this not even relate to abstract PBM version? overwritting
export interface Props extends PbmProps {
    multipleAccountsPresent?: boolean;
    selectedSpecialtyAccount?: AccountInfo;
}

export interface State extends PbmState {
    memberInformation: AccountInfo[];
    selectedMember: AccountInfo;
    selectedMemberName: string;
    selectedSpecialtyMemberUid: string;
}

export const defaultProps = {
    ...PbmDefaultProps,
};

export default class AbstractChangeSpecialtyPaymentMethod extends AbstractChangePaymentMethods<Props, State> {
    public static defaultProps = defaultProps;
    constructor(props: Props) {
        super(props);
        this.state = {
            memberInformation: [] as AccountInfo[],
            modalVisible: false,
            selectedMemberName: '',
            selectedSpecialtyMemberUid: '',
        } as State;
    }

    public async componentDidMount() {
        await this.getPaymentMethods();
        await this.getPbmPhoneNumber();
    }

    protected getMemberName = (account: AccountInfo): string => {
        const { firstName, lastName } = account.accountHolder;
        return `${firstName} ${lastName}`;
    };

    protected getPaymentMethods = async (): Promise<void> => {
        return this.appContext
            .getServiceExecutor()
            .execute(GET_SPECIALTY_ACCOUNTS)
            .then((response: AccountInfo[]) => {
                this.setSpecialtyState(response);
            })
            .catch(this.logger.warn('GET_SPECIALTY_ACCOUNTS failed in abstractChangeSpecialtyPaymentMethods'));
    };

    protected getSelectedMemberInfo = (memberInformation: AccountInfo[], memberUid: string): AccountInfo => {
        if (this.props.selectedSpecialtyAccount.memberUid) {
            return memberInformation.find(member => member.memberUid === this.props.selectedSpecialtyAccount.memberUid);
        } else if (this.props.selectedSpecialtyAccount) {
            return this.props.selectedSpecialtyAccount;
        } else {
            return memberInformation.find(member => member.memberUid === memberUid);
        }
    };

    protected getSubHeader = (): string => {
        const labels = this.labels.pharmacy.changePaymentMethods.subHeader;
        if (this.state.arePaymentMethodsPresent) {
            if (!this.props.subHeaderLabel) {
                return labels.paymentMethodsPresent.specialty;
            } else {
                return this.props.subHeaderLabel;
            }
        } else {
            return labels.paymentMethodsNotPresent.specialty;
        }
    };

    protected isAddressChanged = (paymentAddress: Address, editableAddress: Address): boolean => {
        return (
            paymentAddress.streetAddress1 !== editableAddress.streetAddress1 ||
            paymentAddress.streetAddress2 !== editableAddress.streetAddress2 ||
            paymentAddress.city !== editableAddress.city ||
            paymentAddress.state !== editableAddress.state ||
            paymentAddress.zipCode !== editableAddress.zipCode
        );
    };

    protected onDropDownChange = ({ value }) => {
        this.updateSpecialtyState(this.state.memberInformation, value);
    };

    protected onPressAddPaymentMethod = () => {
        const specialtyMemberUid =
            this.props.selectedSpecialtyAccount?.memberUid ?? this.state.selectedSpecialtyMemberUid;
        this.navigate(this.props.addPaymentRouteName ?? SpecialtyPaymentActions.ADD_PAYMENT_METHOD_PRESSED, {
            specialtyMemberUid,
        });
    };

    protected onPressEditBankAccount = (paymentMethod: RecurringPaymentMethod) => {
        const specialtyMemberUid = this.props.selectedSpecialtyAccount?.memberUid
            ? this.props.selectedSpecialtyAccount?.memberUid
            : this.state.selectedSpecialtyMemberUid;
        const editablePaymentMethod = paymentMethod;
        this.setState({ editablePaymentMethod }, () => {
            this.navigate(
                this.props.editBankAccountRouteName ?? SpecialtyPaymentActions.BANK_ACCOUNT_SPECIALTY_EDIT_PRESSED,
                {
                    editablePaymentMethod,
                    specialtyMemberUid,
                }
            );
        });
    };

    protected onPressEditCreditCard = (paymentMethod: RecurringPaymentMethod) => {
        const specialtyMemberUid = this.props.selectedSpecialtyAccount?.memberUid
            ? this.props.selectedSpecialtyAccount?.memberUid
            : this.state.selectedSpecialtyMemberUid;
        const editablePaymentMethod = paymentMethod;
        this.setState({ editablePaymentMethod }, () => {
            this.navigate(
                this.props.editCreditCardRouteName ?? SpecialtyPaymentActions.CREDIT_CARD_SPECIALTY_EDIT_PRESSED,
                { editablePaymentMethod, specialtyMemberUid }
            );
        });
    };

    protected onPressSave = () => {
        const selectedPaymentMethod = this.state.selectedPaymentMethod;
        if (selectedPaymentMethod && selectedPaymentMethod.accountName) {
            this.appStateActions.payments.setSelectedSpecialtyPaymentMethod(selectedPaymentMethod);
            this.appStateActions.payAccountBalance.setSelectedSpecialtyPaymentMethod(selectedPaymentMethod);
        }
        this.props.navigation.pop();
    };

    // Created to make it easier for Medicaid/Other Apps to override what they want the response to do
    protected setSpecialtyState = (response: AccountInfo[]) => {
        if (response.length) {
            this.updateSpecialtyState(response, response[0].memberUid);
        }
    };

    protected updateSpecialtyState = async (memberInformation: AccountInfo[], memberUid: string) => {
        const selectedMember: AccountInfo = this.getSelectedMemberInfo(memberInformation, memberUid);
        this.getDefaultPaymentMethod(this.state.selectedMember?.paymentMethods, selectedMember?.paymentMethods);
        const selectedMemberName = this.getMemberName(selectedMember);
        this.setState({
            arePaymentMethodsPresent: !!selectedMember.paymentMethods?.length,
            memberInformation,
            selectedMember,
            selectedMemberName,
            selectedSpecialtyMemberUid: selectedMember.memberUid,
        });
    };
}
