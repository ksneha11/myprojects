import { AccountInfo, PaymentHistory } from 'atlas-services/src/models';
import moment from 'moment';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { HorizontalRule, P } from '../..';
import { IconNames } from '../../../styles';
import { formatCurrency as formatCurrencyUtil } from '../../../utils';
import { TextLink } from '../../common';
import Icon from '../../common/icon';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { defaultStyle, MakePaymentStyleSchema } from './index';

export interface Props extends StyleProps {
    autoEnrolledSpecialtyAccounts: AccountInfo[];
    children?: <C extends MakePaymentView>(parent: C) => React.ReactNode;
    formatCurrency: (value: number | string) => string;
    hitSlop?: { bottom?: number; left?: number; right?: number; top?: number };
    isPaymentNeeded: (balance: number) => boolean;
    onPressManageAutoSpecialty: noop;
    onPressPaymentHistory: noop;
    onPressPharmacyAccount: noop;
    onPressSpecialtyAccount: noop;
    recentPayment: PaymentHistory;
    recentPaymentsContent?: () => JSX.Element;
    specialtyAccounts: AccountInfo[];
    specialtyAccountValue: string;
    specialtyTitle: string;
    style?: Partial<MakePaymentStyleSchema>;
}

export const defaultProps: Partial<Props> = {
    children: ({
        appState,
        MostRecentPayments,
        labels,
        PharmacyAccountBalance,
        props: {
            formatCurrency,
            isPaymentNeeded,
            onPressPharmacyAccount,
            onPressSpecialtyAccount,
            recentPaymentsContent,
        },
        SectionDivider,
        SpecialtyAccountBalance,
    }: MakePaymentView) => {
        return (
            <>
                <PharmacyAccountBalance
                    balance={
                        isPaymentNeeded(appState.pbmAccountBalance)
                            ? formatCurrency(appState.pbmAccountBalance)
                            : formatCurrency(0)
                    }
                    onPress={onPressPharmacyAccount}
                    title={labels.pharmacy.makePayment.pharmacyAccountBalance.pbmTitle}
                />
                <SectionDivider />
                <SpecialtyAccountBalance
                    balance={
                        isPaymentNeeded(appState.specialtyAccountBalance)
                            ? formatCurrency(appState.specialtyAccountBalance)
                            : formatCurrency(0)
                    }
                    onPress={onPressSpecialtyAccount}
                    title={labels.pharmacy.makePayment.pharmacyAccountBalance.specialtyTitle}
                />
                <MostRecentPayments recentPaymentsContent={recentPaymentsContent} />
            </>
        );
    },
    formatCurrency: formatCurrencyUtil,
    hitSlop: {},
    specialtyAccountValue: '',
    specialtyTitle: '',
};

