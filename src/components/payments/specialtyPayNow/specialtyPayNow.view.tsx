import { AccountInfo, PersonInfo, RecurringPaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { PaymentCard } from '../';
import { FormView, H1, H2, HorizontalRule, P, RadioButton, ScreenLevelAlert } from '../../';
import { formatCurrency as defaultFormatCurrency } from '../../../utils';
import { FormField, PhoneLink, RadioButtonGroup, TextLink } from '../../common';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { PayNowView } from '../payNow';
import { defaultStyle, SpecialtyPayNowStyleSchema } from './index';

export interface Props extends StyleProps {
    allowPartialPayment?: boolean;
    amountDue: number;
    arePaymentMethodsPresent: boolean;
    children?: <C extends SpecialtyPayNowView>(parent: C) => React.ReactNode;
    componentsList?: JSX.Element[];
    enrollmentStatus: string;
    formatCurrency: (value: number | string) => string;
    isPaymentAlertVisibile: boolean;
    isPaymentNeeded: (balance: number) => boolean;
    isPaymentPending: boolean;
    isSubmitButtonDisabled: boolean;
    minimumPayment: string;
    onPaymentEnteredBlur?: () => void;
    onPaymentEnteredChangeText: (text: string) => void;
    onPressChangePaymentMethod: (isManagePayment?: boolean) => void;
    onPressDismissPaymentAlert: noop;
    onPressManageAutoSpecialty?: noop;
    onPressPaymentHistory?: noop;
    onPressPaymentSelection?: (index: number) => void;
    onPressPrimaryButton?: noop;
    onPressSecondaryButton?: noop;
    paymentEntered: string;
    paymentErrorText: string;
    pbmPhoneNumber: string;
    radioButtonTitleList?: string[];
    selectedPaymentMethod: RecurringPaymentMethod;
    selectedSpecialtyAccount: AccountInfo;
    selectedSpecialtyPaymentIndex: number;
    style?: Partial<SpecialtyPayNowStyleSchema>;
}

export const defaultProps = {
    allowPartialPayment: true,
    children: ({
        labels,
        MemberContent,
        NoPaymentContent,
        PaymentAlert,
        PaymentAmountContainer,
        PaymentMethodCard,
        PendingPaymentContent,
        props,
    }) => {
        const payNowlabels = labels.pharmacy.specialtyPayNow;
        return (
            <>
                <PaymentAlert />
                <PayNowView {...props}>
                    {({ AmountDue, Disclaimer, Divider, PaymentSection }: PayNowView) => {
                        const {
                            amountDue,
                            enrollmentStatus,
                            isPaymentPending,
                            isSubmitButtonDisabled,
                            onPressPrimaryButton,
                            onPressSecondaryButton,
                        } = props;
                        return (
                            <>
                                <FormView
                                    onPressPrimaryButton={onPressPrimaryButton}
                                    onPressTextLink={onPressSecondaryButton}
                                    primaryButtonDisabled={isSubmitButtonDisabled}
                                    primaryButtonText={payNowlabels.primaryButtonText}
                                    textLinkText={payNowlabels.textLinkText}
                                >
                                    {({ Buttons }) => (
                                        <ScrollView>
                                            <MemberContent />
                                            <AmountDue
                                                amountDueValue={
                                                    props.isPaymentNeeded(amountDue)
                                                        ? props.formatCurrency(amountDue)
                                                        : props.formatCurrency(0)
                                                }
                                                sectionLabel={payNowlabels.amountDue.sectionLabel}
                                            />
                                            {props.isPaymentNeeded(amountDue) ? (
                                                <>
                                                    {isPaymentPending ? (
                                                        <PendingPaymentContent />
                                                    ) : (
                                                            <>
                                                                <PaymentAmountContainer />
                                                                <PaymentMethodCard />
                                                                <Disclaimer />
                                                                <Buttons />
                                                            </>
                                                        )}
                                                </>
                                            ) : (
                                                    <NoPaymentContent />
                                                )}
                                            <Divider />
                                            <PaymentSection
                                                isManagePaymentsLinkVisible={
                                                    props.isPaymentNeeded(amountDue) && !props.isPaymentPending
                                                }
                                                managePaymentsLinkText={
                                                    labels.pharmacy.specialtyPayNow.paymentSection
                                                        .managePaymentMethodText
                                                }
                                            />
                                        </ScrollView>
                                    )}
                                </FormView>
                            </>
                        );
                    }}
                </PayNowView>
            </>
        );
    },
    formatCurrency: defaultFormatCurrency,
    isPaymentNeeded: () => true,
    pbmPhoneNumber: '',
};

export default class SpecialtyPayNowView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'SpecialtyPayNow';
    public style: SpecialtyPayNowStyleSchema;

    public AutomaticPayments = ({ enrollmentStatus }: { enrollmentStatus: string }) => {
        const labels = this.labels.pharmacy.specialtyPayNow.automaticPayments;
        return (
            <View style={this.style.automaticPaymentBoxContainer}>
                <View style={this.style.automaticPaymentContainer}>
                    <H2>{labels.title}</H2>
                    <View style={this.style.automaticPaymentTextContainer}>
                        <P>{labels.subTitle}</P>
                    </View>
                    <View style={this.style.enrollmentStatusView}>
                        <P style={{ paragraph: this.style.enrollmentStatusText }}>{enrollmentStatus}</P>
                        <View style={this.style.linkText}>
                            <TextLink isUnderlined={true} onPress={this.props.onPressManageAutoSpecialty}>
                                {labels.manageAutoSpecialty}
                            </TextLink>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    public Container = ({ children }: { children: Children }) => {
        return <ScrollView contentContainerStyle={this.style.rootContainer}>{children}</ScrollView>;
    };

    public MemberContent = () => {
        const accountHolder =
            this.props.selectedSpecialtyAccount?.accountHolder ||
            this.logger.warn('No account holder information found') ||
            ({} as PersonInfo);
        const labels = this.labels.pharmacy.specialtyPayNow.memberContent;
        return (
            <>
                {this.props.selectedSpecialtyAccount && (
                    <View style={this.style.memberContainer}>
                        <H1>{labels.title}</H1>
                        <View style={this.style.memberNameContainer}>
                            <H2>{`${labels.member} ${accountHolder.firstName} ${accountHolder.lastName}`}</H2>
                        </View>
                    </View>
                )}
            </>
        );
    };

    public NoPaymentContent = () => {
        return (
            <P style={{ paragraph: this.style.noPaymentText }}>
                {this.labels.pharmacy.specialtyPayNow.noPaymentContent.text}
            </P>
        );
    };

    public payFullBalance = (): JSX.Element => {
        return (
            <View style={this.style.fullBalancePlacement}>
                <P>{this.props.formatCurrency(this.props.amountDue)}</P>
            </View>
        );
    };

    public PaymentAlert = () => {
        const labels = this.labels.pharmacy.specialtyPayNow.paymentAlert;
        return (
            <>
                {this.props.isPaymentAlertVisibile && (
                    <ScreenLevelAlert
                        alertType={'info'}
                        onDismissAlert={this.props.onPressDismissPaymentAlert}
                        style={{
                            errorMessage: this.style.screenAlertErrorMessage,
                            iconNormalSize: this.style.screenAlertIcon,
                        }}
                    >
                        {labels.screenAlert}
                    </ScreenLevelAlert>
                )}
            </>
        );
    };

    public PaymentAmountContainer = () => {
        return this.props.allowPartialPayment ? <this.RadioButtonContainer /> : null;
    };

    public PaymentMethodCard = ({ }) => {
        return (
            <View style={this.style.paymentCardContainer}>
                <PaymentCard
                    arePaymentsPresent={this.props.arePaymentMethodsPresent}
                    isDefaultNecessary={false}
                    isSpecialty
                    onActionPress={this.props.onPressChangePaymentMethod}
                    paymentMethod={this.props.selectedPaymentMethod}
                />
            </View>
        );
    };

    public payPartialBalance = (): JSX.Element => {
        const errorLabels = this.labels.pharmacy.specialtyPayNow.errors;
        return (
            <View style={this.style.partialFormFieldPlacement}>
                <View style={this.style.formFieldWidth}>
                    <FormField
                        errorMessage={
                            this.props.paymentErrorText
                                ? (this.formatLabel(
                                    errorLabels.invalidMinimumPaymentAmount,
                                    this.props.minimumPayment
                                ) as string)
                                : ''
                        }
                        keyboardType={'decimal-pad'}
                        onBlur={this.props.onPaymentEnteredBlur}
                        onChangeText={this.props.onPaymentEnteredChangeText}
                        onFocus={() => this.props.onPressPaymentSelection(1)}
                        value={`$${this.props.paymentEntered}`}
                    />
                </View>
                <>
                    {!this.props.paymentErrorText && (
                        <View style={this.style.minimumPaymentText}>
                            <P style={{ paragraph: this.style.radioText }}>
                                {
                                    this.formatLabel(
                                        this.labels.pharmacy.specialtyPayNow.payPartialBalance.minimumPaymentText,
                                        this.props.minimumPayment
                                    ) as string
                                }
                            </P>
                        </View>
                    )}
                </>
            </View>
        );
    };

    public PendingPaymentContent = () => {
        const labels = this.labels.pharmacy.specialtyPayNow.pendingPaymentContent;
        return (
            <View style={this.style.pendingPaymentContentContainer}>
                <P style={{ paragraph: this.style.pendingPaymentTitle }}>{labels.title}</P>
                <P>
                    {this.formatLabel(
                        labels.subtitle,
                        <PhoneLink isUnderlined phoneNumber={this.props.pbmPhoneNumber}>
                            {this.props.pbmPhoneNumber}
                        </PhoneLink>
                    )}
                    <P
                        accessibilityLabel={labels.tty.accessibilityLabel}
                        style={{ paragraph: this.style.disabledText }}
                    >
                        {labels.tty.text}
                    </P>
                </P>
            </View>
        );
    };

    public RadioButtonContainer = () => {
        const labels = this.labels.pharmacy.specialtyPayNow.radioButtonContainer;
        return (
            <View>
                <View style={this.style.radioButtonTitle}>
                    <H2>{labels.title}</H2>
                </View>
                <HorizontalRule />
                <RadioButtonGroup
                    customButton={this.RadioButtonContent}
                    isVertical={true}
                    radioButtonItems={[
                        labels.radioButtonGroup.items.totalBalance,
                        labels.radioButtonGroup.items.otherAmount,
                    ]}
                    radioButtonGroupAccessibilityLabel={labels.radioButtonGroup.accessibilityLabel}
                />
            </View>
        );
    };

    public RadioButtonContent = ({ index, buttonInfo }): JSX.Element => {
        const isActive: boolean = index === this.props.selectedSpecialtyPaymentIndex;

        return (
            <View key={Math.random().toString()}>
                <View>
                    <View style={this.style.radioButtonContentContainer}>
                        <RadioButton selected={isActive} onPress={() => this.props.onPressPaymentSelection(index)} />
                        <P style={{ paragraph: this.style.radioContentPlacement }}>{buttonInfo}</P>
                    </View>
                    {this.RadioButtonMethodLoader(index)}
                </View>
                <HorizontalRule />
            </View>
        );
    };

    public RadioButtonMethodLoader = (index: number) => {
        const componentsList = [this.payFullBalance, this.payPartialBalance];
        return <View key={Math.random().toString()}>{componentsList[index]()}</View>;
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }
}
