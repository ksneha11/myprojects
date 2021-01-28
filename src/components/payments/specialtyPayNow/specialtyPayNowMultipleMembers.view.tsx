import { AccountBalance, AccountInfo, RecurringPaymentMethod } from 'atlas-services/src/models';
import React, { FunctionComponent } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { HorizontalRule } from '../..';
import { IconNames } from '../../../styles';
import { formatCurrency } from '../../../utils';
import { H1, H2, H3, P, TextLink } from '../../common';
import AppComponent from '../../common/appComponent';
import InfoModal from '../../common/infoModal';
import { StyleProps } from '../../styledComponent';
import defaultStyle, { SpecialtyPayNowMultipleMembersStyleSchema } from './specialtyPayNowMultipleMembers.style';

export interface Props extends StyleProps {
    accountBalance: AccountBalance;
    accountBalanceInfo: AccountInfo;
    children?: (parent: SpecialtyPayNowMultipleMembersView) => React.ReactNode;
    onPressPaymentHistory: noop;
    onPressPayNow: (amountDue: number, selectedAccount: AccountInfo) => void;
    onPressSetupAutomaticPayments: (item: AccountInfo) => void;
    onPressViewSettings: (item: AccountInfo) => void;
}

const defaultProps: Partial<Props> = {
    children: ({
        HorizontalRuleNoMargin,
        MemberPayments,
        ManageMemberPayments,
        MemberContent,
        PaymentActivitySection,
        TotalBalance,
    }: SpecialtyPayNowMultipleMembersView) => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <MemberContent />
                <TotalBalance />
                <ManageMemberPayments />
                <HorizontalRuleNoMargin />
                <MemberPayments />
                <HorizontalRuleNoMargin />
                <PaymentActivitySection />
            </ScrollView>
        );
    },
};

