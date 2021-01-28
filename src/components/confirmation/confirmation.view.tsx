import { PlaceOrderResponse, PrescriptionInfo } from 'atlas-services/src/models';
import moment from 'moment';
import React from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { HorizontalRule, PrimaryButton, ScreenLevelAlert, TextLink } from '..';
import { AppState } from '../../models';
import { IconNames } from '../../styles';
import { FlatCardContainer, H2, P, PageTitle } from '../common';
import GradientAdvertisement from '../common/gradientAdvertisement';
import { propsFromShippingAddress } from '../common/shippingAddressCard';
import { getPaymentCardProps } from '../payments/paymentCard';
import StyledComponent, { StyleProps } from '../styledComponent';
import { ConfirmationStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children: (parent: ConfirmationView) => React.ReactNode;
    formatCurrency: (value: number | string) => string;
    isAutoRefillApplicable: (prescription: PrescriptionInfo) => boolean;
    isAutoRenewApplicable: (prescription: PrescriptionInfo) => boolean;
    isPartialError?: boolean;
    onPressDismissAlert?: noop;
    onPressEnrollNow: noop;
    onPressGoBackHome: noop;
    pharmacyPrescriptions: PrescriptionInfo[];
    placeOrderResponse?: PlaceOrderResponse;
    selectedPharmacyShippingOptionContent: string[];
    selectedSpecialtyShippingOptionContent: string[];
    showAdvertisementCard: boolean;
    specialtyPrescriptions: PrescriptionInfo[];
    style?: Partial<ConfirmationStyleSchema>;
}

export const defaultProps = {
    children: ({
        AddCard,
        GoBackToHome,
        HeaderTitle,
        PartialErrorAlert,
        PharmacyOrderDetails,
        SpecialityOrderDetails,
        SubHeader,
    }: ConfirmationView) => {
        return (
            <>
                <PartialErrorAlert />
                <ScrollView>
                    <HeaderTitle />
                    <SubHeader />
                    <AddCard />
                    <PharmacyOrderDetails />
                    <SpecialityOrderDetails />
                    <GoBackToHome />
                </ScrollView>
            </>
        );
    },
};