export default class MakePaymentView<ChildProps extends Props = Props> extends StyledComponent<ChildProps> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'MakePayment';
    public style: MakePaymentStyleSchema;

    public AccountBalanceContent = ({
        balance,
        onPress,
        title,
    }: {
        balance: string;
        onPress: noop;
        title: string;
    }): JSX.Element => {
        const style = this.style;
        const labels = this.labels.pharmacy.makePayment.pharmacyAccountBalance;
        return (
            <View>
                <P style={{ paragraph: style.sectionTitle }}>{title}</P>
                <View style={style.sectionContainer}>
                    <P style={{ paragraph: style.sectionValue }}>{balance}</P>
                    <TouchableOpacity
                        accessibilityLabel={this.labels.pharmacy.makePayment.pharmacyAccountBalance.payNow}
                        accessibilityRole="button"
                        hitSlop={this.props.hitSlop}
                        onPress={onPress}
                        style={this.style.payNowContainer}
                    >
                        <P onPress={onPress} style={{ paragraph: style.payNowText }}>
                            {labels.payNow}
                        </P>
                        <Icon style={{ rootItem: style.payNowIcon }} name={IconNames.LIST_ITEM_NAVIGATE_ICON} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    // TODO: remove section from this name
    public AutomaticPaymentSection = () => {
        const style = this.style;
        const labels = this.labels.pharmacy.makePayment.automaticPaymentSection;
        const allAccountsAutomaticallyEnrolled =
            this.props.autoEnrolledSpecialtyAccounts.length === this.props.specialtyAccounts.length;
        return allAccountsAutomaticallyEnrolled ? (
            <View>
                <P style={{ paragraph: this.style.sectionTitle }}>{labels.title}</P>
                <View style={this.style.automaticContentSpace}>
                    <>
                        {this.props.autoEnrolledSpecialtyAccounts.length === 1 ? (
                            <>
                                <P style={{ paragraph: this.style.enrollmentText }}>{labels.enrolled}</P>
                                <TextLink
                                    accessibilityRole="button"
                                    isUnderlined
                                    onPress={this.props.onPressManageAutoSpecialty}
                                    style={{ textLink: style.setupTextLink }}
                                >
                                    {labels.viewSettings}
                                </TextLink>
                            </>
                        ) : (
                            <P style={{ paragraph: this.style.enrollmentText }}>{labels.enrolled}</P>
                        )}
                    </>
                </View>
            </View>
        ) : this.props.autoEnrolledSpecialtyAccounts.length ? (
            <View>
                <P style={{ paragraph: this.style.sectionTitle }}>{labels.title}</P>
                <View style={style.automaticContentSpace}>
                    <P style={{ paragraph: style.enrollmentText }}>
                        {this.formatLabel(
                            labels.someEnrolled,
                            this.props.autoEnrolledSpecialtyAccounts.length,
                            this.props.specialtyAccounts.length
                        )}
                    </P>
                    <TextLink
                        accessibilityRole="button"
                        isUnderlined
                        onPress={this.props.onPressManageAutoSpecialty}
                        style={{ textLink: style.setupTextLink }}
                    >
                        {labels.setup}
                    </TextLink>
                </View>
            </View>
        ) : (
            <View>
                <P style={{ paragraph: style.sectionTitle }}>{labels.title}</P>
                <View style={style.automaticContentSpace}>
                    <P style={{ paragraph: style.enrollmentText }}>{labels.notEnrolled}</P>
                    <TextLink
                        accessibilityRole="button"
                        isUnderlined
                        onPress={this.props.onPressManageAutoSpecialty}
                        style={{ textLink: style.setupTextLink }}
                    >
                        {labels.setup}
                    </TextLink>
                </View>
            </View>
        );
    };

    public Container = ({ children }: { children: React.ReactNode }) => <ScrollView>{children}</ScrollView>;

    public MostRecentPayments = ({ recentPaymentsContent }: { recentPaymentsContent: () => JSX.Element }) => {
        const { recentPayment } = this.props;
        const style = this.style;
        const labels = this.labels.pharmacy.makePayment.mostRecentPayments;
        return (
            <>
                {recentPayment ? (
                    <View style={style.recentPaymentContainer}>
                        <P style={{ paragraph: style.recentPaymentText }}>{labels.title}</P>
                        <P style={{ paragraph: style.recentPaymentAmountContainer }}>
                            <P style={{ paragraph: style.weightedText }}>
                                {this.props.formatCurrency(recentPayment.transactionAmount)}
                            </P>
                            <P style={{ paragraph: style.recentPaymentText }}> {labels.paidOn} </P>
                            <P style={{ paragraph: style.recentPaymentText }}>
                                {moment(recentPayment.transactionDate).format('MM/DD/YYYY')}
                            </P>
                        </P>
                        <TouchableOpacity>
                            <TextLink
                                accessibilityRole="button"
                                isUnderlined
                                onPress={this.props.onPressPaymentHistory}
                            >
                                {labels.viewPaymentHistory}
                            </TextLink>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={this.style.noRecentPaymentContainer}>
                        <P style={{ paragraph: style.noRecentPaymentText }}>{labels.noRecentPayments}</P>
                        <TouchableOpacity>
                            <TextLink
                                accessibilityRole="button"
                                isUnderlined
                                onPress={this.props.onPressPaymentHistory}
                            >
                                {labels.viewPaymentHistory}
                            </TextLink>
                        </TouchableOpacity>
                    </View>
                )}
            </>
        );
    };

    public PharmacyAccountBalance = ({
        balance,
        onPress,
        title,
    }: {
        balance: string;
        onPress: noop;
        title: string;
    }): JSX.Element => {
        return <this.AccountBalanceContent balance={balance} onPress={onPress} title={title} />;
    };

    public render = () => <this.Container>{this.props.children(this)}</this.Container>;

    public SectionDivider = (): JSX.Element => {
        const style = this.style;
        return (
            <View style={style.horizontalLine}>
                <HorizontalRule />
            </View>
        );
    };

    public SpecialtyAccountBalance = ({
        balance,
        onPress,
        title,
    }: {
        balance: string;
        onPress: noop;
        title: string;
    }): JSX.Element => {
        return (
            <>
                {this.props.specialtyAccounts && !!this.props.specialtyAccounts.length && (
                    <View>
                        <this.AccountBalanceContent balance={balance} onPress={onPress} title={title} />
                        <this.AutomaticPaymentSection />
                        <this.SectionDivider />
                    </View>
                )}
            </>
        );
    };
}
