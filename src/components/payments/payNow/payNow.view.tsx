import { PaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { PaymentCard } from '..';
import { DialogBox, FormView, H1, HorizontalRule, InlineAlert } from '../..';
import { IconNames } from '../../../styles';
import { formatCurrency as defaultFormatCurrency } from '../../../utils';
import { DisclaimerCopy, H2, P, TextLink } from '../../common';
import iconStyle from '../../common/icon.style';
import InfoModal from '../../common/infoModal';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { defaultStyle, PayNowStyleSchema } from './index';

export interface Props extends StyleProps {
    arePaymentsPresent?: boolean;
    children?: <C extends PayNowView>(parent: C) => React.ReactNode;
    enableSpecialtyPaymentLink?: boolean;
    formatCurrency: (value: number | string) => string;
    isPaymentNeeded: (balance: number) => boolean;
    isSubmitButtonDisabled: boolean;
    onCancel?: noop;
    onPressChangePaymentMethod?: (isManagePayement?: boolean) => void;
    onPressPaymentHistory?: noop;
    onSubmit?: noop;
    paymentAmountValue?: string;
    selectedPaymentMethod?: PaymentMethod;
    style?: Partial<PayNowStyleSchema>;
}

export const defaultProps = {
    arePaymentsPresent: true,
    children: ({
        AmountDue,
        appState,
        Divider,
        labels,
        PaymentSection,
        PayPharmacyAccount,
        PayAmountContent,
        props,
    }) => {
        const { isPaymentNeeded, isSubmitButtonDisabled, onCancel, onSubmit, paymentAmountValue } = props;
        return (
            <>
                <FormView
                    primaryButtonDisabled={isSubmitButtonDisabled}
                    onPressPrimaryButton={onSubmit}
                    primaryButtonText={labels.pharmacy.payNow.primaryButtonText}
                    onPressTextLink={onCancel}
                    textLinkText={labels.pharmacy.payNow.textLinkText}
                >
                    {({ Buttons }) => (
                        // TODO: Use card's styles once that is set up properly
                        <ScrollView>
                            <PayPharmacyAccount />
                            <AmountDue
                                amountDueValue={paymentAmountValue}
                                sectionLabel={labels.pharmacy.payNow.amountDue}
                            />
                            <PayAmountContent />
                            {isPaymentNeeded(appState.pbmAccountBalance) && <Buttons />}
                            <Divider />
                            <PaymentSection
                                isManagePaymentsLinkVisible={props.isPaymentNeeded(appState.pbmAccountBalance)}
                                managePaymentsLinkText={labels.pharmacy.payNow.managePaymentMethodLink}
                            />
                        </ScrollView>
                    )}
                </FormView>
            </>
        );
    },
    enableSpecialtyPaymentLink: false,
    formatCurrency: defaultFormatCurrency,
    isAccountAlertVisible: false,
    isPaymentNeeded: () => false,
};

export default class PayNowView<ChildProps extends Props = Props> extends StyledComponent<ChildProps> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'PayNow';
    public style: PayNowStyleSchema;

    public AmountDue = ({ amountDueValue, sectionLabel }: { amountDueValue: string; sectionLabel: string }) => {
        return (
            <View style={this.style.amountDueContainer}>
                <H2>{sectionLabel}</H2>
                <View style={this.style.amountDueValueContainer}>
                    <H1>{amountDueValue}</H1>
                    <InfoModal
                        hitSlop={{ top: 60, right: 20, bottom: 20, left: 100 }}
                        style={{ infoIcon: this.style.infoButton }}
                    >
                        <P>{this.labels.pharmacy.payNow.tooltip}</P>
                    </InfoModal>
                </View>
            </View>
        );
    };

    public Container = ({ children }: { children: React.ReactNode }) => {
        return <ScrollView contentContainerStyle={this.style.rootContainer}>{children}</ScrollView>;
    };

    public Disclaimer = (): JSX.Element => {
        return (
            <View style={this.style.disclaimerTextContainer}>
                <DisclaimerCopy>{this.labels.pharmacy.payNow.disclaimer}</DisclaimerCopy>
            </View>
        );
    };

    public Divider = (): JSX.Element => {
        return (
            <View style={this.style.horizontalRuleContainer}>
                <HorizontalRule />
            </View>
        );
    };

    public InfoButton = (): JSX.Element => {
        return this.getIcon(IconNames.INFO_HELP_ICON, {
            style: this.style.infoButton,
        });
    };

    public ManageChangePaymentSection = () => {
        return (
            <TouchableOpacity accessibilityRole="button" style={this.style.activityPaymentContainer}>
                <TextLink>{this.labels.pharmacy.payNow.managePaymentMethodLink}</TextLink>
            </TouchableOpacity>
        );
    };

    public PayAmountContent = () => {
        return this.props.isPaymentNeeded(this.appState.pbmAccountBalance) ? (
            <>
                <this.Divider />
                <this.PaymentAmount />
                <this.Divider />
                <PaymentCard
                    arePaymentsPresent={this.props.arePaymentsPresent}
                    isDefaultNecessary
                    onActionPress={this.props.onPressChangePaymentMethod}
                    paymentMethod={this.props.selectedPaymentMethod}
                />
                <this.Disclaimer />
            </>
        ) : (
            <P style={{ paragraph: this.style.noPaymentText }}>{this.labels.pharmacy.payNow.noPayment}</P>
        );
    };

    public PaymentAmount = (): JSX.Element => {
        return (
            <View style={this.style.paymentAmountTextContainer}>
                <H2>{this.labels.pharmacy.payNow.paymentAmount}</H2>
                <P>{this.props.paymentAmountValue}</P>
            </View>
        );
    };

    public PaymentSection = ({
        isManagePaymentsLinkVisible,
        managePaymentsLinkText,
    }: {
        isManagePaymentsLinkVisible: boolean;
        managePaymentsLinkText: string;
    }) => {
        return (
            <View style={this.style.activityPaymentContainer}>
                {!isManagePaymentsLinkVisible && this.props.enableSpecialtyPaymentLink && (
                    <TouchableOpacity
                        accessible
                        accessibilityLabel={managePaymentsLinkText}
                        accessibilityRole="button"
                        style={this.style.paymentSectionContainer}
                        onPress={() => this.props.onPressChangePaymentMethod(true)}
                    >
                        <TextLink onPress={() => this.props.onPressChangePaymentMethod(true)}>
                            {managePaymentsLinkText}
                        </TextLink>
                        {this.getIcon(IconNames.LIST_ITEM_NAVIGATE_ICON, {
                            style: this.style.iconContainer,
                        })}
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    accessible
                    accessibilityLabel={this.labels.pharmacy.payNow.paymentActivity}
                    accessibilityRole="button"
                    style={this.style.paymentSectionContainer}
                    onPress={this.props.onPressPaymentHistory}
                >
                    <TextLink onPress={this.props.onPressPaymentHistory}>
                        {this.labels.pharmacy.payNow.paymentActivity}
                    </TextLink>
                    {this.getIcon(IconNames.LIST_ITEM_NAVIGATE_ICON, {
                        style: this.style.iconContainer,
                    })}
                </TouchableOpacity>
            </View>
        );
    };

    public PayPharmacyAccount = (): JSX.Element => {
        return (
            <View style={this.style.payPharmacyAccountTextContainer}>
                <H1>{this.labels.pharmacy.payNow.payPharmacyAccount}</H1>
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }
}
