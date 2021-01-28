import { Address, CreditCard, RecurringPaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { CreditCardForm } from '.';
import { FormView, H2, HorizontalRule, Image } from '..';
import { ImageNames } from '../../styles';
import { AddressInformation } from '../Addresses/addressInformation';
import { FormField, P } from '../common';
import ToggleSwitch from '../common/toggleSwitch';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { CreditCardFormStyleSchema } from './creditCardForm.style';

export interface Props extends StyleProps {
    billingAddress?: Address;
    children?: (parent: CreditCardFormView) => Children;
    creditCard?: CreditCard | RecurringPaymentMethod;
    creditCardErrorText?: string;
    creditCardHasErrors?: boolean;
    expirationDateErrorText?: string;
    isDefaultPaymentMethod?: boolean;
    isEditable?: boolean;
    isSaveDisabled?: boolean;
    isSetDefaultToggleDisabled?: boolean;
    isSpecialty?: boolean;
    onBlurCreditCardNumber?: () => void;
    onBlurExpirationDate?: () => void;
    onChangeAddressInformation?: (billingAddress: Address) => void;
    onChangeCardNumber?: (cardNumber: string) => void;
    onChangeExpirationDate?: (expirationDate: string) => void;
    onFocusExpirationDate?: () => void;
    onPressSave?: () => void;
    onPressSelectDefaultPaymentMethod?: (defaultPaymentMethod?: boolean) => void;
    setCreditCardErrorText?: () => void;
    setDefaultChecked?: (isChecked) => void;
}

export const defaultProps: Partial<Props> = {
    children: ({
        BillingAddressContainer,
        CreditCardContainer,
        CreditCardIcons,
        ExpirationDateContainer,
        labels,
        props: { billingAddress, isSaveDisabled, isSpecialty, onPressSave },
        SelectDefaultContainer,
        Subheader,
    }: CreditCardFormView) => {
        return (
            <>
                <FormView
                    primaryButtonDisabled={isSaveDisabled}
                    primaryButtonText={labels.pharmacy.creditCardForm.primaryButtonText}
                    onPressPrimaryButton={onPressSave}
                >
                    {({ Buttons }) => (
                        <View>
                            <Subheader isSpecialty={isSpecialty} />
                            <CreditCardIcons />
                            <CreditCardContainer />
                            <ExpirationDateContainer />
                            <SelectDefaultContainer isSpecialty={isSpecialty} />
                            <BillingAddressContainer billingAddress={billingAddress} isSpecialty={isSpecialty} />
                            <Buttons />
                        </View>
                    )}
                </FormView>
            </>
        );
    },
    creditCardErrorText: '',
    expirationDateErrorText: '',
    isSaveDisabled: true,
};

/**
 * Base form for add and edit credit card to extend
 */
export default abstract class CreditCardFormView extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'CreditCardForm';
    public style: CreditCardFormStyleSchema;

    public BillingAddressContainer = ({
        billingAddress,
        isSpecialty,
    }: {
        billingAddress: Address;
        isSpecialty: boolean;
    }) => {
        if (this.props.isEditable && isSpecialty) {
            return (
                <>
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
                </>
            );
        } else if (!this.props.isEditable && isSpecialty) {
            return (
                <>
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
                </>
            );
        } else {
            return <></>;
        }
    };

    public Container = ({ children }: { children: Children }) => {
        return <ScrollView>{children}</ScrollView>;
    };

    public CreditCardContainer = () => {
        return this.props.isEditable ? <this.CreditCardInputContainer /> : <this.CreditCardNumberContainer />;
    };

    public CreditCardIcons = () => {
        return (
            <>
                {this.props.isEditable && (
                    <View style={this.style.cardIcons}>
                        <Image name={ImageNames.VISA_ICON} style={this.style.cardIcon} />
                        <Image name={ImageNames.MASTERCARD_ICON} style={this.style.cardIcon} />
                        <Image name={ImageNames.AMERICAN_EXPRESS_ICON} style={this.style.cardIcon} />
                        <Image name={ImageNames.DISCOVER_ICON} style={this.style.cardIcon} />
                    </View>
                )}
            </>
        );
    };

    public CreditCardInputContainer = () => {
        return (
            // TODO: rename this style
            <View style={this.style.creditCardContainer}>
                <FormField
                    accessibilityStates={this.props.isEditable ? [] : ['disabled']}
                    errorMessage={this.props.creditCardErrorText}
                    inputStyle={this.style.inputContainer}
                    keyboardType="number-pad"
                    label={this.labels.pharmacy.creditCardForm.creditCardInput}
                    labelStyle={[this.style.labelsPlacement, this.style.labelsText]}
                    maxLength={19}
                    onBlur={this.props.onBlurCreditCardNumber}
                    onChangeText={this.props.onChangeCardNumber}
                    textContentType="creditCardNumber"
                    value={this.props.creditCard?.accountNumber}
                />
            </View>
        );
    };

    public CreditCardNumberContainer = () => {
        return (
            <View style={this.style.editCreditCardContainer}>
                <View style={this.style.editCreditCardContentContainer}>
                    <P style={{ paragraph: this.style.creditCardLabel }}>
                        {this.labels.pharmacy.creditCardForm.creditCardNumberContainer}
                    </P>
                    <View style={this.style.creditCardContent}>
                        <P accessibilityLabel={this.props.creditCard.accountName}>
                            {this.props.creditCard.accountName}
                        </P>
                        <Image name={this.getPaymentTypeIcon()} style={this.style.editCardIcon} />
                    </View>
                </View>
                <HorizontalRule />
            </View>
        );
    };

    public ExpirationDateContainer = () => {
        const labels = this.labels.pharmacy.creditCardForm.expirationDateContainer;
        return (
            <View style={this.style.creditCardContainer}>
                <FormField
                    errorMessage={this.props.expirationDateErrorText}
                    inputContainerStyle={this.style.expirationWidth}
                    inputStyle={this.style.inputContainer}
                    keyboardType="number-pad"
                    label={labels.label}
                    labelStyle={[this.style.labelsPlacement, this.style.labelsText]}
                    maxLength={5}
                    onBlur={this.props.onBlurExpirationDate}
                    onChangeText={this.props.onChangeExpirationDate}
                    onFocus={() => this.props.isEditable && this.props.onFocusExpirationDate()}
                    placeholder={labels.placeholder}
                    value={this.props.creditCard?.expirationDate}
                />
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public SelectDefaultContainer = ({ isSpecialty = false }: { isSpecialty: boolean }) => {
        const labels = this.labels.pharmacy.creditCardForm.selectDefaultContainer;
        return (
            <>
                {!isSpecialty && (
                    <View style={this.style.selectDefaultContainer}>
                        <HorizontalRule />
                        <View style={this.style.defaultPaymentToggleContainer}>
                            <P style={{ paragraph: this.style.selectDefaultTitleContainer }}>{labels.title}</P>
                            <ToggleSwitch
                                disabled={this.props.isSetDefaultToggleDisabled}
                                onChangeValue={() => {
                                    this.trackEvent(CreditCardForm, 'Default Payment toggle');
                                    this.props.onPressSelectDefaultPaymentMethod();
                                }}
                                value={this.props.isDefaultPaymentMethod}
                            />
                        </View>
                        <View style={this.style.selectDefaultTextContainer}>
                            <P>{labels.subTitle}</P>
                        </View>
                    </View>
                )}
            </>
        );
    };

    // TODO: wire this up with Lookmai's Header text components instead
    // FIXME: remove this once we can
    public Subheader = ({ isSpecialty = false }: { isSpecialty: boolean }) => {
        const labels = this.labels.pharmacy.creditCardForm.subHeader;
        const labelHeader = isSpecialty ? labels.specialty : labels.pbm;
        return (
            <>
                {this.props.isEditable && (
                    <View style={this.style.subHeaderContainer}>
                        <P style={{ paragraph: this.style.subHeaderText }}>{labelHeader}</P>
                    </View>
                )}
            </>
        );
    };

    protected getPaymentTypeIcon = () => {
        const iconName = this.props.creditCard.accountName?.split('-');
        switch (iconName[0]) {
            case 'MC':
            case 'MASTERCARD':
                return ImageNames.MASTERCARD_ICON;
            case 'VISA':
                return ImageNames.VISA_ICON;
            case 'DISC':
            case 'DISCOVER':
                return ImageNames.DISCOVER_ICON;
            default:
                return ImageNames.AMERICAN_EXPRESS_ICON;
        }
    };
}
