import { AccountInfo, BankAccount, CreditCard, PaymentMethod, PaymentType } from 'atlas-services/src/models';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { HorizontalRule } from '../';
import { IconNames } from '../../styles';
import { undefinedAction } from '../../utils';
import { DialogBox, FormView, P, PageTitle, PhoneLink, RadioButtonGroup } from '../common';
import DropDown from '../common/form/dropDown';
import IconTextLink from '../common/iconTextLink';
import StyledComponent, { StyleProps } from '../styledComponent';
import { PaymentRadioSelector } from './';
import defaultStyle, { ChangePaymentMethodsStyleSchema } from './changePaymentMethods.style';

export interface Props extends StyleProps {
    arePaymentMethodsPresent: boolean;
    bankAccounts: BankAccount[];
    children?: <C extends ChangePaymentMethodView>(
        parent: C,
        style: ChangePaymentMethodsStyleSchema
    ) => React.ReactNode;
    creditCards: CreditCard[];
    hasRadioButtons: boolean;
    isPrimaryButtonDisabled: boolean;
    isSpecialty: boolean;
    memberInformation: AccountInfo[];
    modalVisible: boolean;
    multipleAccountsPresent?: boolean;
    onDropDownChange: any;
    onPressAddPaymentMethod?: noop;
    onPressEditBankAccount: (paymentMethod: PaymentMethod) => void;
    onPressEditCreditCard: (paymentMethod: PaymentMethod) => void;
    onPressNeedToMakeChanges: (viewRef?: View) => void;
    onPressOverlayClose: noop;
    onPressOverlayPrimary: noop;
    onPressPaymentMethod: (paymentMethod: PaymentMethod) => void;
    onPressSave?: noop;
    onSelectMember: (index: number) => void;
    pageTitle: string;
    pbmPhoneNumber: string;
    saveButtonText?: string;
    selectedMemberName: string;
    selectedPaymentId: string;
    selectedSpecialtyMemberUid: string;
    subHeader?: string;
    subHeaderLabel?: string;
}

export const defaultProps: Partial<Props> = {
    bankAccounts: [],
    children: ({ ContentContainer }: ChangePaymentMethodView, style: ChangePaymentMethodsStyleSchema) => {
        return (
            <>
                <ContentContainer />
            </>
        );
    },
    creditCards: [],
    hasRadioButtons: false,
    isPrimaryButtonDisabled: false,
    multipleAccountsPresent: true,
    onPressAddPaymentMethod: undefinedAction,
    onPressEditBankAccount: undefinedAction,
    onPressEditCreditCard: undefinedAction,
    onPressNeedToMakeChanges: undefinedAction,
    onPressOverlayClose: undefinedAction,
    onPressOverlayPrimary: undefinedAction,
    onPressSave: undefinedAction,
    pbmPhoneNumber: '',
};

