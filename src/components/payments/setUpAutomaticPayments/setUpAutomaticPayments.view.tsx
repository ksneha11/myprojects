import { AccountInfo, BankAccount, CreditCard, RecurringPaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { H2, HorizontalRule } from '../..';
import { dateSuffix } from '../../../utils/dateSuffix';
import formatCurrency from '../../../utils/formatCurrency';
import { getAccessibleCreditCardExpirationDate } from '../../../utils/getAccessibleCreditCardExpirationDate';
import leftPad from '../../../utils/leftPad';
import { DialogBox, H3, P, PrimaryButton, TextLink } from '../../common';
import TextButton from '../../common/textButton';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { defaultStyle, SetUpAutomaticPaymentsStyleSchema } from './index';

export interface Props extends StyleProps {
    accountInfo: AccountInfo;
    autoEnrolledPaymentMethod: BankAccount & CreditCard;
    cancelEnrollmentDialogVisible: boolean;
    children?: (parent: SetUpAutomaticPaymentsView) => React.ReactNode;
    dateSuffix?: (day: number) => string;
    formatCurrency?: (value: string | number) => string;
    onPressCancelEnrollment: () => void;
    onPressCancelUnenrollment: () => void;
    onPressChangeSettings: () => void;
    onPressDone: () => void;
    onPressUnenroll: () => void;
    primaryButtonTitle: string;
    secondaryButtonTitle: string;
    style?: Partial<SetUpAutomaticPaymentsStyleSchema>;
}

export const defaultProps = {
    children: ({
        AutomaticPaymentSettings,
        BottomControls,
        CancelEnrollmentDialog,
        HorizontalRuleNoMargin,
        MemberInfo,
    }: SetUpAutomaticPaymentsView) => {
        return (
            <>
                <MemberInfo />
                <HorizontalRuleNoMargin />
                <AutomaticPaymentSettings />
                <HorizontalRuleNoMargin />
                <BottomControls />
                <CancelEnrollmentDialog />
            </>
        );
    },
    dateSuffix,
    formatCurrency,
};

export default class SetUpAutomaticPaymentsView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'SetUpAutomaticPayments';
    public style: SetUpAutomaticPaymentsStyleSchema;

    public AutomaticPaymentSettings = () => {
        const labels = this.labels.setUpAutomaticPayments.body;

        return (
            <View style={this.style.bodySettingsContainer}>
                <H2>{labels.automaticPaymentSettings} </H2>
                <View style={this.style.bodyChargeDisclaimerContainer}>
                    <this.ChargeDisclaimer />
                </View>
                <this.PaymentMethod />
            </View>
        );
    };

    public BottomControls = () => {
        const { onPressChangeSettings, onPressDone, primaryButtonTitle, secondaryButtonTitle } = this.props;
        const { footerChangeSettingsTextContainer, footerContainer } = this.style;

        return (
            <View style={footerContainer}>
                <PrimaryButton onPress={onPressDone} title={primaryButtonTitle} />
                <View style={footerChangeSettingsTextContainer}>
                    <TextButton accessibilityLabel={secondaryButtonTitle} onPress={onPressChangeSettings}>
                        {secondaryButtonTitle}
                    </TextButton>
                </View>
            </View>
        );
    };

    public CancelEnrollmentDialog = () => {
        const { cancelEnrollmentDialogVisible, onPressUnenroll, onPressCancelUnenrollment } = this.props;
        const { primaryText, secondaryText } = this.labels.setUpAutomaticPayments.cancelEnrollmentDialogContent;

        return (
            <DialogBox
                isVisible={cancelEnrollmentDialogVisible}
                onClose={onPressCancelUnenrollment}
                primaryText={primaryText}
                primaryMethod={onPressUnenroll}
                secondaryMethod={onPressCancelUnenrollment}
                secondaryText={secondaryText}
                style={{
                    primaryButtonText: this.style.cancelEnrollmentDialogPrimaryButtonText,
                }}
            >
                {({ Buttons }) => (
                    <>
                        <this.CancelEnrollmentDialogContent />
                        <Buttons />
                    </>
                )}
            </DialogBox>
        );
    };

    public CancelEnrollmentDialogContent = () => {
        const { body } = this.labels.setUpAutomaticPayments.cancelEnrollmentDialogContent;

        return <H2 style={{ paragraph: this.style.needChangesOverlayText }}>{body}</H2>;
    };

    public ChargeDisclaimer = () => {
        const { frequency, chargeLimit } = this.props.autoEnrolledPaymentMethod as RecurringPaymentMethod;
        const { chargeDisclaimers } = this.labels.setUpAutomaticPayments;
        const hasValidPayAmount = chargeLimit && chargeLimit !== 0;

        if (frequency === 'IMMEDIATE') {
            if (hasValidPayAmount) {
                return (
                    <this.ImmediateChargeWithPayAmount
                        chargeDisclaimers={chargeDisclaimers}
                        chargeLimit={chargeLimit}
                    />
                );
            } else {
                return <P>{chargeDisclaimers.immediateNoPayAmount} </P>;
            }
        } else {
            const ordinalFrequency = `${frequency}${this.props.dateSuffix(parseInt(frequency, 10))}`;

            if (hasValidPayAmount) {
                return (
                    <this.DatedChargeWithPayAmount
                        chargeDisclaimers={chargeDisclaimers}
                        chargeLimit={chargeLimit}
                        ordinalFrequency={ordinalFrequency}
                    />
                );
            } else {
                return <P>{this.formatLabel(chargeDisclaimers.withDateNoPayAmount, <P>{ordinalFrequency}</P>)}</P>;
            }
        }
    };

    public Container = ({ children }: { children: Children }) => {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </ScrollView>
        );
    };

    public DatedChargeWithPayAmount = ({ chargeDisclaimers, chargeLimit, ordinalFrequency }) => {
        return (
            <P>
                {this.formatLabel(
                    chargeDisclaimers.withDateWithPayAmount,
                    <H3>{this.props.formatCurrency(chargeLimit)}</H3>,
                    <P accessibilityLabel={`${ordinalFrequency},`}>{ordinalFrequency}</P>
                )}
            </P>
        );
    };

    public HorizontalRuleNoMargin = () => {
        return <HorizontalRule style={{ horizontalRule: this.style.horizontalRuleNoMargin }} />;
    };

    public ImmediateChargeWithPayAmount = ({ chargeDisclaimers, chargeLimit }) => {
        return (
            <P>
                {this.formatLabel(
                    chargeDisclaimers.immediateWithPayAmount,
                    <H3>{this.props.formatCurrency(chargeLimit)}</H3>
                )}
            </P>
        );
    };

    public MemberInfo = () => {
        const { accountInfo, onPressCancelEnrollment } = this.props;
        const { firstName, lastName } = accountInfo.accountHolder;
        const name = `${firstName} ${lastName}`;
        const { header } = this.labels.setUpAutomaticPayments;

        return (
            <View style={this.style.sectionContainer}>
                <H2 style={{ h2: this.style.headerName }}>
                    {header.member} {name}
                </H2>
                <H3 style={{ h3: this.style.headerMemberInfoStatus }}>{header.statusEnrolled}</H3>
                <View style={this.style.cancelEnrollmentContainer}>
                    <TextLink
                        accessibilityLabel={`${header.cancelEnrollment},`}
                        isUnderlined
                        onPress={onPressCancelEnrollment}
                    >
                        {header.cancelEnrollment}
                    </TextLink>
                </View>
            </View>
        );
    };

    public PaymentMethod = () => {
        const labels = this.labels.setUpAutomaticPayments.body;
        const { achAuthorizationRequired } = this.props.accountInfo.accountBalancePaymentInfo;
        const { accountNumber, companyName, expirationDate } = this.props.autoEnrolledPaymentMethod;
        const expirationDateAccessibilityLabel = `${labels.expires}, ${getAccessibleCreditCardExpirationDate(
            expirationDate,
            this.labels.months,
            this.labels.numberWords
        )}`;

        return (
            <View>
                <H3>{labels.paymentMethod}</H3>
                <View style={this.style.paymentMethodDetailContainer}>
                    <P>{`${companyName} ${leftPad('*', 4, 4, accountNumber)}`}</P>
                    {achAuthorizationRequired && (
                        <P accessibilityLabel={`${labels.checkingAccount},`}>{labels.checkingAccount}</P>
                    )}
                    {!achAuthorizationRequired && expirationDate && (
                        <P
                            accessibilityLabel={expirationDateAccessibilityLabel}
                        >{`${labels.expires} ${expirationDate}`}</P>
                    )}
                </View>
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }
}