export default class ConfirmationView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'Confirmation';
    public style: ConfirmationStyleSchema;

    public AddCard = () => {
        return (
            <>
                {this.props.showAdvertisementCard && (
                    <GradientAdvertisement
                        advertisementText={this.labels.pharmacy.confirmation.advertisement.text}
                        angle={45}
                        buttonText={this.labels.pharmacy.confirmation.advertisement.buttonText}
                        /*
                         * TODO:
                         * FIXME: these should come from color schema
                         */
                        colors={['#009CDC', '#007D8A']}
                        onButtonPress={this.props.onPressEnrollNow}
                    />
                )}
            </>
        );
    };

    public AutoRenewAndAutoRefillTextLink = ({ prescription }: { prescription: PrescriptionInfo }) => {
        return (
            <View>
                {this.props.isAutoRefillApplicable(prescription) ? (
                    <TextLink
                        isUnderlined
                        onPress={this.props.onPressEnrollNow}
                        style={{ textLink: this.style.textLinkContainer }}
                    >
                        {this.labels.pharmacy.confirmation.autoEnrollment.enrollInAutoRefill}
                    </TextLink>
                ) : (
                    <></>
                )}
                {this.props.isAutoRenewApplicable(prescription) ? (
                    <TextLink
                        isUnderlined
                        onPress={this.props.onPressEnrollNow}
                        style={{ textLink: this.style.textLinkContainer }}
                    >
                        {this.labels.pharmacy.confirmation.autoEnrollment.enrollInAutoRenewal}
                    </TextLink>
                ) : (
                    <></>
                )}
            </View>
        );
    };

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={this.style.rootContainer}>{children}</ScrollView>
            </SafeAreaView>
        );
    };

    public GoBackToHome = () => {
        return (
            <View style={this.style.buttonContainer}>
                <PrimaryButton
                    onPress={this.props.onPressGoBackHome}
                    title={this.labels.pharmacy.confirmation.goBackToHome}
                />
            </View>
        );
    };

    public HeaderTitle = () => {
        return (
            <PageTitle
                style={{ rootContainer: this.style.headerTitle }}
                text={this.labels.pharmacy.confirmation.header}
            />
        );
    };
    public HorizontalRuleConatiner = () => {
        return (
            <View style={this.style.horizontalRuleContainer}>
                <HorizontalRule />
            </View>
        );
    };

    public List = ({
        isRenewal,
        isSpecialty,
        prescriptions,
    }: {
        isRenewal: boolean;
        isSpecialty: boolean;
        prescriptions: PrescriptionInfo[];
    }) => {
        return (
            <View>
                <FlatList
                    data={prescriptions}
                    ItemSeparatorComponent={this.HorizontalRuleConatiner}
                    keyExtractor={prescription => prescription.id}
                    renderItem={({ item }) => this.renderItem({ isRenewal, isSpecialty, item })}
                />
            </View>
        );
    };

    public PartialErrorAlert = () => {
        if (!this.props.isPartialError) {
            return null;
        } else {
            return (
                <ScreenLevelAlert alertType={'warning'} onDismissAlert={this.props.onPressDismissAlert}>
                    {this.labels.pharmacy.confirmation.partialErrorMessage}
                </ScreenLevelAlert>
            );
        }
    };

    public PharmacyOrderDetails = () => {
        const { pharmacyPrescriptions }: { pharmacyPrescriptions: PrescriptionInfo[] } = this.props;
        const renewalPrescriptions: PrescriptionInfo[] = pharmacyPrescriptions.filter(
            prescription => prescription.renewStatus
        );
        return (
            <>
                {!!pharmacyPrescriptions.length && (
                    <View>
                        <this.ShippingAndPaymentHeader isSpecialty={false} />
                        <this.ShippingAndPaymentDetails isSpecialty={false} />
                        <this.PrescriptionListContainer
                            isRenewal
                            isSpecialty={false}
                            prescriptions={renewalPrescriptions}
                        />
                        <this.PrescriptionListContainer
                            isRenewal={false}
                            isSpecialty={false}
                            prescriptions={pharmacyPrescriptions}
                        />
                    </View>
                )}
            </>
        );
    };

    public PrescriptionListContainer = ({
        isRenewal,
        isSpecialty,
        prescriptions,
    }: {
        isRenewal: boolean;
        isSpecialty: boolean;
        prescriptions: PrescriptionInfo[];
    }) => {
        return (
            <>
                {!!prescriptions.length && (
                    <View
                        style={isRenewal ? this.style.prescriptionRenewalContainer : this.style.prescriptionContainer}
                    >
                        {isRenewal ? <this.RenewListHeader isSpecialty={isSpecialty} /> : <this.RefillListHeader />}
                        <this.HorizontalRuleConatiner />
                        <this.List isRenewal={isRenewal} isSpecialty={isSpecialty} prescriptions={prescriptions} />
                        <this.HorizontalRuleConatiner />
                    </View>
                )}
            </>
        );
    };

    public RefillListHeader = () => {
        return <H2>{this.labels.pharmacy.confirmation.refillsHeader}</H2>;
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public renderItem = ({
        isSpecialty,
        isRenewal,
        item,
    }: {
        isRenewal: boolean;
        isSpecialty: boolean;
        item: PrescriptionInfo;
    }) => {
        const subText = this.getContent(item);
        const title = `${item.drugInfo.name}`;
        return (
            <View style={this.style.contentContainer}>
                <View>
                    <H2>{title}</H2>
                    {subText.map((text, index) => (
                        <Text key={index} style={this.style.subText}>
                            {text}
                        </Text>
                    ))}
                    {!isSpecialty && !isRenewal ? <this.AutoRenewAndAutoRefillTextLink prescription={item} /> : <></>}
                </View>
            </View>
        );
    };

    public RenewListHeader = ({ isSpecialty }: { isSpecialty: boolean }) => {
        const labels = this.labels.pharmacy.confirmation.renewalsHeaders;
        return (
            <>
                <H2>{isSpecialty ? labels.specialty : labels.pbm}</H2>
            </>
        );
    };

    public ShippingAndPaymentDetails = ({ isSpecialty }: { isSpecialty: boolean }) => {
        return (
            <View style={this.style.shippingAndPaymentContainer}>
                <FlatCardContainer
                    cards={
                        isSpecialty
                            ? this.getSpecialtyConfirmationData(this.appState, isSpecialty)
                            : this.getPharmacyConfirmationData(this.appState, isSpecialty)
                    }
                />
            </View>
        );
    };
    public ShippingAndPaymentHeader = ({ isSpecialty }: { isSpecialty: boolean }) => {
        let shippingAndPaymentHeaderStyle = this.style.headerTitleWithoutAddCard;
        if (this.props.showAdvertisementCard) {
            shippingAndPaymentHeaderStyle = isSpecialty
                ? this.style.headerTitleWithAddCardSpecialty
                : this.style.headerTitleWithAddCardPharmacy;
        }
        const labels = this.labels.pharmacy.confirmation.shippingAndPaymentHeader;
        return (
            <PageTitle
                style={{
                    rootContainer: shippingAndPaymentHeaderStyle,
                }}
                text={isSpecialty ? labels.pageTitle.specialty : labels.pageTitle.pbm}
            />
        );
    };
    public SpecialityOrderDetails = () => {
        const { specialtyPrescriptions }: { specialtyPrescriptions: PrescriptionInfo[] } = this.props;
        const renewalSpecialtyPrescriptions: PrescriptionInfo[] = specialtyPrescriptions.filter(
            prescription => prescription.renewStatus
        );
        return (
            <>
                {!!specialtyPrescriptions.length && (
                    <View>
                        <this.ShippingAndPaymentHeader isSpecialty />
                        <this.ShippingAndPaymentDetails isSpecialty />
                        <this.PrescriptionListContainer
                            isRenewal
                            isSpecialty
                            prescriptions={renewalSpecialtyPrescriptions}
                        />
                        <this.PrescriptionListContainer
                            isRenewal={false}
                            isSpecialty
                            prescriptions={specialtyPrescriptions}
                        />
                    </View>
                )}
            </>
        );
    };

    public SubHeader = () => {
        return (
            <View style={this.style.subHeader}>
                <P>{this.labels.pharmacy.confirmation.subheader}</P>
            </View>
        );
    };

    protected getContent = (prescription: PrescriptionInfo): string[] => {
        const { prescribedTo } = prescription;
        const labels = this.labels.pharmacy.confirmation.content;
        const name = prescribedTo.firstName + ' ' + prescribedTo.lastName;
        const formattedDob = moment(prescribedTo.dob).format('MM/DD/YYYY');
        return [`${labels.for} ${name}`, `${labels.dateOfBirth} ${formattedDob}`];
    };

    protected getPharmacyConfirmationData = (appState: AppState, isSpecialty: boolean) => {
        const labels = this.labels.pharmacy.confirmation.confirmationData;
        const shippingAddress = this.getshippingOrPickupAddress(appState, isSpecialty);
        const pharmacyConfirmaiContent = [
            {
                content: propsFromShippingAddress(shippingAddress),
                icon: IconNames.SHIPPING_DETAILS_ICON,
                title: labels.shippingAddress,
            },
            {
                content: this.props.selectedPharmacyShippingOptionContent,
                icon: IconNames.SHIPPING_OPTIONS_ICON,
                style: { leftIcon: this.style.leftIcon },
                title: labels.shippingOptions,
            },
            {
                content: getPaymentCardProps(appState.prescriptionCart.pharmacy.paymentMethod),
                icon: IconNames.PAYMENT_CARD_ICON,
                title: labels.paymentMethod,
            },
        ];

        return pharmacyConfirmaiContent;
    };

    protected getshippingOrPickupAddress(appState: AppState, isSpecialty: boolean) {
        let address = null;
        if (isSpecialty) {
            address = appState.prescriptionCart.specialty.deliveryAddress
                ? appState.prescriptionCart.specialty.deliveryAddress
                : appState.prescriptionCart.specialty.pickupAddress;
        } else {
            address = appState.prescriptionCart.pharmacy.deliveryAddress;
        }
        return address ? address : appState.selectedAddress; // TODO remove this once the delivery address is updated in prescriptionCart.specialty.deliveryAddress and prescriptionCart.pharmacy.deliveryAddress.
    }

    protected getSpecialtyConfirmationData(appState: AppState, isSpecialty: boolean) {
        const pickupOrDelivery = this.getshippingOrPickupAddress(appState, isSpecialty);
        const labels = this.labels.pharmacy.confirmation.specialtyConfirmation;
        const specialtyConfirmationContent = [
            {
                content: propsFromShippingAddress(pickupOrDelivery),
                icon: appState.prescriptionCart.specialty.pickupAddress
                    ? IconNames.PHARMACY_SEARCH_TOGGLE_MAPVIEW_ICON
                    : IconNames.SHIPPING_DETAILS_ICON,
                title: appState.prescriptionCart.specialty.pickupAddress
                    ? labels.storeLocation
                    : labels.shippingAddress,
            },
            {
                content: [appState.prescriptionCart.specialty.selectedShippingDate],
                icon: appState.prescriptionCart.specialty.pickupAddress
                    ? IconNames.PICKUP_ICON
                    : IconNames.SHIPPING_OPTIONS_ICON,
                style: appState.prescriptionCart.pharmacy.deliveryAddress ? { leftIcon: this.style.leftIcon } : {},
                title: appState.prescriptionCart.specialty.pickupAddress ? labels.pickupDate : labels.deliveryDate,
            },
        ];
        return specialtyConfirmationContent;
    }
}
