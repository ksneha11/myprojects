import { AccountInfo, PersonInfo, RecurringPaymentMethod } from 'atlas-services/src/models';
import moment, { Moment } from 'moment';
import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { automaticPaymentsDefaultStyle } from '.';
import { FormView, H2, HorizontalRule } from '../..';
import { IconNames } from '../../../styles';
import { dateSuffix } from '../../../utils/dateSuffix';
import formatCurrency from '../../../utils/formatCurrency';
import leftPad from '../../../utils/leftPad';
import { H1, P } from '../../common';
import TextButton from '../../common/textButton';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { AutomaticPaymentsEnabledSpecialtyStyleSchema } from './automaticPaymentsEnabledSpecialty.style';

export interface Props extends StyleProps {
    children: (parent: AutomaticPaymentsEnabledSpecialtyView) => React.ReactNode;
    dateSuffix: (day: number) => string;
    enrolledPaymentMethod: RecurringPaymentMethod;
    formatCurrency: (value: number) => string;
    getPaymentDate: (paymentMethod: RecurringPaymentMethod) => Moment;
    hitSlop?: { bottom?: number; left?: number; right?: number; top?: number };
    onPressReturnToHome: noop;
    onPressSetUpAdditionalMembers: noop;
    selectedSpecialtyAccount: AccountInfo;
    specialtyAccounts: AccountInfo[];
    style?: Partial<AutomaticPaymentsEnabledSpecialtyStyleSchema>;
}

const defaultProps = {
    children: ({
        Divider,
        EnrollmentInfo,
        labels,
        MemberInfo,
        props,
        SetUpAdditionalMembers,
        SucessContent,
    }: AutomaticPaymentsEnabledSpecialtyView) => {
        return (
            <>
                <SucessContent />
                <Divider />
                <FormView
                    primaryButtonText={labels.pharmacy.automaticPaymentsEnabledSpecialty.formView.primaryButtonText}
                    onPressPrimaryButton={props.onPressReturnToHome}
                >
                    {({ Buttons }) => {
                        return (
                            <>
                                <MemberInfo />
                                <EnrollmentInfo />
                                <SetUpAdditionalMembers />
                                <Buttons />
                            </>
                        );
                    }}
                </FormView>
            </>
        );
    },
    dateSuffix,
    formatCurrency,
    hitSlop: { bottom: 10, left: 20, right: 20, top: 10 },
};