export default class SpecialtyPayNowMultipleMembersView extends AppComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'SpecialtyPayNowMultipleMembers';
    public style: SpecialtyPayNowMultipleMembersStyleSchema;

    public AutomaticPaymentSectionEnrolled = ({ accountInfo }: { accountInfo: AccountInfo }) => {
        const labels = this.labels.pharmacy.makePayment;
        return (
            <View style={this.style.automaticContainer}>
                <H3 accessibilityLabel={`${labels.automaticPaymentSection.title},`} accessibilityRole="none">
                    {labels.automaticPaymentSection.title}
                </H3>
                <View style={this.style.automaticContentSpace}>
                    <P style={{ paragraph: this.style.enrollmentText }}>{labels.enrolled} </P>
                    <P
                        accessibilityRole="button"
                        onPress={() => {
                            this.props.onPressViewSettings(accountInfo);
                        }}
                        style={{ paragraph: this.style.linkText }}
                    >
                        {labels.automaticPaymentSection.viewSettings}
                    </P>
                </View>
            </View>
        );
    };

    public AutomaticPaymentSectionNotEnrolled = ({ accountInfo }: { accountInfo: AccountInfo }) => {
        const labels = this.labels.pharmacy.makePayment;
        return (
            <View style={this.style.automaticContainer}>
                <H3 accessibilityLabel={`${labels.automaticPaymentSection.title},`} accessibilityRole="none">
                    {labels.automaticPaymentSection.title}
                </H3>
                <View style={this.style.automaticContentSpace}>
                    <P style={{ paragraph: this.style.enrollmentText }}>{labels.notEnrolled} </P>
                    <TextLink
                        accessibilityRole="button"
                        isUnderlined
                        onPress={() => {
                            this.props.onPressSetupAutomaticPayments(accountInfo);
                        }}
                        style={{ paragraph: this.style.linkText }}
                    >
                        {labels.automaticPaymentSection.setup}
                    </TextLink>
                </View>
            </View>
        );
    };

    public EnrolledLabel: FunctionComponent = () => {
        return <P style={{ paragraph: this.style.enrollmentText }}>{this.labels.pharmacy.makePayment.enrolled} </P>;
    };

    public HorizontalRuleNoMargin = () => {
        return <HorizontalRule style={{ horizontalRule: this.style.horizontalRule }} />;
    };

    public IconContainer = () => {
        return (
            <View
                style={this.style.iconContainer}
                accessible
                accessibilityLabel={this.labels.pharmacy.orderStatusItem.iconContainer.accessibilityLabel}
                accessibilityRole="button"
            >
                {this.getIcon(IconNames.LIST_ITEM_NAVIGATE_ICON, {
                    style: this.style.icon,
                })}
            </View>
        );
    };

    public InfoButton = (): JSX.Element => {
        return this.getIcon(IconNames.INFO_HELP_ICON, {
            style: this.style.infoButton,
        });
    };

    public ManageMemberPayments = () => {
        const labels = this.labels.pharmacy.specialtyPayNowMultipleMembers;
        return (
            <View style={this.style.paymentContainer}>
                <H2 style={{ h2: this.style.paymentsTitle }}>{labels.memberPayments.title}</H2>
                <P style={{ paragraph: this.style.paymentsContent }}>{labels.memberPayments.content}</P>
            </View>
        );
    };

    public MemberContent = () => {
        const labels = this.labels.pharmacy.specialtyPayNowMultipleMembers.memberContent;
        return (
            <View style={this.style.memberContainer}>
                <H1>{labels.title}</H1>
            </View>
        );
    };

    public MemberPayments = () => {
        return (
            <FlatList
                data={this.props.accountBalance.specialtyAccounts}
                ItemSeparatorComponent={this.HorizontalRuleNoMargin}
                keyExtractor={item => item.memberUid}
                renderItem={this.renderMemberPaymentsItem}
            />
        );
    };

    public PaymentActivitySection = (): JSX.Element => {
        return (
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`${this.labels.pharmacy.payNow.paymentActivity}`}
                onPress={this.props.onPressPaymentHistory}
                style={this.style.paymentActivityContainer}
            >
                <TextLink onPress={this.props.onPressPaymentHistory}>
                    {this.labels.pharmacy.payNow.paymentActivity}
                </TextLink>
                <this.IconContainer />
            </TouchableOpacity>
        );
    };

    public render() {
        return <View style={this.style.rootContainer}>{this.props.children(this)}</View>;
    }

    public TotalBalance = () => {
        return (
            <View style={this.style.totalBalanceContainer}>
                <H3>{this.labels.pharmacy.specialtyPayNow.radioButtonContainer.radioButtonGroup.items.totalBalance}</H3>
                <View style={this.style.totalBalanceValueContainer}>
                    <H1 style={{ h1: this.style.totalBalanceValue }}>
                        {formatCurrency(this.props.accountBalance.totalSpecialtyBalance)}
                    </H1>
                    <InfoModal
                        hitSlop={{ top: 60, right: 20, bottom: 20, left: 100 }}
                        style={{ infoIcon: this.style.infoButton }}
                    >
                        <P>{this.labels.pharmacy.specialtyPayNowMultipleMembers.tooltip}</P>
                    </InfoModal>
                </View>
            </View>
        );
    };

    protected renderMemberPaymentsItem = ({ item }: { item: AccountInfo }) => {
        if (item.accountHolder) {
            const labels = this.labels.pharmacy.specialtyPayNowMultipleMembers;
            const name = item.accountHolder.firstName + ' ' + item.accountHolder.lastName;

            const automaticallyEnrolledPaymentMethod: AccountInfo = item.paymentMethods.find(paymentMethod => {
                const recurringPaymentMethod = paymentMethod as RecurringPaymentMethod;
                return recurringPaymentMethod.isRecurring;
            });

            const accountBalance = item.accountBalance;

            const hasAccountBalance = parseInt(accountBalance, 10) > 0;

            return (
                <View style={this.style.contentContainer}>
                    <View style={this.style.paymentContentContainer}>
                        <H2
                            accessibilityLabel={`${name},`}
                            accessibilityRole="none"
                            style={{ h2: this.style.paymentsTitle }}
                        >
                            {name}
                        </H2>
                        {hasAccountBalance ? (
                            <TouchableOpacity
                                accessibilityLabel={`${this.labels.pharmacy.makePayment.pharmacyAccountBalance.payNow},`}
                                accessibilityRole="button"
                                onPress={() => this.props.onPressPayNow(parseInt(accountBalance, 10), item)}
                                style={this.style.payNowContainer}
                            >
                                <P
                                    onPress={() => this.props.onPressPayNow(parseInt(accountBalance, 10), item)}
                                    style={{ paragraph: this.style.payNowText }}
                                >
                                    {this.labels.pharmacy.makePayment.pharmacyAccountBalance.payNow}
                                </P>
                                <this.IconContainer />
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )}
                    </View>
                    <P
                        accessibilityLabel={`${labels.memberContent.balance} ${formatCurrency(accountBalance)},`}
                        style={{ paragraph: this.style.subTitle }}
                    >
                        {labels.memberContent.balance} {formatCurrency(accountBalance)}
                    </P>
                    {automaticallyEnrolledPaymentMethod ? (
                        <this.AutomaticPaymentSectionEnrolled accountInfo={item} />
                    ) : (
                        <this.AutomaticPaymentSectionNotEnrolled accountInfo={item} />
                    )}
                </View>
            );
        }
        return null;
    };
}
