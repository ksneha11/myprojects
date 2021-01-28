import { Address, BankAccount, BankAccountType } from 'atlas-services/src/models';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { BankAccountForm } from '.';
import { FormField, FormView, H2, HorizontalRule, InlineAlert, P } from '..';
import { ImageNames } from '../../styles';
import leftPad from '../../utils/leftPad';
import { AddressInformation } from '../Addresses/addressInformation';
import RadioButton from '../common/radioButton';
import ToggleSwitch from '../common/toggleSwitch';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { BankAccountFormStyleSchema } from './bankAccount.style';

export interface Props extends StyleProps {
    accountNumberError?: string;
    bankAccount?: BankAccount;
    bankAccountEditable?: boolean;
    bankAccountTypeError?: string;
    billingAddress?: Address;
    children?: <C extends BankAccountFormView>(parent: C) => React.ReactNode;
    exampleImage?: (style: BankAccountFormStyleSchema) => JSX.Element;
    isSaveDisabled?: boolean;
    isSetDefaultToggleDisabled?: boolean;
    isSpecialty?: boolean;
    onBlurAccountNumber?: () => void;
    onBlurRoutingNumber?: () => void;
    onChangeAccountNumber?: (accountNumber: string) => void;
    onChangeAddressInformation?: (billingAddress: Address) => void;
    onChangeBankAccountType?: (bankAccountType: BankAccountType) => void;
    onChangeRoutingNumber?: (routingNumber: string) => void;
    onFocusAccountNumber?: () => void;
    onFocusRoutingNumber?: () => void;
    onPressSave?: () => void;
    onPressSelectDefaultPaymentMethod?: (defaultPaymentMethod?: boolean) => void;
    routingNumberError?: string;
}

export const defaultProps: Partial<Props> = {
    bankAccountEditable: true,
    children: ({ ContentContainer, labels, props }: BankAccountFormView) => {
        return (
            <>
                <FormView
                    onPressPrimaryButton={props.onPressSave}
                    primaryButtonDisabled={props.isSaveDisabled}
                    primaryButtonText={labels.pharmacy.bankAccountForm.primaryButtonText}
                    style={{ buttonContainer: { alignSelf: 'flex-end', justifyContent: 'center' } }}
                >
                    {({ Buttons }) => (
                        <View>
                            <ContentContainer />
                            <Buttons />
                        </View>
                    )}
                </FormView>
            </>
        );
    },
};

