import { AccountInfo, RecurringPaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { PaymentCard } from '..';
import { HorizontalRule, P, ScreenLevelAlert, TextLink } from '../..';
import { IconNames } from '../../../styles';
import { FormField, FormView, H2, H3 } from '../../common';
import { ListModalItem } from '../../common/listModal';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { ManageAutoSpecialtyStyleSchema } from './manageAutoSpecialty.style';
import SelectRecurringPaymentDate from './views/selectRecurringPaymentDate';

export interface Props extends StyleProps {
    amountDue: number;
    arePaymentMethodsPresent: boolean;
    children: (parent: ManageAutoSpecialtyView) => React.ReactNode;
    dateItems: ListModalItem[];
    datePickerModalVisible: boolean;
    hitSlop?: { bottom?: number; left?: number; right?: number; top?: number };
    isAccountEnrolled: (account: AccountInfo) => boolean;
    isPaymentAlertVisible?: boolean;
    isPaymentPending: boolean;
    isSubmitButtonDisabled: boolean;
    minimumPayment: string;
    onChangePaymentInfoText: (text: string) => void;
    onCloseDatePicker: noop;
    onPressAgreeAndEnroll: noop;
    onPressCancel: noop;
    onPressChangePaymentMethod: (isManagePayement?: boolean) => void;
    onPressDismissPaymentAlert: noop;
    onPressPaymentDateOption: (index: number) => void;
    onPressPaymentHistory: noop;
    paymentErrorText: string;
    paymentLimit: string;
    selectedDateLabel: string;
    selectedPaymentDateIndex: number;
    selectedPaymentDateOptionIndex: number;
    selectedPaymentMethod: RecurringPaymentMethod;
    specialtyAccount: AccountInfo;
    style?: Partial<ManageAutoSpecialtyStyleSchema>;
    toggleDatePickerModal: noop;
}

export const defaultProps: Partial<Props> = {
    children: ({
        appState,
        Divider,
        MemberInfo,
        MoreInfo,
        labels,
        PaymentAlert,
        PaymentCardContainer,
        PaymentInfo,
        PaymentLinksSection,
        PendingPaymentContent,
        props,
    }: ManageAutoSpecialtyView) => {
        const {
            dateItems,
            datePickerModalVisible,
            isPaymentPending,
            isSubmitButtonDisabled,
            onCloseDatePicker: onDatePickerClosed,
            onPressAgreeAndEnroll,
            onPressCancel,
            onPressPaymentDateOption,
            selectedDateLabel,
            selectedPaymentDateOptionIndex,
            selectedPaymentMethod,
            toggleDatePickerModal,
        } = props;
        return (
            <>
                <FormView
                    primaryButtonDisabled={isSubmitButtonDisabled}
                    primaryButtonText={labels.pharmacy.manageAutoSpecialty.primaryButtonText}
                    textLinkText={labels.pharmacy.manageAutoSpecialty.textLinkText}
                    onPressPrimaryButton={onPressAgreeAndEnroll}
                    onPressTextLink={onPressCancel}
                >
                    {({ Buttons }) => {
                        return (
                            <>
                                <PaymentAlert />
                                {isPaymentPending ? (
                                    <>
                                        <PendingPaymentContent />
                                        <Divider />
                                        <PaymentLinksSection />
                                    </>
                                ) : (
                                    <>
                                        <MemberInfo />
                                        <PaymentInfo />
                                        <MoreInfo />
                                        <Divider />
                                        <PaymentCardContainer paymentMethod={selectedPaymentMethod} />
                                        <Divider />
                                        <SelectRecurringPaymentDate
                                            dateItems={dateItems}
                                            datePickerModalVisible={datePickerModalVisible}
                                            onCloseDatePicker={onDatePickerClosed}
                                            onPressPaymentDateOption={onPressPaymentDateOption}
                                            selectedDateLabel={selectedDateLabel}
                                            selectedPaymentMethod={selectedPaymentMethod}
                                            selectedPaymentDateOptionIndex={selectedPaymentDateOptionIndex}
                                            toggleDatePickerModal={toggleDatePickerModal}
                                        />
                                        <Buttons />
                                    </>
                                )}
                            </>
                        );
                    }}
                </FormView>
            </>
        );
    },
    hitSlop: { bottom: 10, left: 10, right: 10, top: 10 },
    isPaymentAlertVisible: false,
};

export default class ManageAutoSpecialtyView extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ManageAutoSpecialty';
    public style: ManageAutoSpecialtyStyleSchema;

    constructor(props) {
        super(props);

        this.state = {
            paymentLimit: '',
        };
    }

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={this.style.rootContainer}>{children}</ScrollView>
            </SafeAreaView>
        );
    };

    public Divider = (): JSX.Element => {
        return (
            <View style={this.style.dividerContainer}>
                <HorizontalRule />
            </View>
        );
    };

    public MemberInfo = () => {
        const labels = this.labels.pharmacy.manageAutoSpecialty.memberInfo;
        const isEnrolled = this.props.isAccountEnrolled(this.props.specialtyAccount);
        return (
            <View style={this.style.sectionContainer}>
                <H2 style={{ h2: this.style.headerText }}>
                    {labels.member}{' '}
                    {this.props.specialtyAccount?.accountHolder
                        ? `${this.props.specialtyAccount.accountHolder.firstName} ${this.props.specialtyAccount.accountHolder.lastName}`
                        : ''}
                </H2>
                <H2 style={{ h2: this.style.memberInfoStatus }}>
                    {labels.status} {isEnrolled ? labels.enrolled : labels.notEnrolled}
                </H2>
            </View>
        );
    };

    public MoreInfo = ({}) => {
        return (
            <View style={this.style.paymentLimitInfoConatiner}>
                <P style={{ paragraph: this.style.infoText }}>{this.labels.pharmacy.manageAutoSpecialty.moreInfo}</P>
            </View>
        );
    };

    public PaymentAlert = () => {
        const labels = this.labels.pharmacy.manageAutoSpecialty.paymentAlert;
        return (
            <>
                {this.props.isPaymentAlertVisible && (
                    <ScreenLevelAlert
                        alertType={'info'}
                        onDismissAlert={this.props.onPressDismissPaymentAlert}
                        style={{
                            errorMessage: this.style.screenAlertErrorMessage,
                            iconNormalSize: this.style.screenAlertIcon,
                        }}
                    >
                        {labels.screenAlert.text}
                    </ScreenLevelAlert>
                )}
            </>
        );
    };

    public PaymentCardContainer = ({ paymentMethod }) => {
        return (
            <View style={this.style.paymentCardContainer}>
                <PaymentCard
                    arePaymentsPresent={this.props.arePaymentMethodsPresent}
                    isDefaultNecessary={false}
                    isSpecialty
                    onActionPress={this.props.onPressChangePaymentMethod}
                    paymentMethod={paymentMethod}
                />
            </View>
        );
    };

    public PaymentInfo = ({}) => {
        const labels = this.labels.pharmacy.manageAutoSpecialty.paymentInfo;
        const errorLabels = this.labels.pharmacy.manageAutoSpecialty.errors;
        return (
            <View style={this.style.sectionContainer}>
                <H2 style={{ h2: this.style.headerText }}>{labels.header}</H2>
                <P style={{ paragraph: this.style.subHeaderText }}>{labels.subHeader}</P>
                <H3 style={{ h3: this.style.boxHeader }}>{labels.paymentLimit}</H3>
                <FormField
                    errorMessage={
                        this.props.paymentErrorText && this.props.amountDue
                            ? (this.formatLabel(
                                  errorLabels.invalidMinimumPaymentAmount,
                                  this.props.minimumPayment
                              ) as string)
                            : this.props.paymentErrorText
                    }
                    keyboardType={'decimal-pad'}
                    onChangeText={this.props.onChangePaymentInfoText}
                    style={{ formFieldContainer: this.style.paymentLimitForm }}
                    value={`$${this.props.paymentLimit}`}
                />
            </View>
        );
    };

    public PaymentLinksSection = () => {
        const labels = this.labels.pharmacy.manageAutoSpecialty.paymentLinksSection;
        // Dont wana display the manage speciality payment method link for now in app since Ingenio Web is not providing this feature.
        // Come back and enable it once Ingenio Web enable this feature.
        return (
            <View style={this.style.activityPaymentContainer}>
                {/* <TouchableOpacity
                    accessibilityRole="button"
                    hitSlop={this.props.hitSlop}
                    style={this.style.paymentSectionContainer}
                    onPress={()=>this.props.onPressChangePaymentMethod(true)}
                >
                    <TextLink onPress={()=>this.props.onPressChangePaymentMethod(true)}>
                        {labels.managePaymentMethodLink.textLink}
                    </TextLink>
                    {this.getIcon(IconNames.LIST_ITEM_NAVIGATE_ICON, {
                        style: this.style.iconContainer,
                    })}
                </TouchableOpacity>*/}
                <TouchableOpacity
                    accessibilityRole="button"
                    hitSlop={this.props.hitSlop}
                    style={this.style.paymentSectionContainer}
                    onPress={this.props.onPressPaymentHistory}
                >
                    <TextLink onPress={this.props.onPressPaymentHistory}>{labels.paymentHistoryLink.textLink}</TextLink>
                    {this.getIcon(IconNames.LIST_ITEM_NAVIGATE_ICON, {
                        style: this.style.iconContainer,
                    })}
                </TouchableOpacity>
            </View>
        );
    };

    public PendingPaymentContent = () => {
        const labels = this.labels.pharmacy.manageAutoSpecialty.pendingPaymentContent;
        return (
            <View style={this.style.pendingPaymentContentContainer}>
                <P style={{ paragraph: this.style.paymentProcessingText }}>{labels.content.paymentProcessing}</P>
                <P>{labels.content.helpText}</P>
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }
}