export default class ChangePaymentMethodView<ChildProps extends Props = Props> extends StyledComponent<ChildProps> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ChangePaymentMethod';
    public style: ChangePaymentMethodsStyleSchema;

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={this.style.rootContainer}>{children}</ScrollView>
            </SafeAreaView>
        );
    };

    public ContentContainer = () => {
        return this.props.arePaymentMethodsPresent ? (
            <>
                <FormView
                    primaryButtonDisabled={this.props.isPrimaryButtonDisabled}
                    onPressPrimaryButton={this.props.onPressSave}
                    primaryButtonText={this.props.hasRadioButtons ? this.props.saveButtonText : null}
                    style={{
                        buttonContainer: this.style.formViewButtonContainer,
                    }}
                >
                    {({ Buttons }) => (
                        <View style={this.style.rootContainer}>
                            <ScrollView>
                                <PageTitle text={this.props.pageTitle} />
                                <this.SubheaderCopy subHeaderLabel={this.props.subHeader} />
                                <this.MemberSelection />
                                <this.IconLink />
                                <this.PaymentMethodsContainer />
                                <this.Link />
                                <this.Overlay />
                            </ScrollView>
                            <Buttons />
                        </View>
                    )}
                </FormView>
            </>
        ) : (
            <>
                <PageTitle text={this.props.pageTitle} />
                <this.MemberSelection />
                <this.SubheaderCopy subHeaderLabel={this.props.subHeader} />
                <this.IconLink />
            </>
        );
    };

    public IconLink = () => {
        const style: ChangePaymentMethodsStyleSchema = this.style;
        const labels = this.labels.pharmacy.changePaymentMethods.iconLink;
        return (
            <View style={style.addPaymentTextLink}>
                <IconTextLink
                    accessibilityLabel={labels.accessibilityLabel}
                    iconName={IconNames.LIST_ITEM_ACTIONABLE_ICON}
                    onPress={this.props.onPressAddPaymentMethod}
                    style={{ text: this.style.addPaymentText }}
                >
                    {labels.label}
                </IconTextLink>
            </View>
        );
    };

    public Link = () => {
        const style: ChangePaymentMethodsStyleSchema = this.style;
        const labels = this.labels.pharmacy.changePaymentMethods.link;
        return (
            <View style={style.needChangesContainer}>
                <IconTextLink
                    accessibilityLabel={labels.accessibilityLabel}
                    iconName={IconNames.LIST_ITEM_NAVIGATE_ICON}
                    isIconRight={true}
                    onPress={this.props.onPressNeedToMakeChanges}
                    style={{ icon: this.style.needChangesIcon, text: this.style.needChangesText }}
                >
                    {labels.label}
                </IconTextLink>
            </View>
        );
    };

    public MemberSelection = () => {
        const labels = this.labels.pharmacy.changePaymentMethods.memberSelection;
        const isSpecialtyAndMultipleAccounts = this.props.isSpecialty && this.props.multipleAccountsPresent;
        return (
            <>
                {isSpecialtyAndMultipleAccounts && (
                    <View style={this.style.dropDownContainer}>
                        <View style={this.style.dropDownTitleContainer}>
                            <P style={{ paragraph: this.style.dropDownTitle }}>{labels.title}</P>
                        </View>
                        <DropDown
                            displayValue={this.props.selectedMemberName}
                            items={this.props.memberInformation.map((memberInfo: AccountInfo) => {
                                const { firstName, lastName } = memberInfo.accountHolder;
                                return {
                                    accessibilityLabel: this.formatLabel(
                                        labels.accessibilityLabel,
                                        firstName,
                                        lastName
                                    ),
                                    label: `${firstName} ${lastName}`,
                                    value: memberInfo.memberUid,
                                };
                            })}
                            onChange={this.props.onDropDownChange}
                            style={{ rightIconContainer: this.style.dropDownIcon }}
                            title={labels.dropDownTitle}
                            value={this.props.selectedSpecialtyMemberUid}
                        />
                    </View>
                )}
            </>
        );
    };

    public Overlay = () => {
        return (
            <DialogBox
                primaryText={this.labels.pharmacy.changePaymentMethods.overlay.primaryText}
                isVisible={this.props.modalVisible}
                onClose={() => this.props.onPressOverlayClose()}
                primaryMethod={() => this.props.onPressOverlayPrimary()}
            >
                {({ Buttons }) => (
                    <>
                        <this.OverlayContent />
                        <Buttons />
                    </>
                )}
            </DialogBox>
        );
    };

    public PaymentMethodsContainer = () => {
        const { creditCards, bankAccounts } = this.props;
        const labels = this.labels.pharmacy.changePaymentMethods.paymentMethodsContainer;
        return (
            <View style={this.style.cardListContainer}>
                <this.PaymentMethodsList paymentMethods={creditCards} title={labels.creditCard} />
                <HorizontalRule style={{ horizontalRule: this.style.listSeparator }} />
                <this.PaymentMethodsList paymentMethods={bankAccounts} title={labels.bankAccount} />
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this, this.style)}</this.Container>;
    }

    public SubheaderCopy = ({ subHeaderLabel }: { subHeaderLabel: string }) => {
        const style: ChangePaymentMethodsStyleSchema = this.style;
        return (
            <View style={style.subheaderContainer}>
                <P>{subHeaderLabel}</P>
            </View>
        );
    };

    protected onPressSpecialtyBankAccount = (paymentMethod: PaymentMethod) => {
        return this.props.isSpecialty ? this.props.onPressEditBankAccount(paymentMethod) : null;
    };

    protected OverlayContent = () => {
        const labels = this.labels.pharmacy.changePaymentMethods.overlayContent;
        return (
            <P style={{ paragraph: this.style.needChangesOverlayText }}>
                {this.formatLabel(
                    labels.howToMakeChanges,
                    <Text style={this.style.needChangesOverlayAddNew}>{labels.addNew}</Text>
                )}{' '}
                {this.formatLabel(
                    labels.notAnOption,
                    <PhoneLink isUnderlined phoneNumber={this.props.pbmPhoneNumber}>
                        {this.props.pbmPhoneNumber}
                    </PhoneLink>,
                    <P
                        accessibilityLabel={labels.tty.accessibilityLabel}
                        style={{ paragraph: this.style.disabledText }}
                    >
                        {labels.tty.text}
                    </P>
                )}
            </P>
        );
    };

    protected PaymentMethod = ({ paymentMethod }: { paymentMethod: PaymentMethod }): JSX.Element => {
        const { selectedPaymentId } = this.props;
        const selected: boolean = selectedPaymentId === paymentMethod.accountName;
        return (
            <PaymentRadioSelector
                hasRadioButtons={this.props.hasRadioButtons}
                isSpecialty={this.props.isSpecialty}
                item={paymentMethod}
                isSelected={selected}
                lowerRightIconName={IconNames.LIST_ITEM_NAVIGATE_ICON}
                onActionPress={() =>
                    paymentMethod.paymentType === PaymentType.CREDIT_CARD
                        ? this.props.onPressEditCreditCard(paymentMethod)
                        : this.props.onPressEditBankAccount(paymentMethod)
                }
                onRadioPress={() => this.props.onPressPaymentMethod(paymentMethod)}
            />
        );
    };

    protected PaymentMethodsList = ({ paymentMethods, title }: { paymentMethods: PaymentMethod[]; title: string }) => {
        return (
            <RadioButtonGroup
                customButton={({ buttonInfo }) => <this.PaymentMethod paymentMethod={buttonInfo} />}
                radioButtonGroupAccessibilityLabel=""
                radioButtonGroupTitle={title}
                radioButtonItems={paymentMethods}
                isVertical={true}
                style={{ title: this.style.cardTitle }}
            />
        );
    };
}