export default class BankAccountFormView<P extends Props = Props> extends StyledComponent<P> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'AddBankAccount';
    public style: BankAccountFormStyleSchema;

    public AccountNumberContainer = () => {
        const labels = this.labels.pharmacy.bankAccountForm.accountNumberContainer;
        return (
            <View style={this.style.inputPlace}>
                <FormField
                    accessibilityLabel={labels.accessibilityLabel}
                    accessibilityRole={'none'}
                    errorMessage={this.props.accountNumberError}
                    inputContainerStyle={this.style.accountNumberInputContainer}
                    inputStyle={this.style.inputContainer}
                    keyboardType={'number-pad'}
                    label={labels.label}
                    labelStyle={[this.style.labelsPlacement, this.style.labelsText]}
                    maxLength={20}
                    onBlur={this.props.onBlurAccountNumber}
                    onChangeText={this.props.onChangeAccountNumber}
                    onFocus={this.props.onFocusAccountNumber}
                    value={this.props.bankAccount?.accountNumber}
                />
            </View>
        );
    };

    public AccountNumberDetails = () => {
        return (
            <View style={this.style.defaultContainerStyle}>
                <HorizontalRule />
                <View style={this.style.editInfoTextContainer}>
                    <P style={{ paragraph: this.style.editInfoLabels }}>
                        {this.labels.pharmacy.bankAccountForm.accountNumberDetails}
                    </P>
                    {!!this.props.bankAccount.accountNumber && (
                        <P>{leftPad('*', 2, 4, this.props.bankAccount.accountNumber)}</P>
                    )}
                </View>
            </View>
        );
    };

    public AccountTypeContainer = () => {
        const labels = this.labels.pharmacy.bankAccountForm.accountTypeContainer;
        return (
            <View>
                <Text style={this.style.radioButtonTitle}>{labels.title}</Text>
                <this.AccountTypeRadioButton
                    accountType={BankAccountType.CHECKING_ACCOUNT}
                    label={labels.checkingAccount}
                />
                <this.AccountTypeRadioButton
                    accountType={BankAccountType.SAVINGS_ACCOUNT}
                    label={labels.savingsAccount}
                />
            </View>
        );
    };

    public AccountTypeDetails = () => {
        return (
            <>
                {!this.props.isSpecialty && (
                    <View style={[this.style.defaultContainerStyle, this.style.accountDetailsContainer]}>
                        <View style={this.style.editInfoTextContainer}>
                            <P style={{ paragraph: this.style.editInfoLabels }}>
                                {this.labels.pharmacy.bankAccountForm.accountTypeDetails}
                            </P>
                            <P>{this.props.bankAccount.companyName}</P>
                            <P style={{ paragraph: this.style.accountTypeText }}>
                                {this.props.bankAccount.bankAccountType}
                            </P>
                        </View>
                    </View>
                )}
            </>
        );
    };

    public AccountTypeError = () => {
        if (this.props.bankAccountTypeError) {
            return (
                <InlineAlert style={{ container: this.style.radioButtonError }} useMiniIcon>
                    {this.props.bankAccountTypeError}
                </InlineAlert>
            );
        }
        return <></>;
    };

    public BillingAddressContainer = ({ billingAddress }: { billingAddress: Address }) => {
        if (this.props.bankAccountEditable && this.props.isSpecialty) {
            return (
                <View style={this.style.contentContainer}>
                    <View style={this.style.billingAddressContentContainer}>
                        <HorizontalRule />
                        <H2 style={{ h2: this.style.billingAddressHeader }} accessibilityRole="text">
                            {this.labels.pharmacy.addPaymentMethod.billingAddress}
                        </H2>
                    </View>
                    <AddressInformation
                        onChangeAddressInformation={this.props.onChangeAddressInformation}
                        isEditable
                        isSaveAndDefaultLogicVisible={false}
                    />
                </View>
            );
        } else if (!this.props.bankAccountEditable && this.props.isSpecialty) {
            return (
                <View style={this.style.contentContainer}>
                    <View style={this.style.billingAddressContentContainer}>
                        <HorizontalRule />
                        <H2 style={{ h2: this.style.billingAddressHeader }} accessibilityRole="text">
                            {this.labels.pharmacy.addPaymentMethod.billingAddress}
                        </H2>
                    </View>
                    <AddressInformation
                        addressToEdit={billingAddress}
                        isBillingAddress
                        isEditable
                        isSaveAndDefaultLogicVisible={false}
                        onChangeAddressInformation={this.props.onChangeAddressInformation}
                    />
                </View>
            );
        } else {
            return <></>;
        }
    };

    public Container = ({ children }: { children: Children }) => {
        return <ScrollView>{children}</ScrollView>;
    };

    public ContentContainer = () => {
        return this.props.bankAccountEditable ? (
            <>
                <this.AccountTypeContainer />
                <this.AccountTypeError />
                <this.ExampleContainer>
                    {/* FIXME: THIS SHOULD BE INJECTED FROM THE APP LEVEL AS A PROP*/}
                    <this.ExampleImage />
                </this.ExampleContainer>
                <this.RoutingNumberContainer />
                <this.AccountNumberContainer />
                <this.SelectDefaultContainer isSpecialty={this.props.isSpecialty} />
                <this.BillingAddressContainer billingAddress={this.props.bankAccount?.billingAddress} />
            </>
        ) : (
            <>
                <this.AccountTypeDetails />
                <this.AccountNumberDetails />
                <this.BillingAddressContainer billingAddress={this.props.bankAccount.billingAddress} />
                <this.SelectDefaultContainer isSpecialty={this.props.isSpecialty} />
            </>
        );
    };

    public ExampleContainer = ({ children }: { children?: Children }) => {
        return (
            <>
                <View style={this.style.horizontalAlignment}>
                    <View style={this.style.horizontalLine}>
                        <HorizontalRule />
                    </View>
                    <Text style={this.style.horizontalExampleText}>
                        {this.labels.pharmacy.bankAccountForm.exampleContainer}
                    </Text>
                    <View style={this.style.horizontalLine}>
                        <HorizontalRule />
                    </View>
                </View>
                {children}
            </>
        );
    };

    // TODO: pull this out to app level smart component
    // this gets injected as a component
    public ExampleImage = () => {
        return (
            <View style={this.style.placeHolderImage}>
                {this.getImage(ImageNames.EXAMPLE_CHECK, {
                    style: this.style.placeHolderImageDimensions,
                })}
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public RoutingNumberContainer = () => {
        const labels = this.labels.pharmacy.bankAccountForm.routingNumberContainer;
        return (
            <View style={this.style.inputPlace}>
                <FormField
                    accessibilityLabel={labels.accessibilityLabel}
                    accessibilityRole={'none'}
                    errorMessage={this.props.routingNumberError}
                    inputContainerStyle={this.style.routingNumberInputContainer}
                    inputStyle={this.style.inputContainer}
                    keyboardType={'number-pad'}
                    label={labels.label}
                    labelStyle={[this.style.labelsPlacement, this.style.labelsText]}
                    maxLength={9}
                    onBlur={this.props.onBlurRoutingNumber}
                    onChangeText={this.props.onChangeRoutingNumber}
                    onFocus={this.props.onFocusRoutingNumber}
                    value={this.props.bankAccount?.routingNumber}
                />
            </View>
        );
    };

    public RoutingNumberDetails = () => {
        return (
            <>
                {this.props.isSpecialty && (
                    <View style={this.style.defaultContainerStyle}>
                        <HorizontalRule />
                        <View style={this.style.editInfoTextContainer}>
                            <P style={{ paragraph: this.style.editInfoLabels }}>
                                {this.labels.pharmacy.bankAccountForm.routingNumberDetails}
                            </P>
                            {!!this.props.bankAccount.routingNumber && (
                                <P>{leftPad('*', 2, 4, this.props.bankAccount.routingNumber)}</P>
                            )}
                        </View>
                    </View>
                )}
            </>
        );
    };

    public SelectDefaultContainer = ({ isSpecialty }: { isSpecialty: boolean }) => {
        const labels = this.labels.pharmacy.bankAccountForm.selectDefaultContainer;
        return (
            <>
                {!isSpecialty && (
                    <View style={this.style.selectDefaultContainer}>
                        <HorizontalRule />
                        <View style={this.style.defaultPaymentToggleContainer}>
                            <P style={{ paragraph: this.style.selectDefaultTitleContainer }}>{labels.title}</P>
                            <ToggleSwitch
                                accessibilityLabel={labels.accessibilityLabel}
                                disabled={this.props.isSetDefaultToggleDisabled}
                                onChangeValue={() => {
                                    this.trackEvent(BankAccountForm, 'Default Payment toggle');
                                    this.props.onPressSelectDefaultPaymentMethod();
                                }}
                                value={this.props.bankAccount?.isDefaultMethod}
                            />
                        </View>
                        <View style={this.style.selectDefaultTextContainer}>
                            <P>{labels.text}</P>
                        </View>
                    </View>
                )}
            </>
        );
    };

    protected AccountTypeRadioButton = ({ accountType, label }: { accountType: BankAccountType; label: string }) => {
        return (
            <View style={this.style.radioButtonAlignment}>
                <RadioButton
                    accessibilityLabel={label}
                    onPress={() => this.props.onChangeBankAccountType(accountType)}
                    selected={this.props.bankAccount.bankAccountType === accountType}
                />
                <Text style={this.style.radioButtonText}>{label}</Text>
            </View>
        );
    };
}
