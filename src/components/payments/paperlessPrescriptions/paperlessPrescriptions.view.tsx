import SpecialtyMemberEnrollmentRequest from 'atlas-services/src/models/specialtyMemberEnrollmentRequest';
import { SPECIALTY_MEMBER_ENROLLMENT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { FormField, H2, HorizontalRule, P } from '../..';
import { noLetters } from '../../../utils/inputFormatters';
import { emailAddressValidator } from '../../../utils/inputValidator';
import { PrimaryButton, TextLink } from '../../common';
import DropDown from '../../common/form/dropDown';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { defaultStyle, PaperlessPrescriptionsSchema } from './index';

export interface Props extends StyleProps {
    children?: (parent: PaperlessPrescriptionsView) => React.ReactNode;
    onEnrollment: () => void;
    onPressBackButton?: () => void;
    phoneNumberValidator: (phone: string) => boolean;
    prescriberDetailsValidator: (value: string) => boolean;
    style?: Partial<PaperlessPrescriptionsSchema>;
}

export interface ViewState {
    error: { email: string; medication: string; name: string; phone: string };
    medicationDescription: string;
    memberEmail: string;
    memberName: string;
    prescriberName: string;
    prescriberPhone: string;
}

export const defaultProps = {
    children: ({
        HelpText,
        MedicationList,
        MemberSelectionText,
        MemberSelector,
        NextAndCancelButtons,
        PageTitle,
        PrescriberEmail,
        PrescriberName,
        PrescriberPhone,
        SectionDivider,
        SelectMemberForm,
    }: PaperlessPrescriptionsView) => {
        return (
            <>
                <PageTitle />
                <MemberSelectionText />
                <SelectMemberForm />
                <MemberSelector />
                <MedicationList />
                <PrescriberName />
                <PrescriberPhone />
                <PrescriberEmail />
                <NextAndCancelButtons />
                <SectionDivider />
                <HelpText />
            </>
        );
    },
    phoneNumberValidator: (phone: string) => true,
    prescriberDetailsValidator: (value: string) => true,
};

export default class PaperlessPrescriptionsView extends StyledComponent<Props, ViewState> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'PaperlessPrescriptions';
    public style: PaperlessPrescriptionsSchema;
    constructor(props: Props) {
        super(props);
        this.state = this.getInitialState();
    }

    public Container = ({ children }: { children: Children }) => {
        return (
            <ScrollView>
                <ScrollView contentContainerStyle={this.style.rootContainer}>{children}</ScrollView>
            </ScrollView>
        );
    };

    // FIXME: this is used somewhere else, can reuse this component
    public HelpText = () => {
        const labels = this.labels.pharmacy.paperlessPrescriptions.helpText;
        return (
            <View style={this.style.helpText}>
                <H2>{labels.haveQuestions} </H2>
                <P>{labels.contactUs} </P>
                <P style={{ paragraph: this.style.contactNumber }}>{labels.contactNumber}</P>
            </View>
        );
    };

    public MedicationList = () => {
        const labels = this.labels.pharmacy.paperlessPrescriptions.medicationList;
        return (
            <View style={this.style.formStyle}>
                <FormField
                    accessibilityLabel={labels.accessibilityLabel}
                    accessibilityRole={'none'}
                    errorMessage={this.state.error.medication}
                    label={labels.label}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={medicationDescription => {
                        this.setState({ error: { ...this.state.error, medication: '' } });
                        this.setState({ medicationDescription });
                    }}
                    style={{ inputContainerStyle: this.style.inputFormStyle }}
                    value={this.state.medicationDescription}
                />
            </View>
        );
    };

    public MemberSelectionText = () => {
        return (
            <H2 style={{ h2: this.style.memberSelection }}>
                {this.labels.pharmacy.paperlessPrescriptions.memberSelectionText}
            </H2>
        );
    };

    // TODO:-data passed in items are just test data which will be removed in future stories.
    public MemberSelector = () => {
        const memberDetails = [
            { label: 'John Carter', value: 'John Carter' },
            { label: 'John Dew', value: 'John Dew' },
        ];
        return (
            <>
                <DropDown
                    accessibilityLabel={this.labels.pharmacy.paperlessPrescriptions.memberSelector.accessibilityLabel}
                    items={memberDetails}
                    onChange={memberName => {
                        this.setState({ memberName: memberName.value });
                    }}
                    value={this.state.memberName}
                />
            </>
        );
    };

    // TODO: already doesn't make sense given that it's submit and cancel
    // FIXME: fix component name - this is used somewhere else and can be reused
    public NextAndCancelButtons = () => {
        const labels = this.labels.pharmacy.paperlessPrescriptions.nextAndCancelButtons;
        return (
            <View style={this.style.buttonsContainer}>
                <PrimaryButton onPress={this.onPressSubmit} title={labels.primaryButtonText} />
                <View style={this.style.cancelButton}>
                    <TextLink onPress={this.props.onPressBackButton}>{labels.secondaryButtonText}</TextLink>
                </View>
            </View>
        );
    };

    public PageTitle = () => {
        return (
            <View style={this.style.pageTitle}>
                <P>{this.labels.pharmacy.paperlessPrescriptions.pageTitle}</P>
            </View>
        );
    };

    public PrescriberEmail = () => {
        const labels = this.labels.pharmacy.paperlessPrescriptions.prescriberEmail;
        return (
            <View style={this.style.formStyle}>
                <FormField
                    accessibilityLabel={labels.accessibilityLabel}
                    accessibilityRole={'none'}
                    autoCorrect={false}
                    errorMessage={this.state.error.email}
                    label={labels.label}
                    onChangeText={memberEmail => {
                        this.setState({ error: { ...this.state.error, email: '' } });
                        this.setState({ memberEmail });
                    }}
                    value={this.state.memberEmail}
                />
            </View>
        );
    };

    public PrescriberName = () => {
        const labels = this.labels.pharmacy.paperlessPrescriptions.prescriberName;
        return (
            <View style={this.style.formStyle}>
                <FormField
                    accessibilityLabel={labels.accessibilityLabel}
                    accessibilityRole={'none'}
                    errorMessage={this.state.error.name}
                    label={labels.label}
                    onChangeText={prescriberName => {
                        this.setState({ error: { ...this.state.error, name: '' } });
                        this.setState({ prescriberName });
                    }}
                    value={this.state.prescriberName}
                />
            </View>
        );
    };

    public PrescriberPhone = () => {
        const labels = this.labels.pharmacy.paperlessPrescriptions.prescriberPhone;
        return (
            <View style={this.style.formStyle}>
                <FormField
                    accessibilityLabel={labels.accessibilityLabel}
                    accessibilityRole={'none'}
                    errorMessage={this.state.error.phone}
                    keyboardType="number-pad"
                    label={labels.label}
                    maxLength={10}
                    onChangeText={prescriberPhone => {
                        this.setState({ error: { ...this.state.error, phone: '' } });
                        this.setState({ prescriberPhone: noLetters(prescriberPhone) });
                    }}
                    value={this.state.prescriberPhone}
                />
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public SectionDivider = () => {
        return (
            <View style={this.style.divider}>
                <HorizontalRule />
            </View>
        );
    };

    public SelectMemberForm = () => {
        return (
            <H2 style={{ h2: this.style.memberSelection }}>
                {this.labels.pharmacy.paperlessPrescriptions.selectMember}
            </H2>
        );
    };

    protected getErrorMessage(
        inputValue: string,
        isValid: boolean,
        errorMessage: string,
        noInputMessage?: string
    ): string {
        if (inputValue) {
            return isValid ? '' : errorMessage;
        } else {
            return noInputMessage || errorMessage;
        }
    }

    protected getInitialState = () => {
        const initialState = {
            error: { email: '', phone: '', name: '', medication: '' },
            medicationDescription: '',
            memberEmail: '',
            memberName: 'John Carter', // TODO:- Update from member lookup service once ready
            prescriberName: '',
            prescriberPhone: '',
        };
        return initialState;
    };

    protected isInputFormValid = (): boolean => {
        const errorMessages = { email: '', phone: '', name: '', medication: '' };
        const labels = this.labels.pharmacy.paperlessPrescriptions.errors;
        errorMessages.email = this.getErrorMessage(
            this.state.memberEmail,
            emailAddressValidator(this.state.memberEmail),
            labels.emailAddressInvalid,
            labels.emailAddressEmpty
        );
        errorMessages.phone = this.getErrorMessage(
            this.state.prescriberPhone,
            this.props.phoneNumberValidator(this.state.prescriberPhone),
            labels.phoneNumberInvalid,
            labels.phoneNumberEmpty
        );
        errorMessages.name = this.getErrorMessage(
            this.state.prescriberName,
            this.props.prescriberDetailsValidator(this.state.prescriberName),
            labels.nameEmpty
        );
        errorMessages.medication = this.getErrorMessage(
            this.state.medicationDescription,
            this.props.prescriberDetailsValidator(this.state.medicationDescription),
            labels.medicationsEmpty
        );
        this.setState({ error: errorMessages });
        return !(errorMessages.email || errorMessages.phone || errorMessages.medication || errorMessages.name);
    };

    protected onPressSubmit = () => {
        if (this.isInputFormValid()) {
            const specialtyEnrollmentDetails: SpecialtyMemberEnrollmentRequest = {}; // TODO:- Include rest of the all required fields once the dependend services are updated.
            specialtyEnrollmentDetails.enrollmentDetails = this.state;
            this.context.appContext
                .getServiceExecutor()
                .execute(SPECIALTY_MEMBER_ENROLLMENT, {
                    payload: specialtyEnrollmentDetails,
                })
                .then(response => {
                    this.setState(this.getInitialState());
                    this.props.onEnrollment();
                });
        }
    };
}