export default class AutomaticPaymentsEnabledSpecialtyView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = automaticPaymentsDefaultStyle;
    public name = 'AutomaticPaymentsEnabledSpecialty';
    public style: AutomaticPaymentsEnabledSpecialtyStyleSchema;

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

    public EnrollmentInfo = () => {
        if (!this.props.enrolledPaymentMethod || !this.props.enrolledPaymentMethod.frequency) {
            return <></>;
        }
        const labels = this.labels.pharmacy.automaticPaymentsEnabledSpecialty.enrollmentInfo;
        const dateInfo = this.props.enrolledPaymentMethod.expirationDate
            ? this.props.enrolledPaymentMethod.expirationDate.split('/')
            : [];
        const accessibleExpirationDate = (this.formatLabel(
            labels.expirationDate,
            dateInfo.length
                ? moment()
                      .month(parseFloat(dateInfo[0]) - 1)
                      .year(parseInt(dateInfo[1], 10))
                      .format('MMMM, YYYY')
                : ''
        ) as string[]).join('');
        const firstPaymentDate = this.isImmediate(this.props.enrolledPaymentMethod.frequency)
            ? ''
            : this.props.getPaymentDate(this.props.enrolledPaymentMethod).format('MM/DD/YYYY');
        const firstPaymentDateAccessible = this.isImmediate(this.props.enrolledPaymentMethod.frequency)
            ? ''
            : this.props.getPaymentDate(this.props.enrolledPaymentMethod).format('LL');

        const monthlyPaymentDateLabel = this.getMonthlyPaymentDateLabel(this.props.enrolledPaymentMethod);

        // FIXME:
        // https://bitbucket.anthem.com/projects/MOBGEN/repos/atlas/pull-requests/1353/diff#src/components/payments/manageAutoSpecialty/automaticPaymentsEnabledSpecialty.view.tsx?F112
        const paymentChargeLabel = this.getPaymentChargeLabel(this.props.enrolledPaymentMethod);
        return (
            <View style={this.style.enrollmentInfoContainer}>
                <H2 style={{ h2: this.style.autoPaymentTitle }}>{labels.title}</H2>
                <View style={this.style.enrollmentRecapContainer}>
                    <P>{paymentChargeLabel}</P>
                    <>
                        {/*FIXME: (isImmediate) https://bitbucket.anthem.com/projects/MOBGEN/repos/atlas/pull-requests/1353/diff#src/components/payments/manageAutoSpecialty/automaticPaymentsEnabledSpecialty.view.tsx?F112 */}
                        {!this.isImmediate(this.props.enrolledPaymentMethod.frequency) && (
                            <P>{monthlyPaymentDateLabel}</P>
                        )}
                    </>
                </View>
                <>
                    {!this.isImmediate(this.props.enrolledPaymentMethod.frequency) && (
                        <P
                            accessibilityLabel={firstPaymentDateAccessible}
                            style={{ paragraph: this.style.paymentDate }}
                        >
                            {this.formatLabel(labels.firstPaymentDate, firstPaymentDate)}
                        </P>
                    )}
                </>

                <P style={{ paragraph: this.style.paymentMethod }}>{labels.paymentMethod}</P>
                <P>
                    {this.props.enrolledPaymentMethod.companyName}{' '}
                    {leftPad('*', 4, 4, this.props.enrolledPaymentMethod.accountName)}
                </P>
                <P accessibilityLabel={accessibleExpirationDate} style={{ paragraph: this.style.expirationDate }}>
                    {this.formatLabel(labels.expirationDate, this.props.enrolledPaymentMethod.expirationDate)}
                </P>
                <this.Divider />
            </View>
        );
    };

    public isImmediate = (frequency: string) => {
        return frequency === 'IMMEDIATE';
    };

    public MemberInfo = () => {
        const labels = this.labels.pharmacy.automaticPaymentsEnabledSpecialty;
        const accountHolderInfo =
            (this.props.selectedSpecialtyAccount && this.props.selectedSpecialtyAccount.accountHolder) ||
            this.logger.warn('No account holder information found') ||
            ({} as PersonInfo);
        return (
            <View style={this.style.memberInfoContainer}>
                <H2 style={{ h2: this.style.headerText }}>
                    {this.formatLabel(
                        labels.memberInfo.memberName,
                        this.props.selectedSpecialtyAccount
                            ? `${accountHolderInfo.firstName} ${accountHolderInfo.lastName}`
                            : ''
                    )}
                </H2>
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public SetUpAdditionalMembers = () => {
        return (
            <>
                {this.props.specialtyAccounts.length > 1 && (
                    <View>
                        <TouchableOpacity
                            accessible
                            accessibilityLabel={
                                this.labels.pharmacy.automaticPaymentsEnabledSpecialty.setUpAdditionalMembers.textLink
                            }
                            accessibilityRole={'button'}
                            hitSlop={this.props.hitSlop}
                            onPress={this.props.onPressSetUpAdditionalMembers}
                            style={this.style.setUpAdditionalMembersTextLinkContainer}
                        >
                            <View style={this.style.setUpAdditionalMembersTextLink}>
                                {
                                    <TextButton onPress={this.props.onPressSetUpAdditionalMembers}>
                                        {
                                            this.labels.pharmacy.automaticPaymentsEnabledSpecialty
                                                .setUpAdditionalMembers.textLink
                                        }
                                    </TextButton>
                                }
                            </View>
                            {this.getIcon(IconNames.LIST_ITEM_NAVIGATE_ICON, {
                                style: this.style.setUpAdditionalMembersTextLinkIcon,
                            })}
                        </TouchableOpacity>
                        <this.Divider />
                    </View>
                )}
            </>
        );
    };

    public SucessContent = () => {
        const labels = this.labels.pharmacy.automaticPaymentsEnabledSpecialty.successContent;
        return (
            <View style={this.style.infoContainer}>
                <H1 style={{ h1: this.style.successHeader }}>{labels.title}</H1>
                <P>{labels.subTitle}</P>
            </View>
        );
    };

    protected getMonthlyPaymentDateLabel = (paymentMethod: RecurringPaymentMethod) => {
        const labels = this.labels.pharmacy.automaticPaymentsEnabledSpecialty.enrollmentInfo;
        return this.isImmediate(paymentMethod.frequency)
            ? labels.specialtyOrderDate
            : this.formatLabel(
                  labels.everyNthOfTheMonth,
                  `${paymentMethod.frequency}${this.props.dateSuffix(parseFloat(paymentMethod.frequency))}`
              );
    };

    protected getPaymentChargeLabel = (paymentMethod: RecurringPaymentMethod) => {
        const labels = this.labels.pharmacy.automaticPaymentsEnabledSpecialty.enrollmentInfo;

        if (this.isImmediate(paymentMethod.frequency)) {
            return paymentMethod.chargeLimit
                ? this.formatLabel(
                      labels.chargeBalanceLimitImmediate,
                      this.props.formatCurrency(paymentMethod.chargeLimit),
                      this.getMonthlyPaymentDateLabel(paymentMethod) as string
                  )
                : this.formatLabel(labels.chargeMe, this.getMonthlyPaymentDateLabel(paymentMethod) as string);
        } else {
            return paymentMethod.chargeLimit
                ? this.formatLabel(labels.chargeBalanceLimit, this.props.formatCurrency(paymentMethod.chargeLimit))
                : labels.chargeFullBalance;
        }
    };
}
